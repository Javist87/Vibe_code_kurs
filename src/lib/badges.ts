import { Badge, Profile } from "./types";
import { CURRICULUM, getAllLessons } from "./curriculum";

export const BADGES: Badge[] = [
  {
    id: "first-step",
    title: "Første steg",
    description: "Fullfør din første leksjon",
    emoji: "👣",
  },
  {
    id: "prompt-master",
    title: "Promptmester",
    description: "Fullfør modulen \"Skriv gode prompts\"",
    emoji: "💬",
  },
  {
    id: "iterator",
    title: "Iterasjonsekspert",
    description: "Fullfør modulen \"Iterativ utvikling\"",
    emoji: "🔁",
  },
  {
    id: "debugger",
    title: "Feilsøker",
    description: "Fullfør modulen \"Feilsøking med AI\"",
    emoji: "🐛",
  },
  {
    id: "streak-3",
    title: "3 dager på rad",
    description: "Øv tre dager på rad",
    emoji: "🔥",
  },
  {
    id: "streak-7",
    title: "Ukens helt",
    description: "Øv sju dager på rad",
    emoji: "🏆",
  },
  {
    id: "xp-100",
    title: "100 poeng",
    description: "Samle 100 XP",
    emoji: "⭐",
  },
  {
    id: "xp-300",
    title: "300 poeng",
    description: "Samle 300 XP",
    emoji: "🌟",
  },
  {
    id: "halfway",
    title: "Halvveis",
    description: "Fullfør halvparten av alle leksjoner",
    emoji: "🚀",
  },
  {
    id: "all-done",
    title: "Vibecoding-mester",
    description: "Fullfør alle tilgjengelige leksjoner",
    emoji: "👑",
  },
];

function moduleCompleted(profile: Profile, moduleId: string): boolean {
  const mod = CURRICULUM.find((m) => m.id === moduleId);
  if (!mod || mod.lessons.length === 0) return false;
  return mod.lessons.every((l) => profile.completedLessons.includes(l.id));
}

export function evaluateNewBadges(profile: Profile): string[] {
  const totalLessons = getAllLessons().length;
  const earned = new Set(profile.earnedBadges);
  const newlyEarned: string[] = [];

  const check = (id: string, condition: boolean) => {
    if (condition && !earned.has(id)) {
      newlyEarned.push(id);
    }
  };

  check("first-step", profile.completedLessons.length >= 1);
  check("prompt-master", moduleCompleted(profile, "prompts"));
  check("iterator", moduleCompleted(profile, "iterasjon"));
  check("debugger", moduleCompleted(profile, "feilsoking"));
  check("streak-3", profile.streak >= 3);
  check("streak-7", profile.streak >= 7);
  check("xp-100", profile.xp >= 100);
  check("xp-300", profile.xp >= 300);
  check("halfway", profile.completedLessons.length >= Math.ceil(totalLessons / 2));
  check("all-done", profile.completedLessons.length >= totalLessons && totalLessons > 0);

  return newlyEarned;
}
