"use client";

import { useState } from "react";
import { FillPromptTask } from "@/lib/types";
import { FeedbackBanner, PrimaryButton } from "@/components/ui";

export function FillPromptTaskView({
  task,
  onComplete,
}: {
  task: FillPromptTask;
  onComplete: (correct: boolean) => void;
}) {
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);

  const normalized = value.toLowerCase();
  const isCorrect =
    value.trim().length >= 8 &&
    task.keywords.some((k) => normalized.includes(k.toLowerCase()));

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl bg-brand-50 p-4">
        <p className="text-sm font-semibold text-accent-500">Situasjon</p>
        <p className="mt-1 text-brand-900">{task.scenario}</p>
      </div>
      <h2 className="font-heading text-lg font-bold text-brand-900">
        {task.instruction}
      </h2>
      <textarea
        value={value}
        disabled={checked}
        onChange={(e) => setValue(e.target.value)}
        placeholder={task.placeholder}
        rows={3}
        className="w-full rounded-2xl border-2 border-brand-200 bg-surface p-4 font-medium text-brand-900 outline-none focus:border-accent-500 disabled:bg-brand-50"
      />

      {checked ? (
        <>
          <FeedbackBanner correct={isCorrect} explanation={task.explanation} />
          <PrimaryButton onClick={() => onComplete(isCorrect)}>
            Fortsett
          </PrimaryButton>
        </>
      ) : (
        <PrimaryButton
          disabled={value.trim().length === 0}
          onClick={() => setChecked(true)}
        >
          Sjekk svar
        </PrimaryButton>
      )}
    </div>
  );
}
