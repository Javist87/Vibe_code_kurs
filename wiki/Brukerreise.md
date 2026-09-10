# Brukerreise

Denne siden beskriver flyten en bruker går gjennom, fra første besøk til
daglig bruk av appen.

## 1. Landingsside (`/`)

Viser appnavnet "Vibeskolen", en kort pitch og to veier videre:

- **"Kom i gang - gratis"** → sender brukeren til onboarding (`/onboarding`)
- **"Logg inn"** → sender brukeren til en demo-innloggingsside (`/login`)

Har brukeren allerede en profil lagret i `localStorage`, sendes de automatisk
videre til `/learn`.

## 2. Onboarding / nivåkartlegging (`/onboarding`)

En kort quiz som:

1. Ber om navn.
2. Stiller fire spørsmål om erfaring med koding, AI-verktøy, prompting og
   vibecoding-verktøy (Claude Code, Cursor, GitHub Copilot m.fl.).

Hvert svar gir poeng (0-2), og summen avgjør nivå:

| Poengsum | Nivå |
| --- | --- |
| 0-2 | `nybegynner` |
| 3-5 | `viderekommen` |
| 6-8 | `erfaren` |

Nivået brukes til å merke innledende leksjoner som allerede fullført, slik at
erfarne brukere slipper å gå gjennom kjent stoff (se
`starterCompletedLessons` i `src/context/ProfileContext.tsx`).

## 3. Demo-innlogging (`/login`)

En visuell dummy uten reell autentisering. Alt som fylles inn godtas, og det
opprettes en profil lokalt slik at innloggingsflyten kan prøves. Brukeren
settes til nivå `nybegynner`.

## 4. Læringssti (`/learn`)

Hovedsiden i appen når en profil finnes. Viser:

- Header med maskot, navn, nivå, streak og XP, samt lenke til tips-siden.
- En personlig hilsen som varierer med tid på døgnet og streak.
- Alle moduler fra pensumet, rendret som en sti med leksjoner
  (`ModulePath`-komponenten), der hver leksjon er låst, åpen eller fullført.

## 5. Leksjon (`/lesson/[moduleId]/[lessonId]`)

Viser oppgavene i leksjonen én om gangen, med fremdriftslinje og maskot som
reagerer på svarene. Når alle oppgaver er besvart:

- XP legges til profilen.
- Streak oppdateres (se [Progresjon og motivasjon](./Progresjon-og-motivasjon.md)).
- Eventuelle nye premier vises med konfetti.
- Brukeren kan gå videre til neste steg i stien.

## 6. Profil (`/profile`)

Viser navn, nivå, total XP og streak, fremgang (antall fullførte leksjoner av
totalt), alle premier (låst/åpnet), og en mulighet til å nullstille all
fremgang i nettleseren.

## 7. Tips-side (`/tips`)

En ressursside med praktiske tips for vibecoding, lenker til AI-verktøy
(Claude, Claude Code, ChatGPT, GitHub Copilot, Cursor, v0) og lenker for å
lære mer (Next.js-dokumentasjon, MDN, freeCodeCamp).
