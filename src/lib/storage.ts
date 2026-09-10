import { Level, Profile } from "./types";

const STORAGE_KEY = "vibekurs.profile";

type Listener = () => void;
const listeners = new Set<Listener>();

/** undefined = ikke lest fra localStorage i denne sesjonen ennå. */
let cache: Profile | null | undefined = undefined;

function readFromLocalStorage(): Profile | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Profile) : null;
  } catch {
    return null;
  }
}

function notify(): void {
  listeners.forEach((listener) => listener());
}

export function subscribeProfile(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Brukes av useSyncExternalStore på klienten. */
export function getProfileSnapshot(): Profile | null {
  if (cache === undefined) {
    cache = readFromLocalStorage();
  }
  return cache;
}

/** Brukes av useSyncExternalStore ved server-rendering/hydrering. */
export function getServerProfileSnapshot(): undefined {
  return undefined;
}

export function writeProfile(profile: Profile | null): void {
  cache = profile;
  if (profile) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } else {
    window.localStorage.removeItem(STORAGE_KEY);
  }
  notify();
}

function todayKey(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function daysBetween(a: string, b: string): number {
  const dateA = new Date(a + "T00:00:00Z").getTime();
  const dateB = new Date(b + "T00:00:00Z").getTime();
  return Math.round((dateB - dateA) / (1000 * 60 * 60 * 24));
}

/** Oppdaterer streak basert på dagens dato, og returnerer nytt streak-tall. */
export function computeStreakOnActivity(profile: Profile): number {
  const today = todayKey();
  if (!profile.lastActiveDate) return 1;
  const diff = daysBetween(profile.lastActiveDate, today);
  if (diff === 0) return profile.streak || 1;
  if (diff === 1) return (profile.streak || 0) + 1;
  return 1;
}

export function createProfile(name: string, level: Level): Profile {
  return {
    name,
    level,
    xp: 0,
    streak: 0,
    lastActiveDate: null,
    completedLessons: [],
    earnedBadges: [],
    createdAt: new Date().toISOString(),
  };
}

export { todayKey };
