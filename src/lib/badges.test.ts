import { describe, expect, it } from "vitest";
import { evaluateNewBadges } from "./badges";
import { createProfile } from "./storage";
import { getAllLessons } from "./curriculum";
import type { Profile } from "./types";

function baseProfile(overrides: Partial<Profile> = {}): Profile {
  return { ...createProfile("Test", "nybegynner"), ...overrides };
}

describe("evaluateNewBadges", () => {
  it("gir ingen badges for en helt fersk profil", () => {
    expect(evaluateNewBadges(baseProfile())).toEqual([]);
  });

  it("gir 'first-step' ved første fullførte leksjon", () => {
    const badges = evaluateNewBadges(
      baseProfile({ completedLessons: ["intro-1"] })
    );
    expect(badges).toContain("first-step");
  });

  it("gir ikke badges som allerede er opptjent på nytt", () => {
    const badges = evaluateNewBadges(
      baseProfile({
        completedLessons: ["intro-1"],
        earnedBadges: ["first-step"],
      })
    );
    expect(badges).not.toContain("first-step");
  });

  it("gir 'prompt-master' når alle leksjoner i prompts-modulen er fullført", () => {
    const badges = evaluateNewBadges(
      baseProfile({
        completedLessons: ["prompts-1", "prompts-2", "prompts-3"],
      })
    );
    expect(badges).toContain("prompt-master");
  });

  it("gir ikke 'prompt-master' hvis kun deler av modulen er fullført", () => {
    const badges = evaluateNewBadges(
      baseProfile({ completedLessons: ["prompts-1", "prompts-2"] })
    );
    expect(badges).not.toContain("prompt-master");
  });

  it("gir streak-badges basert på streak-tall", () => {
    expect(evaluateNewBadges(baseProfile({ streak: 3 }))).toContain(
      "streak-3"
    );
    expect(evaluateNewBadges(baseProfile({ streak: 7 }))).toEqual(
      expect.arrayContaining(["streak-3", "streak-7"])
    );
    expect(evaluateNewBadges(baseProfile({ streak: 2 }))).not.toContain(
      "streak-3"
    );
  });

  it("gir XP-badges basert på totalt antall XP", () => {
    expect(evaluateNewBadges(baseProfile({ xp: 100 }))).toContain("xp-100");
    expect(evaluateNewBadges(baseProfile({ xp: 99 }))).not.toContain(
      "xp-100"
    );
    expect(evaluateNewBadges(baseProfile({ xp: 300 }))).toEqual(
      expect.arrayContaining(["xp-100", "xp-300"])
    );
  });

  it("gir 'all-done' kun når alle tilgjengelige leksjoner er fullført", () => {
    const allLessonIds = getAllLessons().map((l) => l.lesson.id);
    const badges = evaluateNewBadges(
      baseProfile({ completedLessons: allLessonIds })
    );
    expect(badges).toContain("all-done");
    expect(badges).toContain("halfway");
  });

  it("gir aldri en badge to ganger for samme kall", () => {
    const badges = evaluateNewBadges(baseProfile({ completedLessons: [] }));
    expect(new Set(badges).size).toBe(badges.length);
  });
});
