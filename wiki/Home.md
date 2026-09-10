# Vibeskolen - Wiki

Vibeskolen er en lekende læringsapp som lærer nybegynnere å komme i gang med
**vibecoding** - å bygge programvare i tett samarbeid med en AI-assistent.
Appen er bygget som en test-/kursversjon: ingen data sendes til en server,
all fremgang lagres lokalt i nettleseren til brukeren.

Denne wikien går i dybden på hvordan appen fungerer. Se [README](../README.md)
for en rask oversikt, installasjon og teknologivalg.

## Innhold

- [Brukerreise](./Brukerreise.md) - fra landingsside til fullført leksjon
- [Pensum og moduler](./Pensum.md) - modulene og leksjonene i kurset
- [Oppgavetyper](./Oppgavetyper.md) - de fire oppgavetypene og hvordan de vurderes
- [Progresjon og motivasjon](./Progresjon-og-motivasjon.md) - XP, streak og premier
- [Teknisk arkitektur](./Teknisk-arkitektur.md) - kodestruktur, datalagring og teststrategi

## Kjapp oversikt

| Tema | Beskrivelse |
| --- | --- |
| Formål | Lære nybegynnere det grunnleggende i vibecoding gjennom korte, interaktive leksjoner |
| Format | Sti med moduler og leksjoner, fire varierte oppgavetyper per leksjon |
| Tilpasning | En kort quiz ved oppstart avgjør nivå og hopper over kjent stoff |
| Motivasjon | XP, daglig streak og premier (badges) |
| Lagring | Kun `localStorage` i nettleseren - ingen backend eller konto |
| Teknologi | Next.js (App Router), React, TypeScript, Tailwind CSS, Vitest |
