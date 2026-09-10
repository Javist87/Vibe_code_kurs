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
      <div className="rounded-2xl bg-violet-50 p-4">
        <p className="text-sm font-semibold text-violet-500">Situasjon</p>
        <p className="mt-1 text-violet-900">{task.scenario}</p>
      </div>
      <div className="rounded-2xl border-2 border-dashed border-violet-200 bg-white p-4 font-mono text-sm text-violet-800">
        &ldquo;{task.examplePrompt}&rdquo;
      </div>

      <div className="flex flex-col gap-3">
        {task.choices.map((choice, i) => {
          const isSelected = selected === i;
          let stateClasses =
            "border-violet-100 bg-white hover:border-violet-300";
          if (checked && isSelected) {
            stateClasses = choice.correct
              ? "border-emerald-400 bg-emerald-50"
              : "border-rose-400 bg-rose-50";
          } else if (checked && choice.correct) {
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
