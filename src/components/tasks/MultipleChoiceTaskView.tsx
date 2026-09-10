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
      <h2 className="font-heading text-xl font-bold text-violet-900">
        {task.question}
      </h2>
      <div className="flex flex-col gap-3">
        {task.options.map((option, i) => {
          const isSelected = selected === i;
          let stateClasses =
            "border-violet-100 bg-white hover:border-violet-300";
          if (checked && isSelected) {
            stateClasses =
              i === task.correctIndex
                ? "border-emerald-400 bg-emerald-50"
                : "border-rose-400 bg-rose-50";
          } else if (checked && i === task.correctIndex) {
            stateClasses = "border-emerald-400 bg-emerald-50";
          } else if (isSelected) {
            stateClasses = "border-violet-500 bg-violet-50";
          }

          return (
            <button
              key={i}
              type="button"
              disabled={checked}
              onClick={() => setSelected(i)}
              className={`rounded-2xl border-2 px-4 py-3 text-left font-semibold text-violet-900 transition disabled:cursor-default ${stateClasses}`}
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
