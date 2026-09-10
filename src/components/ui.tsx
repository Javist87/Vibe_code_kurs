"use client";

import { ButtonHTMLAttributes, useState } from "react";
import { CORRECT_MESSAGES, INCORRECT_MESSAGES, pickRandom } from "@/lib/motivation";

export function PrimaryButton({
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`rounded-2xl bg-violet-600 px-6 py-3 font-extrabold text-white shadow-[0_4px_0_0_#5B21B6] transition active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:bg-violet-300 disabled:shadow-none ${className}`}
    />
  );
}

export function SecondaryButton({
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`rounded-2xl border-2 border-violet-200 bg-white px-6 py-3 font-extrabold text-violet-700 transition hover:bg-violet-50 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    />
  );
}

export function FeedbackBanner({
  correct,
  explanation,
}: {
  correct: boolean;
  explanation: string;
}) {
  const [heading] = useState(() =>
    pickRandom(correct ? CORRECT_MESSAGES : INCORRECT_MESSAGES)
  );

  return (
    <div
      className={`animate-pop-in rounded-2xl border-2 p-4 ${
        correct
          ? "border-emerald-300 bg-emerald-50 text-emerald-800 shadow-[0_0_0_4px_rgba(52,211,153,0.15)]"
          : "border-rose-300 bg-rose-50 text-rose-800"
      }`}
    >
      <p className="font-extrabold">{heading}</p>
      <p className="mt-1 text-sm leading-relaxed">{explanation}</p>
    </div>
  );
}
