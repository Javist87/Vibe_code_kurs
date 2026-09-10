export function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export const CORRECT_MESSAGES = [
  "Riktig! 🎉",
  "Nice jobbet! 💪",
  "Du knuser dette! 🔥",
  "Presist! 🎯",
  "Akkurat som en ekte vibecoder tenker! 🤖✨",
  "Boom - rett i mål! 🚀",
  "Sterkt! Du lærer fort 🌟",
  "Der satt den! 🙌",
];

export const INCORRECT_MESSAGES = [
  "Ikke helt - men bra forsøkt! 💜",
  "Så nære! Se hvorfor under 👇",
  "Feil er en del av læringen 🌱",
  "Ikke krise - selv proffene bommer noen ganger 😉",
  "Nesten der! Les forklaringen, så sitter det 🧠",
];

export const LESSON_COMPLETE_HEADINGS = [
  "Leksjon fullført! 🎉",
  "Du knuste den! 💪🎉",
  "Enda en leksjon i boks! 🚀",
  "Sterkt jobbet! 🌟",
  "Du bygger momentum! 🔥",
];

export function streakMessage(streak: number): string {
  if (streak >= 7) return `${streak} dager på rad - du er ustoppelig! 🏆`;
  if (streak >= 3) return `${streak} dager på rad - god flyt! 🔥`;
  if (streak >= 1) return `Streaken din er i gang - fortsett sånn! 🔥`;
  return "Start streaken din i dag! ⚡";
}

function timeOfDayGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 10) return "God morgen";
  if (hour < 17) return "God dag";
  return "God kveld";
}

export function learnPageGreeting(name: string, streak: number): string {
  const greeting = `${timeOfDayGreeting()}, ${name}!`;
  if (streak >= 3) {
    return `${greeting} Klar for å fyre videre på streaken? 🔥`;
  }
  if (streak >= 1) {
    return `${greeting} Klar for dagens dose vibecoding? 🚀`;
  }
  return `${greeting} La oss bygge noe kult sammen 🤖✨`;
}
