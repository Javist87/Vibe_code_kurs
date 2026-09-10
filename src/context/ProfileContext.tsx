"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import { Level, Profile } from "@/lib/types";
import {
  computeStreakOnActivity,
  createProfile,
  getProfileSnapshot,
  getServerProfileSnapshot,
  subscribeProfile,
  todayKey,
  writeProfile,
} from "@/lib/storage";
import { evaluateNewBadges } from "@/lib/badges";
import { CURRICULUM } from "@/lib/curriculum";

interface CompleteLessonResult {
  xpGained: number;
  newBadgeIds: string[];
  leveledUpStreak: boolean;
}

interface ProfileContextValue {
  profile: Profile | null;
  isLoaded: boolean;
  startProfile: (name: string, level: Level) => void;
  completeLesson: (
    lessonId: string,
    xpEarnedInLesson: number
  ) => CompleteLessonResult;
  resetProfile: () => void;
}

const ProfileContext = createContext<ProfileContextValue | undefined>(
  undefined
);

/** Leksjoner AI vurderer som allerede kjent, basert på selvrapportert nivå. */
function starterCompletedLessons(level: Level): string[] {
  const introLessons = CURRICULUM.find((m) => m.id === "intro")?.lessons.map(
    (l) => l.id
  ) ?? [];
  const promptLessons =
    CURRICULUM.find((m) => m.id === "prompts")?.lessons.map((l) => l.id) ??
    [];

  if (level === "erfaren") return [...introLessons, ...promptLessons];
  if (level === "viderekommen") return [...introLessons];
  return [];
}

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const snapshot = useSyncExternalStore(
    subscribeProfile,
    getProfileSnapshot,
    getServerProfileSnapshot
  );
  const isLoaded = snapshot !== undefined;
  const profile = snapshot ?? null;

  const startProfile = useCallback((name: string, level: Level) => {
    const fresh = createProfile(name.trim() || "Vibecoder", level);
    fresh.completedLessons = starterCompletedLessons(level);
    writeProfile(fresh);
  }, []);

  const completeLesson = useCallback(
    (lessonId: string, xpEarnedInLesson: number): CompleteLessonResult => {
      const current = getProfileSnapshot();
      if (!current) {
        return { xpGained: 0, newBadgeIds: [], leveledUpStreak: false };
      }

      const alreadyCompleted = current.completedLessons.includes(lessonId);
      const newStreak = computeStreakOnActivity(current);
      const leveledUpStreak = newStreak > (current.streak || 0);
      const xpGained = alreadyCompleted ? 0 : xpEarnedInLesson;

      const updated: Profile = {
        ...current,
        xp: current.xp + xpGained,
        streak: newStreak,
        lastActiveDate: todayKey(),
        completedLessons: alreadyCompleted
          ? current.completedLessons
          : [...current.completedLessons, lessonId],
      };

      const newBadgeIds = evaluateNewBadges(updated);
      updated.earnedBadges = [...updated.earnedBadges, ...newBadgeIds];

      writeProfile(updated);

      return { xpGained, newBadgeIds, leveledUpStreak };
    },
    []
  );

  const resetProfile = useCallback(() => {
    writeProfile(null);
  }, []);

  const value = useMemo(
    () => ({ profile, isLoaded, startProfile, completeLesson, resetProfile }),
    [profile, isLoaded, startProfile, completeLesson, resetProfile]
  );

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile må brukes inne i ProfileProvider");
  return ctx;
}
