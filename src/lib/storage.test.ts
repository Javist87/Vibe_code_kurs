import { describe, expect, it } from "vitest";
import { computeStreakOnActivity, createProfile, todayKey } from "./storage";
import type { Profile } from "./types";

function profileWithLastActive(lastActiveDate: string | null, streak = 0): Profile {
  return { ...createProfile("Test", "nybegynner"), lastActiveDate, streak };
}

describe("todayKey", () => {
  it("returnerer dato på YYYY-MM-DD-format", () => {
    expect(todayKey()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe("computeStreakOnActivity", () => {
  it("starter streak på 1 hvis ingen tidligere aktivitet", () => {
    expect(computeStreakOnActivity(profileWithLastActive(null))).toBe(1);
  });

  it("beholder streak uendret ved aktivitet samme dag", () => {
    const today = todayKey();
    expect(computeStreakOnActivity(profileWithLastActive(today, 4))).toBe(4);
  });

  it("beholder minst streak 1 samme dag selv om streak var 0", () => {
    const today = todayKey();
    expect(computeStreakOnActivity(profileWithLastActive(today, 0))).toBe(1);
  });

  it("øker streak med 1 ved aktivitet dagen etter", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayKey = yesterday.toISOString().slice(0, 10);
    expect(computeStreakOnActivity(profileWithLastActive(yesterdayKey, 2))).toBe(3);
  });

  it("nullstiller streak til 1 hvis det har gått mer enn én dag", () => {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    const key = threeDaysAgo.toISOString().slice(0, 10);
    expect(computeStreakOnActivity(profileWithLastActive(key, 5))).toBe(1);
  });
});

describe("createProfile", () => {
  it("oppretter en fersk profil med gitt navn og nivå", () => {
    const profile = createProfile("Ola", "erfaren");
    expect(profile.name).toBe("Ola");
    expect(profile.level).toBe("erfaren");
    expect(profile.xp).toBe(0);
    expect(profile.streak).toBe(0);
    expect(profile.lastActiveDate).toBeNull();
    expect(profile.completedLessons).toEqual([]);
    expect(profile.earnedBadges).toEqual([]);
  });
});
