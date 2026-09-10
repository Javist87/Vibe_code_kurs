# Teknisk arkitektur

## Teknologistack

- **Next.js (App Router)** - sider under `src/app/`
- **React 19** - klientkomponenter (`"use client"`) for all interaktivitet
- **TypeScript** - strenge typer for pensum, oppgaver og profil (`src/lib/types.ts`)
- **Tailwind CSS 4** - all styling, inkludert egne animasjoner (konfetti, XP-popup, maskot)
- **Vitest** - enhetstester

Dette er en ren frontend-app: det finnes ingen server-backend eller
database. All applikasjonstilstand er client-side.

## Mappestruktur

```
src/
  app/                     Next.js-sider (App Router)
    page.tsx               Landingsside
    onboarding/page.tsx     Nivåkartlegging
    login/page.tsx          Demo-innlogging
    learn/page.tsx          Læringssti
    lesson/[moduleId]/[lessonId]/page.tsx   Leksjonsvisning
    profile/page.tsx        Profil og premier
    tips/page.tsx           Tips, triks og lenker
  components/
    tasks/                  De fire oppgavetype-komponentene + TaskRenderer
    ModulePath.tsx          Visuell sti for en modul
    HeaderStats.tsx         XP- og streak-piller
    Mascot.tsx / WanderingMascot.tsx   Maskot og animasjoner
    Confetti.tsx / XpBurst.tsx         Feiringseffekter
    ui.tsx                  Delte UI-primitiver (knapper, feedback-banner)
  context/
    ProfileContext.tsx      Global profil-state via React Context
  lib/
    types.ts                Delte typer (Profile, Module, Lesson, Task, Badge)
    curriculum.ts            Pensum: moduler, leksjoner, oppgaver
    badges.ts                Premie-definisjoner og evaluering
    storage.ts                localStorage-lagring og streak-beregning
    motivation.ts            Tilfeldige motivasjonstekster
    confetti.ts               Konfetti-hjelpefunksjoner
```

## Datamodell

Sentrale typer i `src/lib/types.ts`:

- `Profile` - navn, nivå, XP, streak, siste aktive dato, fullførte
  leksjoner, opptjente premier, opprettelsestidspunkt.
- `Module` / `Lesson` / `Task` - pensumstruktur. `Task` er en diskriminert
  union over de fire oppgavetypene (se [Oppgavetyper](./Oppgavetyper.md)).
- `Badge` - id, tittel, beskrivelse og emoji for en premie.

## State-håndtering og lagring

- `ProfileContext` (`src/context/ProfileContext.tsx`) eksponerer profilen
  og handlinger (`startProfile`, `completeLesson`, `resetProfile`) til hele
  appen via React Context.
- Under panseret bruker den `useSyncExternalStore` mot en enkel
  pub/sub-modul i `src/lib/storage.ts`, som leser og skriver profilen til
  `localStorage` under nøkkelen `vibekurs.profile`.
- `getServerProfileSnapshot()` returnerer alltid `undefined` under
  server-rendering, slik at sider trygt kan vise en tom tilstand til
  hydrering er ferdig på klienten (unngår hydration-mismatch).
- Data valideres med `isValidProfile()` før den brukes, slik at korrupt
  eller utdatert `localStorage`-innhold ikke krasjer appen.

## Ruting og beskyttede sider

Sider som krever en profil (`/learn`, `/lesson/...`, `/profile`, `/tips`)
sjekker `isLoaded` og `profile` i en `useEffect`, og sender brukeren tilbake
til landingssiden dersom ingen profil finnes. Leksjonssiden sjekker i
tillegg at leksjonen faktisk er låst opp via `isLessonUnlocked`, og sender
brukeren til `/learn` hvis ikke.

## Testing og CI

Testene ligger ved siden av koden de tester (`*.test.ts` i `src/lib/`):

- `curriculum.test.ts` - verifiserer pensumets integritet (unike id-er,
  gyldige felt).
- `badges.test.ts` - verifiserer badge-logikken (`evaluateNewBadges`).
- `storage.test.ts` - verifiserer streak-beregning og profilvalidering.

`.github/workflows/ci.yml` kjører på hver pull request og push til `main`:
`npm ci` → `npm run lint` → `npm test` → `npm run build`.
