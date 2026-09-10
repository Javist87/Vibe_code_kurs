"use client";

import { useState } from "react";
import { MultipleChoiceTask } from "@/lib/types";
import { FeedbackBanner, PrimaryButton } from "@/components/ui";

export function MultipleChoiceTaskView({
  task,
  onComplete,
}: {
  task: MultipleChoiceTask;
  onComplete: (correct: boolean) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);

  const isCorrect = selected === task.correctIndex;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-heading text-xl font-bold text-brand-900">
        {task.question}
      </h2>
      <div className="flex flex-col gap-3">
        {task.options.map((option, i) => {
          const isSelected = selected === i;
          let stateClasses =
            "border-brand-100 bg-surface hover:border-brand-300";
          if (checked && isSelected) {
            stateClasses =
              i === task.correctIndex
                ? "border-[color:var(--success-border)] bg-[color:var(--success-bg)]"
                : "border-[color:var(--danger-border)] bg-[color:var(--danger-bg)]";
          } else if (checked && i === task.correctIndex) {
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
              {option}
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
