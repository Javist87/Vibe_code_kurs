"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useProfile } from "@/context/ProfileContext";
import { Mascot } from "@/components/Mascot";

type ResourceLink = {
  title: string;
  description: string;
  href: string;
};

const AI_TOOLS: ResourceLink[] = [
  {
    title: "Claude",
    description: "Anthropics AI-assistent - godt egnet for prompting, koding og feilsøking.",
    href: "https://claude.ai",
  },
  {
    title: "Claude Code",
    description: "Claude rett i terminalen - kan lese, skrive og kjøre kode i prosjektet ditt.",
    href: "https://claude.com/claude-code",
  },
  {
    title: "ChatGPT",
    description: "OpenAIs AI-assistent - nyttig for å diskutere løsninger og forklare kode.",
    href: "https://chatgpt.com",
  },
  {
    title: "GitHub Copilot",
    description: "AI-autofullføring rett i kodeeditoren din.",
    href: "https://github.com/features/copilot",
  },
  {
    title: "Cursor",
    description: "Kodeeditor bygget rundt AI-samarbeid fra bunnen av.",
    href: "https://cursor.com",
  },
  {
    title: "v0 by Vercel",
    description: "Generer UI-komponenter i React fra en tekstbeskrivelse.",
    href: "https://v0.dev",
  },
];

const LEARN_MORE: ResourceLink[] = [
  {
    title: "Next.js-dokumentasjon",
    description: "Offisiell dokumentasjon for rammeverket denne appen er bygget med.",
    href: "https://nextjs.org/docs",
  },
  {
    title: "MDN Web Docs",
    description: "Grundig oppslagsverk for HTML, CSS og JavaScript.",
    href: "https://developer.mozilla.org",
  },
  {
    title: "freeCodeCamp",
    description: "Gratis, praktiske kurs i programmering for nybegynnere.",
    href: "https://www.freecodecamp.org",
  },
];

const TIPS: { emoji: string; title: string; body: string }[] = [
  {
    emoji: "🎯",
    title: "Vær konkret",
    body: "Jo mer presist du beskriver hva du vil ha, jo bedre svar får du. Nevn språk, rammeverk og ønsket resultat.",
  },
  {
    emoji: "🧩",
    title: "Del opp i små steg",
    body: "Be om én ting av gangen i stedet for hele appen på én gang. Da er det lettere å teste og rette underveis.",
  },
  {
    emoji: "🔁",
    title: "Iterer i stedet for å starte på nytt",
    body: "Bygg videre på det som fungerer. Be AI-en justere det som mangler, fremfor å skrive alt på nytt.",
  },
  {
    emoji: "📎",
    title: "Gi kontekst",
    body: "Del relevant kode, feilmeldinger eller mål med prosjektet. AI-en gjetter mindre når den vet mer.",
  },
  {
    emoji: "🐛",
    title: "Lim inn hele feilmeldingen",
    body: "Ved feilsøking: lim inn hele feilteksten, ikke bare et utdrag. Detaljene avslører ofte årsaken.",
  },
  {
    emoji: "✅",
    title: "Test det du får",
    body: "Stol ikke blindt på kode du ikke har sett kjøre. Test tidlig og ofte, spesielt før du bygger videre.",
  },
  {
    emoji: "🗣️",
    title: "Be om forklaring",
    body: "Forstår du ikke koden du fikk? Be AI-en forklare den linje for linje - det er slik du lærer.",
  },
  {
    emoji: "⚠️",
    title: "Dobbeltsjekk sikkerhet og data",
    body: "Ikke lim inn passord, nøkler eller sensitive data i en prompt. Vær kritisk til kode som håndterer brukerdata.",
  },
];

function LinkCard({ resource }: { resource: ResourceLink }) {
  return (
    <a
      href={resource.href}
      target="_blank"
      rel="noreferrer"
      className="flex flex-col gap-1 rounded-2xl border border-brand-100 bg-surface p-4 shadow-sm transition hover:shadow-md"
    >
      <span className="font-heading font-extrabold text-brand-900">
        {resource.title}
      </span>
      <span className="text-sm font-semibold text-accent-500">
        {resource.description}
      </span>
    </a>
  );
}

export default function TipsPage() {
  const { profile, isLoaded } = useProfile();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !profile) {
      router.replace("/");
    }
  }, [isLoaded, profile, router]);

  if (!isLoaded || !profile) {
    return <div className="flex flex-1 items-center justify-center" />;
  }

  return (
    <main className="flex flex-1 flex-col items-center gap-8 bg-gradient-to-b from-brand-50 to-background px-5 py-10">
      <Link
        href="/learn"
        className="self-start text-sm font-bold text-brand-400 hover:text-accent-600"
      >
        ← Tilbake til stien
      </Link>

      <Mascot mood="thinking" className="h-24 w-24" />

      <div className="text-center">
        <h1 className="font-heading text-2xl font-extrabold text-brand-900">
          Tips, triks og nyttige lenker
        </h1>
        <p className="mt-1 max-w-md font-semibold text-accent-500">
          Praktiske huskeregler og verktøy som gjør vibecoding-hverdagen din
          enklere.
        </p>
      </div>

      <section className="w-full max-w-2xl">
        <h2 className="mb-3 font-heading text-lg font-extrabold text-brand-900">
          Tips og triks
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {TIPS.map((tip) => (
            <div
              key={tip.title}
              className="rounded-2xl border border-brand-100 bg-surface p-4 shadow-sm"
            >
              <p className="font-extrabold text-brand-800">
                <span aria-hidden>{tip.emoji}</span> {tip.title}
              </p>
              <p className="mt-1 text-sm font-semibold text-accent-500">
                {tip.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-2xl">
        <h2 className="mb-3 font-heading text-lg font-extrabold text-brand-900">
          AI-verktøy
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {AI_TOOLS.map((tool) => (
            <LinkCard key={tool.title} resource={tool} />
          ))}
        </div>
      </section>

      <section className="w-full max-w-2xl">
        <h2 className="mb-3 font-heading text-lg font-extrabold text-brand-900">
          Lær mer
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {LEARN_MORE.map((resource) => (
            <LinkCard key={resource.title} resource={resource} />
          ))}
        </div>
      </section>
    </main>
  );
}
