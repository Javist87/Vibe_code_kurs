# Progresjon og motivasjon

Appen bruker tre mekanismer for å motivere brukeren til å fortsette: XP,
daglig streak og premier (badges). All logikk er samlet i `src/lib/badges.ts`
og `src/lib/storage.ts`, og orkestreres av `src/context/ProfileContext.tsx`.

## XP (erfaringspoeng)

- Hver oppgave gir et fast antall XP (`task.xp`, typisk 10-15) dersom
  svaret er riktig.
- Total XP for en leksjon legges til profilen først når leksjonen er
  fullført (`completeLesson` i `ProfileContext.tsx`), og kun første gang -
  gjentatt fullføring av en allerede fullført leksjon gir ikke XP på nytt.
- `getTotalXp()` i `curriculum.ts` summerer maks oppnåelig XP for hele
  pensumet, brukt bl.a. som referanse for badge-terskler.

## Daglig streak

Streak beregnes i `computeStreakOnActivity` (`src/lib/storage.ts`) basert på
`lastActiveDate`:

| Situasjon | Resultat |
| --- | --- |
| Ingen tidligere aktivitet | Streak settes til 1 |
| Aktivitet samme dag som sist | Streak beholdes uendret |
| Aktivitet dagen etter forrige aktive dag | Streak øker med 1 |
| Mer enn én dag siden forrige aktive dag | Streak nullstilles til 1 |

Streak oppdateres hver gang en leksjon fullføres. `LEVELED_UP`-varselet
(`leveledUpStreak`) vises når streaken faktisk økte i denne økten, og
`streakMessage()` i `src/lib/motivation.ts` gir en tilpasset tekst basert på
lengden på streaken.

## Premier (badges)

Definert i `BADGES` (`src/lib/badges.ts`), og evaluert etter hver fullførte
leksjon via `evaluateNewBadges(profile)`:

| Badge | Betingelse |
| --- | --- |
| 👣 Første steg | Minst 1 fullført leksjon |
| 💬 Promptmester | Fullført modulen "Skriv gode prompts" |
| 🔁 Iterasjonsekspert | Fullført modulen "Iterativ utvikling" |
| 🐛 Feilsøker | Fullført modulen "Feilsøking med AI" |
| 🔥 3 dager på rad | Streak ≥ 3 |
| 🏆 Ukens helt | Streak ≥ 7 |
| ⭐ 100 poeng | Total XP ≥ 100 |
| 🌟 300 poeng | Total XP ≥ 300 |
| 🚀 Halvveis | Minst halvparten av alle leksjoner fullført |
| 👑 Vibecoding-mester | Alle tilgjengelige leksjoner fullført |

Nye premier vises med konfetti og animasjon på leksjonens oppsummeringsskjerm,
og listes senere - både låste og åpnede - på profilsiden.

## Motivasjonstekster

`src/lib/motivation.ts` samler variert, tilfeldig valgt tekst for:

- Riktig/feil svar (`CORRECT_MESSAGES`, `INCORRECT_MESSAGES`)
- Overskrifter når en leksjon fullføres (`LESSON_COMPLETE_HEADINGS`)
- Tidsriktig hilsen på læringssiden (`learnPageGreeting`)
- Streak-status (`streakMessage`)

Dette testes i `src/lib/badges.test.ts` og `src/lib/storage.test.ts`, som
kjøres automatisk i CI.
