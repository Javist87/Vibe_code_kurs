# Pensum og moduler

Hele pensumet er definert i `src/lib/curriculum.ts` som en liste av moduler
(`CURRICULUM`). Hver modul har flere leksjoner, og hver leksjon har to eller
flere oppgaver.

## Moduler

| Modul | Tema | Status |
| --- | --- | --- |
| `intro` - "Hva er vibecoding?" | Tankesettet bak å bygge sammen med AI | Aktiv |
| `prompts` - "Skriv gode prompts" | Hvordan skrive presise, kontekstrike prompts | Aktiv |
| `iterasjon` - "Iterativ utvikling" | Bygge i små, testbare steg sammen med AI-en | Aktiv |
| `feilsoking` - "Feilsøking med AI" | Beskrive og løse feil sammen med AI-en | Aktiv |
| `kvalitet` - "Kvalitetssjekk og testing" | Kommer snart | Låst (`locked: true`, ingen leksjoner) |
| `beste-praksis` - "Beste praksis og fallgruver" | Kommer snart | Låst (`locked: true`, ingen leksjoner) |

Låste moduler holdes utenfor beregningen av totalt antall leksjoner og
oppgaver (se `getAllLessons` i `curriculum.ts`), slik at fremgangsbaren ikke
inkluderer innhold som ikke finnes ennå.

## Leksjonsrekkefølge og opplåsing

Leksjoner låses opp i rekkefølge på tvers av alle aktive moduler (ikke bare
innad i én modul). `isLessonUnlocked` sjekker om forrige leksjon i den
globale rekkefølgen er fullført før en gitt leksjon åpnes. Den aller første
leksjonen er alltid åpen.

## Legge til nytt innhold

Nytt pensum legges til ved å:

1. Legge en ny modul eller leksjon i `CURRICULUM` i `src/lib/curriculum.ts`.
2. Gi hver oppgave en unik `id`, riktig `type` (se
   [Oppgavetyper](./Oppgavetyper.md)) og et `xp`-beløp.
3. La `src/lib/curriculum.test.ts` verifisere pensumets integritet (unike
   id-er, gyldige data) - denne testen kjøres automatisk i CI.

Totalt antall tilgjengelig XP beregnes automatisk med `getTotalXp()`, så
nytt innhold trenger ingen manuell oppdatering av XP-summer andre steder.
