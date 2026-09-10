"use client";

import { useState } from "react";
import { RatePromptTask } from "@/lib/types";
import { FeedbackBanner, PrimaryButton } from "@/components/ui";

export function RatePromptTaskView({
  task,
  onComplete,
}: {
  task: RatePromptTask;
  onComplete: (correct: boolean) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);

  const isCorrect = selected !== null && task.choices[selected].correct;

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl bg-brand-50 p-4">
        <p className="text-sm font-semibold text-accent-500">Situasjon</p>
        <p className="mt-1 text-brand-900">{task.scenario}</p>
      </div>
      <div className="rounded-2xl border-2 border-dashed border-brand-200 bg-surface p-4 font-mono text-sm text-brand-800">
        &ldquo;{task.examplePrompt}&rdquo;
      </div>

      <div className="flex flex-col gap-3">
        {task.choices.map((choice, i) => {
          const isSelected = selected === i;
          let stateClasses =
            "border-brand-100 bg-surface hover:border-brand-300";
          if (checked && isSelected) {
            stateClasses = choice.correct
              ? "border-[color:var(--success-border)] bg-[color:var(--success-bg)]"
              : "border-[color:var(--danger-border)] bg-[color:var(--danger-bg)]";
          } else if (checked && choice.correct) {
            stateClasses = "border-[color:var(--success-border)] bg-[color:var(--success-bg)]";
          } else if (isSelected) {
            stateClasses = "border-accent-500 bg-brand-50";
          }

          return (
            <button
              key={i}
              type="button"
              disabled={checked}
              onClick={() => setSelected(i)}
              className={`rounded-2xl border-2 px-4 py-3 text-left font-semibold text-brand-900 transition disabled:cursor-default ${stateClasses}`}
            >
              {choice.label}
            </button>
          );
        })}
      </div>

      {checked ? (
        <>
          <FeedbackBanner correct={isCorrect} explanation={task.explanation} />
          <PrimaryButton onClick={() => onComplete(isCorrect)}>
            Fortsett
          </PrimaryButton>
        </>
      ) : (
        <PrimaryButton disabled={selected === null} onClick={() => setChecked(true)}>
          Sjekk svar
        </PrimaryButton>
      )}
    </div>
  );
}
