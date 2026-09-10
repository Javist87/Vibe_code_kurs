# Oppgavetyper

Hver leksjon består av en serie oppgaver (`Task`), definert i
`src/lib/types.ts` og rendret via `src/components/tasks/TaskRenderer.tsx`.
Det finnes fire oppgavetyper.

## 1. Flervalg (`multiple-choice`)

**Komponent:** `MultipleChoiceTaskView.tsx`

Brukeren velger ett av flere svaralternativer. Riktig svar er indeksen
`correctIndex` i `options`-listen. Etter "Sjekk svar" markeres riktig
alternativ grønt og feilvalgt alternativ rødt, sammen med en forklaring.

```ts
{
  type: "multiple-choice",
  question: "Hva betyr det å \"vibecode\"?",
  options: [...],
  correctIndex: 1,
  explanation: "...",
}
```

## 2. Vurder en prompt (`rate-prompt`)

**Komponent:** `RatePromptTaskView.tsx`

Brukeren får et scenario og en eksempelprompt, og skal vurdere om prompten
er god eller dårlig ved å velge mellom to eller flere påstander
(`choices`), hvorav én er merket `correct: true`.

```ts
{
  type: "rate-prompt",
  scenario: "Du vil at AI-en skal lage en innloggingsside.",
  examplePrompt: "Lag en side.",
  choices: [
    { label: "Dette er en god prompt", correct: false },
    { label: "Dette er en dårlig prompt - den mangler kontekst", correct: true },
  ],
  explanation: "...",
}
```

## 3. Fyll inn en prompt (`fill-prompt`)

**Komponent:** `FillPromptTaskView.tsx`

Brukeren skriver selv en prompt som svar på et scenario. Svaret godkjennes
automatisk (ingen AI-vurdering) dersom:

- teksten er minst 8 tegn, **og**
- teksten inneholder minst ett av nøkkelordene i `keywords` (case-insensitive).

```ts
{
  type: "fill-prompt",
  scenario: "Du vil lage en enkel nettside for en lokal kafé...",
  instruction: "Skriv en kort prompt...",
  placeholder: "F.eks: Lag en nettside for en kafé som...",
  keywords: ["nettside", "kafé"],
  explanation: "...",
}
```

## 4. Sorter riktig rekkefølge (`order-steps`)

**Komponent:** `OrderStepsTaskView.tsx`

`steps` vises i tilfeldig rekkefølge, og brukeren klikker dem i det de
mener er riktig rekkefølge (med mulighet til å angre siste valg). Svaret er
riktig dersom brukerens rekkefølge samsvarer nøyaktig med rekkefølgen i
`steps`-listen.

```ts
{
  type: "order-steps",
  instruction: "Sett den typiske vibecoding-flyten i riktig rekkefølge.",
  steps: [
    "Beskriv hva du vil oppnå",
    "La AI-en foreslå en løsning",
    "Test og vurder resultatet",
    "Gi tilbakemelding og juster",
  ],
  explanation: "...",
}
```

## Felles mønster

Alle fire oppgavetypene:

- Krever at brukeren gjør et valg/innspill og trykker "Sjekk svar" før
  fasit vises.
- Viser en `FeedbackBanner` med forklaring (`explanation`) uansett om svaret
  var riktig eller feil.
- Gir XP (`task.xp`) kun dersom svaret er riktig - se
  [Progresjon og motivasjon](./Progresjon-og-motivasjon.md).
- Kaller `onComplete(correct: boolean)` når brukeren går videre, som
  `LessonPage` (`src/app/lesson/[moduleId]/[lessonId]/page.tsx`) bruker til
  å oppdatere maskotens humør, XP-telling og fremdrift.
