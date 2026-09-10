"use client";

import Link from "next/link";
import { Module } from "@/lib/types";
import { isLessonUnlocked } from "@/lib/curriculum";

const OFFSETS = [0, 64, 96, 64, 0, -64, -96, -64];

export function ModulePath({
  module: mod,
  completedLessons,
}: {
  module: Module;
  completedLessons: string[];
}) {
  if (mod.locked) {
    return (
      <section className="flex flex-col items-center gap-4 opacity-60">
        <div
          className={`w-full max-w-md rounded-3xl bg-gradient-to-r ${mod.gradient} p-5 text-white shadow-md grayscale`}
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">{mod.emoji}</span>
            <div>
              <h2 className="font-heading text-xl font-extrabold">
                {mod.title}
              </h2>
              <p className="text-sm font-semibold opacity-90">Kommer snart 🔒</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center gap-6">
      <div
        className={`w-full max-w-md rounded-3xl bg-gradient-to-r ${mod.gradient} p-5 text-white shadow-md`}
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">{mod.emoji}</span>
          <div>
            <h2 className="font-heading text-xl font-extrabold">
              {mod.title}
            </h2>
            <p className="text-sm font-semibold opacity-90">
              {mod.description}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3">
        {mod.lessons.map((lesson, i) => {
          const completed = completedLessons.includes(lesson.id);
          const unlocked = completed || isLessonUnlocked(completedLessons, lesson.id);
          const offset = OFFSETS[i % OFFSETS.length];

          const nodeClasses = completed
            ? "bg-emerald-400 border-emerald-500 text-white"
            : unlocked
              ? "bg-violet-600 border-violet-700 text-white ring-4 ring-violet-200"
              : "bg-slate-200 border-slate-300 text-slate-400";

          const content = (
            <div
              style={{ transform: `translateX(${offset}px)` }}
              className="flex flex-col items-center gap-1"
            >
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-full border-4 text-2xl font-extrabold shadow-md transition ${nodeClasses} ${
                  unlocked ? "hover:scale-105" : ""
                }`}
              >
                {completed ? "✓" : unlocked ? i + 1 : "🔒"}
              </div>
              <span
                className={`max-w-[7rem] text-center text-xs font-bold ${
                  unlocked ? "text-violet-800" : "text-slate-400"
                }`}
              >
                {lesson.title}
              </span>
            </div>
          );

          if (!unlocked) {
            return (
              <div key={lesson.id} aria-disabled className="cursor-not-allowed">
                {content}
              </div>
            );
          }

          return (
            <Link key={lesson.id} href={`/lesson/${mod.id}/${lesson.id}`}>
              {content}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
