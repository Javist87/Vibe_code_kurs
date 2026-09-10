import { describe, expect, it } from "vitest";
import {
  CURRICULUM,
  getAllLessons,
  getLesson,
  getModule,
  getTotalXp,
  isLessonUnlocked,
} from "./curriculum";

describe("CURRICULUM-integritet", () => {
  it("har unike modul-id-er", () => {
    const ids = CURRICULUM.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("har unike leksjons-id-er på tvers av alle moduler", () => {
    const ids = CURRICULUM.flatMap((m) => m.lessons.map((l) => l.id));
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("har unike oppgave-id-er på tvers av alle leksjoner", () => {
    const ids = CURRICULUM.flatMap((m) =>
      m.lessons.flatMap((l) => l.tasks.map((t) => t.id))
    );
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("låste moduler har ingen leksjoner enda", () => {
    for (const mod of CURRICULUM.filter((m) => m.locked)) {
      expect(mod.lessons).toEqual([]);
    }
  });
});

describe("getModule / getLesson", () => {
  it("finner en kjent modul", () => {
    expect(getModule("intro")?.id).toBe("intro");
  });

  it("returnerer undefined for ukjent modul", () => {
    expect(getModule("finnes-ikke")).toBeUndefined();
  });

  it("finner en kjent leksjon i en modul", () => {
    expect(getLesson("intro", "intro-1")?.id).toBe("intro-1");
  });
});

describe("getAllLessons", () => {
  it("ekskluderer leksjoner fra låste moduler", () => {
    const lockedModuleIds = CURRICULUM.filter((m) => m.locked).map(
      (m) => m.id
    );
    const all = getAllLessons();
    expect(all.every((x) => !lockedModuleIds.includes(x.moduleId))).toBe(
      true
    );
  });
});

describe("isLessonUnlocked", () => {
  it("den aller første leksjonen er alltid åpen", () => {
    const first = getAllLessons()[0].lesson.id;
    expect(isLessonUnlocked([], first)).toBe(true);
  });

  it("en senere leksjon er låst før forrige er fullført", () => {
    const all = getAllLessons();
    const second = all[1].lesson.id;
    expect(isLessonUnlocked([], second)).toBe(false);
  });

  it("en senere leksjon åpnes når forrige er fullført", () => {
    const all = getAllLessons();
    const first = all[0].lesson.id;
    const second = all[1].lesson.id;
    expect(isLessonUnlocked([first], second)).toBe(true);
  });
});

describe("getTotalXp", () => {
  it("returnerer et positivt tall", () => {
    expect(getTotalXp()).toBeGreaterThan(0);
  });
});
