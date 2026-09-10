"use client";

import { useMemo, useState } from "react";
import { OrderStepsTask } from "@/lib/types";
import { FeedbackBanner, PrimaryButton, SecondaryButton } from "@/components/ui";

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function OrderStepsTaskView({
  task,
  onComplete,
}: {
  task: OrderStepsTask;
  onComplete: (correct: boolean) => void;
}) {
  const shuffled = useMemo(() => shuffle(task.steps), [task]);
  const [remaining, setRemaining] = useState<string[]>(shuffled);
  const [chosen, setChosen] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);

  const isCorrect = task.steps.every((step, i) => chosen[i] === step);

  const pick = (step: string) => {
    if (checked) return;
    setChosen((prev) => [...prev, step]);
    setRemaining((prev) => prev.filter((s) => s !== step));
  };

  const undoLast = () => {
    if (checked || chosen.length === 0) return;
    const last = chosen[chosen.length - 1];
    setChosen((prev) => prev.slice(0, -1));
    setRemaining((prev) => [...prev, last]);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-heading text-xl font-bold text-brand-900">
        {task.instruction}
      </h2>

      <div className="min-h-[3.5rem] rounded-2xl border-2 border-dashed border-brand-300 bg-brand-50 p-3">
        <ol className="flex flex-col gap-2">
          {chosen.map((step, i) => (
            <li
              key={step}
              className="animate-pop-in flex items-center gap-2 rounded-xl border border-brand-100 bg-surface px-3 py-2 font-semibold text-brand-900 shadow-sm"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-600 text-xs font-bold text-white">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
          {chosen.length === 0 && (
            <li className="text-sm font-medium text-brand-400">
              Trykk på stegene under i riktig rekkefølge
            </li>
          )}
        </ol>
      </div>

      <div className="flex flex-wrap gap-2">
        {remaining.map((step) => (
          <button
            key={step}
            type="button"
            disabled={checked}
            onClick={() => pick(step)}
            className="rounded-xl border-2 border-brand-200 bg-surface px-3 py-2 font-semibold text-brand-800 transition hover:border-brand-400 disabled:cursor-default"
          >
            {step}
          </button>
        ))}
      </div>

      {!checked && chosen.length > 0 && (
        <SecondaryButton className="self-start" onClick={undoLast}>
          Angre siste
        </SecondaryButton>
      )}

      {checked ? (
        <>
          <FeedbackBanner correct={isCorrect} explanation={task.explanation} />
          <PrimaryButton onClick={() => onComplete(isCorrect)}>
            Fortsett
          </PrimaryButton>
        </>
      ) : (
        <PrimaryButton
          disabled={remaining.length > 0}
          onClick={() => setChecked(true)}
        >
          Sjekk svar
        </PrimaryButton>
      )}
    </div>
  );
}
