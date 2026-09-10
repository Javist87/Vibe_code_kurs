# Vibekurs

En lekende, Duolingo-inspirert læringsapp som lærer nybegynnere å komme i gang med vibecoding - å bygge programvare i tett samarbeid med AI.

## Hva appen gjør

- **Nivåkartlegging ved oppstart**: en kort quiz avgjør om brukeren er nybegynner, har litt erfaring, eller er erfaren, og hopper automatisk over kjent stoff.
- **Leksjonssti**: moduler bygget som en sti med leksjoner, à la Duolingo, med låste/åpne/fullførte steg.
- **Fire oppgavetyper**: flervalg, vurder en prompt, fyll inn en prompt, og sorter riktig rekkefølge.
- **Mestring og motivasjon**: XP, daglig streak, premier (badges) og konfetti-feiring ved fullført leksjon.
- **Egen bruker (testversjon)**: hver bruker oppgir navn og nivå, og fremgangen lagres lokalt i nettleseren (`localStorage`). Ingen server-backend i denne testversjonen.

## Kom i gang

```bash
npm install
npm run dev
```

Åpne [http://localhost:3000](http://localhost:3000).

## Teknologi

Next.js (App Router), React, TypeScript og Tailwind CSS. All applikasjonstilstand (profil, fremgang, XP, streak, premier) håndteres client-side og lagres i `localStorage` via `src/context/ProfileContext.tsx`.

## Struktur

- `src/lib/curriculum.ts` - pensum: moduler, leksjoner og oppgaver
- `src/lib/badges.ts` - premie-definisjoner og logikk for å låse dem opp
- `src/context/ProfileContext.tsx` - brukerprofil og fremgang
- `src/components/tasks/` - de fire oppgavetypene
- `src/app/` - sider: landingsside, onboarding, læringssti, leksjon, profil
