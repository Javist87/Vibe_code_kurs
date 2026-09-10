"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mascot } from "@/components/Mascot";
import { useProfile } from "@/context/ProfileContext";
import { PrimaryButton, SecondaryButton } from "@/components/ui";
import { Level } from "@/lib/types";

interface Question {
  id: string;
  question: string;
  options: { label: string; points: number }[];
}

const QUESTIONS: Question[] = [
  {
    id: "coding",
    question: "Har du skrevet kode før?",
    options: [
      { label: "Nei, aldri", points: 0 },
      { label: "Litt, som nybegynner", points: 1 },
      { label: "Ja, jevnlig", points: 2 },
    ],
  },
  {
    id: "ai-tools",
    question: "Har du brukt AI-verktøy som ChatGPT eller Claude før?",
    options: [
      { label: "Nei", points: 0 },
      { label: "Noen ganger", points: 1 },
      { label: "Ja, ofte", points: 2 },
    ],
  },
  {
    id: "prompt",
    question: "Vet du hva en \"prompt\" er?",
    options: [
      { label: "Nei", points: 0 },
      { label: "Har hørt om det", points: 1 },
      { label: "Ja, bruker det regelmessig", points: 2 },
    ],
  },
  {
    id: "vibecoding-tools",
    question:
      "Har du hørt om verktøy som Claude Code, Cursor eller GitHub Copilot?",
    options: [
      { label: "Nei", points: 0 },
      { label: "Har hørt navnet", points: 1 },
      { label: "Ja, har brukt et av dem", points: 2 },
    ],
  },
];

function levelFromScore(score: number): Level {
  if (score <= 2) return "nybegynner";
  if (score <= 5) return "viderekommen";
  return "erfaren";
}

export default function OnboardingPage() {
  const router = useRouter();
  const { startProfile } = useProfile();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const totalSteps = QUESTIONS.length + 1;
  const progress = Math.round((step / totalSteps) * 100);

  const finish = (finalAnswers: Record<string, number>) => {
    const score = Object.values(finalAnswers).reduce((a, b) => a + b, 0);
    const level = levelFromScore(score);
    startProfile(name, level);
    router.push("/learn");
  };

  const answerQuestion = (questionId: string, points: number) => {
    const next = { ...answers, [questionId]: points };
    setAnswers(next);
    if (step + 1 >= totalSteps) {
      finish(next);
    } else {
      setStep((s) => s + 1);
    }
  };

  return (
    <main className="flex flex-1 flex-col items-center bg-gradient-to-b from-brand-50 to-background px-6 py-10">
      <div className="w-full max-w-md">
        <div className="h-3 w-full overflow-hidden rounded-full bg-brand-100">
          <div
            className="h-full rounded-full bg-accent-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-8 flex flex-col items-center gap-6 text-center">
          <Mascot mood="thinking" className="h-28 w-28" />

          {step === 0 ? (
            <div className="flex w-full flex-col items-center gap-4 animate-pop-in">
              <h1 className="font-heading text-2xl font-extrabold text-brand-900">
                Hva skal vi kalle deg?
              </h1>
              <input
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Skriv navnet ditt"
                className="w-full rounded-2xl border-2 border-brand-200 bg-surface px-4 py-3 text-center text-lg font-bold text-brand-900 outline-none focus:border-accent-500"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && name.trim()) setStep(1);
                }}
              />
              <PrimaryButton
                disabled={!name.trim()}
                onClick={() => setStep(1)}
                className="w-full"
              >
                Neste
              </PrimaryButton>
            </div>
          ) : (
            <div
              key={QUESTIONS[step - 1].id}
              className="flex w-full flex-col items-center gap-4 animate-pop-in"
            >
              <h1 className="font-heading text-2xl font-extrabold text-brand-900">
                {QUESTIONS[step - 1].question}
              </h1>
              <div className="flex w-full flex-col gap-3">
                {QUESTIONS[step - 1].options.map((opt) => (
                  <SecondaryButton
                    key={opt.label}
                    className="w-full"
                    onClick={() => answerQuestion(QUESTIONS[step - 1].id, opt.points)}
                  >
                    {opt.label}
                  </SecondaryButton>
                ))}
              </div>
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="text-sm font-bold text-brand-400 hover:text-accent-600"
                >
                  Tilbake
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
