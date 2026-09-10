import { Module } from "./types";

export const CURRICULUM: Module[] = [
  {
    id: "intro",
    title: "Hva er vibecoding?",
    description: "Bli kjent med tankesettet bak å bygge sammen med AI.",
    emoji: "✨",
    gradient: "from-violet-500 to-fuchsia-500",
    lessons: [
      {
        id: "intro-1",
        title: "Velkommen til vibecoding",
        description: "Forstå hva vibecoding faktisk betyr.",
        tasks: [
          {
            id: "intro-1-t1",
            type: "multiple-choice",
            xp: 10,
            question: "Hva betyr det å \"vibecode\"?",
            options: [
              "Å skrive all kode selv, helt uten hjelpemidler",
              "Å samarbeide tett med en AI-assistent for å bygge programvare raskere og mer eksperimentelt",
              "Å kode kun mens man hører på musikk",
              "Å kopiere kode fra internett uten å forstå den",
            ],
            correctIndex: 1,
            explanation:
              "Vibecoding handler om å samarbeide tett med AI-verktøy for å utvikle programvare raskere og mer eksperimentelt, med fokus på resultatet fremfor å skrive hver linje manuelt.",
          },
          {
            id: "intro-1-t2",
            type: "multiple-choice",
            xp: 10,
            question: "Hva er din rolle når du vibecoder?",
            options: [
              "Passiv tilskuer som venter på ferdig kode",
              "Retningsgiver og kvalitetssikrer som styrer AI-en mot målet",
              "Du skal ikke gjøre noe, AI-en gjør alt selv",
              "Kun å skrive kode manuelt etterpå, uten å bruke AI underveis",
            ],
            correctIndex: 1,
            explanation:
              "Du er fortsatt sjefen. AI-en er et kraftig verktøy, men du bestemmer retning, vurderer resultatet og sikrer kvaliteten.",
          },
        ],
      },
      {
        id: "intro-2",
        title: "Samarbeid, ikke overlevering",
        description: "Lær den typiske arbeidsflyten i vibecoding.",
        tasks: [
          {
            id: "intro-2-t1",
            type: "order-steps",
            xp: 15,
            instruction:
              "Sett den typiske vibecoding-flyten i riktig rekkefølge.",
            steps: [
              "Beskriv hva du vil oppnå",
              "La AI-en foreslå en løsning",
              "Test og vurder resultatet",
              "Gi tilbakemelding og juster",
            ],
            explanation:
              "Vibecoding er en løkke: du beskriver målet, AI-en foreslår, dere tester sammen, og du justerer til resultatet er riktig.",
          },
          {
            id: "intro-2-t2",
            type: "fill-prompt",
            xp: 15,
            scenario:
              "Du vil lage en enkel nettside for en lokal kafé, med forsiden og en meny-side.",
            instruction:
              "Skriv en kort prompt til en AI-assistent som beskriver hva du trenger. Bruk gjerne ordene \"nettside\" og \"kafé\".",
            placeholder: "F.eks: Lag en nettside for en kafé som...",
            keywords: ["nettside", "kafé"],
            explanation:
              "Et eksempel på en god prompt: \"Lag en enkel nettside for en kafé, med en forside som viser åpningstider og en meny-side med rett-liste.\" Jo tydeligere mål, jo bedre resultat.",
          },
        ],
      },
    ],
  },
  {
    id: "prompts",
    title: "Skriv gode prompts",
    description: "Lær å be AI-en om nøyaktig det du trenger.",
    emoji: "💬",
    gradient: "from-orange-400 to-pink-500",
    lessons: [
      {
        id: "prompts-1",
        title: "Anatomien til en god prompt",
        description: "Hva bør alltid være med i en prompt?",
        tasks: [
          {
            id: "prompts-1-t1",
            type: "multiple-choice",
            xp: 10,
            question: "Hvilke elementer bør en god prompt inneholde?",
            options: [
              "Kun ett enkelt ord",
              "Mål, kontekst og eventuelle begrensninger",
              "Så mange tekniske faguttrykk som mulig",
              "Ingenting spesielt - AI-en gjetter resten",
            ],
            correctIndex: 1,
            explanation:
              "En god prompt forteller AI-en hva du vil oppnå (mål), hva den jobber med fra før (kontekst), og eventuelle krav eller begrensninger.",
          },
          {
            id: "prompts-1-t2",
            type: "rate-prompt",
            xp: 15,
            scenario: "Du vil at AI-en skal lage en innloggingsside.",
            examplePrompt: "Lag en side.",
            choices: [
              { label: "Dette er en god prompt", correct: false },
              {
                label: "Dette er en dårlig prompt - den mangler kontekst og detaljer",
                correct: true,
              },
            ],
            explanation:
              "\"Lag en side\" mangler kontekst: Hvilken side? Hvilket formål? Hvilke felt trenger den? Gode prompts er spesifikke.",
          },
        ],
      },
      {
        id: "prompts-2",
        title: "Vær spesifikk",
        description: "Se forskjellen på en vag og en presis prompt.",
        tasks: [
          {
            id: "prompts-2-t1",
            type: "rate-prompt",
            xp: 15,
            scenario: "Du vil ha en kontaktskjema-komponent i React.",
            examplePrompt:
              "Lag en kontaktskjema-komponent i React med felt for navn, e-post og melding. Valider at e-posten er gyldig, og vis en bekreftelse når skjemaet er sendt.",
            choices: [
              {
                label: "Dette er en god prompt - tydelig mål, felt og krav",
                correct: true,
              },
              { label: "Dette er en dårlig prompt", correct: false },
            ],
            explanation:
              "Prompten sier nøyaktig hva komponenten skal inneholde, hvilket rammeverk som brukes, og hvilken validering som kreves.",
          },
          {
            id: "prompts-2-t2",
            type: "multiple-choice",
            xp: 10,
            question: "Hva skjer oftest når en prompt er for vag?",
            options: [
              "AI-en gjetter, og resultatet treffer sjeldnere det du faktisk ønsket",
              "AI-en nekter å svare i det hele tatt",
              "Resultatet blir alltid perfekt uansett",
              "Ingenting endrer seg",
            ],
            correctIndex: 0,
            explanation:
              "Uten nok detaljer må AI-en gjette seg frem, og sjansen for å bomme på det du egentlig ønsket øker.",
          },
        ],
      },
      {
        id: "prompts-3",
        title: "Gi kontekst",
        description: "Hjelp AI-en å forstå prosjektet ditt.",
        tasks: [
          {
            id: "prompts-3-t1",
            type: "fill-prompt",
            xp: 15,
            scenario:
              "Du jobber i et eksisterende prosjekt med et handlekurv-system skrevet i TypeScript.",
            instruction:
              "Skriv en prompt der du ber AI-en legge til en rabattkode-funksjon. Husk å nevne konteksten. Bruk gjerne ordene \"handlekurv\" og \"rabatt\".",
            placeholder: "F.eks: I handlekurv-systemet vårt vil jeg...",
            keywords: ["handlekurv", "rabatt"],
            explanation:
              "Når du nevner at det finnes et eksisterende handlekurv-system i TypeScript, kan AI-en tilpasse svaret til koden din i stedet for å foreslå noe helt nytt.",
          },
          {
            id: "prompts-3-t2",
            type: "multiple-choice",
            xp: 10,
            question: "Hvorfor er det viktig å gi kontekst om prosjektet?",
            options: [
              "Det er ikke viktig, AI-en husker alt automatisk",
              "Det gjør svaret lengre, men ikke bedre",
              "Det hjelper AI-en å tilpasse forslaget til koden og systemet du faktisk har",
              "Det er kun viktig for store selskaper",
            ],
            correctIndex: 2,
            explanation:
              "AI-en kjenner ikke prosjektet ditt fra før. Kontekst som språk, rammeverk og eksisterende struktur gjør svaret langt mer treffsikkert.",
          },
        ],
      },
    ],
  },
  {
    id: "iterasjon",
    title: "Iterativ utvikling",
    description: "Bygg i små, trygge steg sammen med AI-en.",
    emoji: "🔁",
    gradient: "from-sky-400 to-cyan-500",
    lessons: [
      {
        id: "iterasjon-1",
        title: "Små steg vinner",
        description: "Hvorfor store hopp ofte går galt.",
        tasks: [
          {
            id: "iterasjon-1-t1",
            type: "order-steps",
            xp: 15,
            instruction: "Sorter en sunn, iterativ arbeidsflyt.",
            steps: [
              "Be om én liten endring om gangen",
              "Se resultatet med en gang",
              "Test at endringen fungerer",
              "Be om neste steg",
            ],
            explanation:
              "Små, testbare steg gjør det lett å fange opp feil tidlig, i stedet for å oppdage et stort rot etter en kjempestor endring.",
          },
          {
            id: "iterasjon-1-t2",
            type: "multiple-choice",
            xp: 10,
            question:
              "Hvorfor er det lurt å be om små endringer i stedet for én kjempestor prompt?",
            options: [
              "Det er ikke lurt, store prompts er alltid raskere",
              "Det er lettere å oppdage feil tidlig og holde kontroll på resultatet",
              "AI-en forstår kun ett ord om gangen",
              "Det finnes ingen forskjell i praksis",
            ],
            correctIndex: 1,
            explanation:
              "Med små steg ser du fortløpende om utviklingen går riktig vei, og det blir enklere å rette opp om noe blir feil.",
          },
        ],
      },
      {
        id: "iterasjon-2",
        title: "Test ofte",
        description: "Bygg inn kvalitetssjekk underveis.",
        tasks: [
          {
            id: "iterasjon-2-t1",
            type: "multiple-choice",
            xp: 10,
            question:
              "Når bør du teste koden AI-en har laget?",
            options: [
              "Kun helt til slutt, når alt er ferdig",
              "Aldri, AI-en tar ikke feil",
              "Fortløpende, etter hver meningsfulle endring",
              "Kun hvis noe ser rart ut",
            ],
            correctIndex: 2,
            explanation:
              "Å teste fortløpende gjør at du oppdager problemer mens de er små og enkle å fikse, i stedet for å grave gjennom mye kode senere.",
          },
          {
            id: "iterasjon-2-t2",
            type: "rate-prompt",
            xp: 15,
            scenario:
              "AI-en har akkurat lagt til en ny funksjon i prosjektet ditt.",
            examplePrompt:
              "Kjør gjennom testene, og vis meg hva som skjer i konsollen hvis noe feiler.",
            choices: [
              {
                label: "Dette er en god oppfølging - den ber om verifisering",
                correct: true,
              },
              { label: "Dette er unødvendig, bare gå videre", correct: false },
            ],
            explanation:
              "Å be om verifisering etter en endring er en sentral vane i vibecoding - du sikrer kvalitet før du bygger videre.",
          },
        ],
      },
    ],
  },
  {
    id: "feilsoking",
    title: "Feilsøking med AI",
    description: "Løs feil sammen med AI-en, uten å bomme i blinde.",
    emoji: "🐛",
    gradient: "from-rose-500 to-orange-500",
    lessons: [
      {
        id: "feilsoking-1",
        title: "Beskriv feilen riktig",
        description: "Gi AI-en det den trenger for å hjelpe deg.",
        tasks: [
          {
            id: "feilsoking-1-t1",
            type: "fill-prompt",
            xp: 15,
            scenario:
              "Appen din krasjer med feilmeldingen \"TypeError: cannot read property 'name' of undefined\" når du laster inn profilsiden.",
            instruction:
              "Skriv en prompt der du ber AI-en om hjelp. Bruk gjerne ordet \"feilmelding\" og beskriv hva du forventet skulle skje.",
            placeholder: "F.eks: Jeg får denne feilmeldingen...",
            keywords: ["feilmelding", "feil"],
            explanation:
              "Jo mer presist du beskriver feilmeldingen og hva du forventet, desto raskere kan AI-en finne rotårsaken i stedet for å gjette.",
          },
          {
            id: "feilsoking-1-t2",
            type: "multiple-choice",
            xp: 10,
            question:
              "Hva bør du alltid inkludere når du ber AI-en fikse en feil?",
            options: [
              "Kun at \"det virker ikke\"",
              "Den faktiske feilmeldingen og hva du forventet skulle skje",
              "En helt ny funksjonsbeskrivelse, uten å nevne feilen",
              "Ingenting, AI-en finner det selv uansett",
            ],
            correctIndex: 1,
            explanation:
              "Konkrete detaljer - feilmelding, hva du gjorde, og hva du forventet - gjør at AI-en kan resonnere seg frem til riktig årsak.",
          },
        ],
      },
      {
        id: "feilsoking-2",
        title: "Les feilmeldinger sammen med AI",
        description: "Forstå før du fikser.",
        tasks: [
          {
            id: "feilsoking-2-t1",
            type: "order-steps",
            xp: 15,
            instruction: "Sorter en god feilsøkingsflyt.",
            steps: [
              "Kopier hele feilmeldingen",
              "Forklar hva du forventet skulle skje",
              "Be AI-en forklare årsaken før den fikser noe",
              "Test løsningen etterpå",
            ],
            explanation:
              "Å forstå årsaken før man fikser gjør at du lærer noe, og reduserer sjansen for at samme feil dukker opp igjen senere.",
          },
          {
            id: "feilsoking-2-t2",
            type: "multiple-choice",
            xp: 10,
            question:
              "Hvorfor bør du ikke blindt godta enhver fiks AI-en foreslår?",
            options: [
              "Fordi AI-en alltid tar feil",
              "Fordi du bør forstå endringen for å sikre at den faktisk løser problemet riktig",
              "Det spiller ingen rolle, du kan alltid angre",
              "Fordi det er forbudt å bruke AI til feilsøking",
            ],
            correctIndex: 1,
            explanation:
              "Du er fortsatt ansvarlig for koden. Å forstå fiksen gjør at du kan vurdere om den faktisk løser problemet - ikke bare skjuler det.",
          },
        ],
      },
    ],
  },
  {
    id: "kvalitet",
    title: "Kvalitetssjekk og testing",
    description: "Kommer snart.",
    emoji: "✅",
    gradient: "from-emerald-400 to-teal-500",
    locked: true,
    lessons: [],
  },
  {
    id: "beste-praksis",
    title: "Beste praksis og fallgruver",
    description: "Kommer snart.",
    emoji: "⚠️",
    gradient: "from-amber-400 to-yellow-500",
    locked: true,
    lessons: [],
  },
];

export function getModule(moduleId: string): Module | undefined {
  return CURRICULUM.find((m) => m.id === moduleId);
}

export function getLesson(moduleId: string, lessonId: string) {
  const mod = getModule(moduleId);
  return mod?.lessons.find((l) => l.id === lessonId);
}

export function getAllLessons() {
  return CURRICULUM.filter((m) => !m.locked).flatMap((m) =>
    m.lessons.map((l) => ({ moduleId: m.id, lesson: l }))
  );
}

export function isLessonUnlocked(
  completedLessons: string[],
  lessonId: string
): boolean {
  const all = getAllLessons();
  const idx = all.findIndex((x) => x.lesson.id === lessonId);
  if (idx <= 0) return true;
  const prev = all[idx - 1];
  return completedLessons.includes(prev.lesson.id);
}

export function getTotalXp(): number {
  return CURRICULUM.flatMap((m) => m.lessons)
    .flatMap((l) => l.tasks)
    .reduce((sum, t) => sum + t.xp, 0);
}
