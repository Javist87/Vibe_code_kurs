"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useProfile } from "@/context/ProfileContext";
import { getLesson, getModule, isLessonUnlocked } from "@/lib/curriculum";
import { TaskRenderer } from "@/components/tasks/TaskRenderer";
import { Mascot, MascotMood } from "@/components/Mascot";
import { WanderingMascot } from "@/components/WanderingMascot";
import { Confetti } from "@/components/Confetti";
import { PrimaryButton } from "@/components/ui";
import { XpBurst, XpPopup } from "@/components/XpBurst";
import { BADGES } from "@/lib/badges";
import { LESSON_COMPLETE_HEADINGS, pickRandom, streakMessage } from "@/lib/motivation";

export default function LessonPage() {
  const params = useParams<{ moduleId: string; lessonId: string }>();
  const router = useRouter();
  const { profile, isLoaded, completeLesson } = useProfile();

  const moduleId = params.moduleId;
  const lessonId = params.lessonId;

  const mod = getModule(moduleId);
  const lesson = getLesson(moduleId, lessonId);

  const [taskIndex, setTaskIndex] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [mood, setMood] = useState<MascotMood>("happy");
  const [phase, setPhase] = useState<"task" | "summary">("task");
  const [summary, setSummary] = useState<{
    xp: number;
    newBadgeIds: string[];
    leveledUpStreak: boolean;
  } | null>(null);
  const [xpPopups, setXpPopups] = useState<XpPopup[]>([]);
  const xpPopupId = useRef(0);
  const [completeHeading] = useState(() => pickRandom(LESSON_COMPLETE_HEADINGS));

  useEffect(() => {
    if (!isLoaded) return;
    if (!profile) {
      router.replace("/");
      return;
    }
    if (!mod || !lesson) {
      router.replace("/learn");
      return;
    }
    if (
      !profile.completedLessons.includes(lessonId) &&
      !isLessonUnlocked(profile.completedLessons, lessonId)
    ) {
      router.replace("/learn");
    }
  }, [isLoaded, profile, mod, lesson, lessonId, router]);

  const totalTasks = lesson?.tasks.length ?? 0;
  const progress = totalTasks > 0 ? Math.round((taskIndex / totalTasks) * 100) : 0;
  const earnedBadgeDetails = useMemo(
    () => BADGES.filter((b) => summary?.newBadgeIds.includes(b.id)),
    [summary]
  );

  if (!isLoaded || !profile || !mod || !lesson) {
    return <div className="flex flex-1 items-center justify-center" />;
  }

  const handleTaskComplete = (correct: boolean) => {
    setMood(correct ? "celebrate" : "oops");
    const gained = correct ? lesson.tasks[taskIndex].xp : 0;
    const newXp = xpEarned + gained;
    setXpEarned(newXp);

    if (gained > 0) {
      const id = xpPopupId.current++;
      setXpPopups((prev) => [...prev, { id, amount: gained }]);
      setTimeout(() => {
        setXpPopups((prev) => prev.filter((p) => p.id !== id));
      }, 1100);
    }

    if (taskIndex + 1 < totalTasks) {
      setTaskIndex((i) => i + 1);
      setTimeout(() => setMood("happy"), 900);
    } else {
      const result = completeLesson(lesson.id, newXp);
      setSummary({
        xp: result.xpGained,
        newBadgeIds: result.newBadgeIds,
        leveledUpStreak: result.leveledUpStreak,
      });
      setPhase("summary");
    }
  };

  if (phase === "summary" && summary) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-6 bg-gradient-to-b from-violet-100 to-white px-6 py-10 text-center">
        <Confetti pieces={summary.leveledUpStreak ? 70 : 40} />
        <Mascot mood="celebrate" className="h-32 w-32 animate-pop-in" />
        <h1 className="font-heading text-3xl font-extrabold text-violet-900">
          {completeHeading}
        </h1>
        <p className="rounded-full bg-amber-100 px-5 py-2 font-extrabold text-amber-700">
          + {summary.xp} XP
        </p>

        {summary.leveledUpStreak && (
          <p className="animate-pop-in rounded-full bg-orange-100 px-5 py-2 font-extrabold text-orange-600">
            {streakMessage(profile.streak)}
          </p>
        )}

        {earnedBadgeDetails.length > 0 && (
          <div className="flex flex-col items-center gap-2">
            <p className="font-bold text-violet-700">Ny premie låst opp!</p>
            <div className="flex flex-wrap justify-center gap-3">
              {earnedBadgeDetails.map((badge) => (
                <div
                  key={badge.id}
                  className="animate-pop-in animate-badge-glow flex flex-col items-center gap-1 rounded-2xl bg-white p-3 shadow-md"
                >
                  <span className="text-3xl">{badge.emoji}</span>
                  <span className="text-xs font-bold text-violet-800">
                    {badge.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <Link href="/learn">
          <PrimaryButton>Fortsett stien</PrimaryButton>
        </Link>
      </main>
    );
  }

  const currentTask = lesson.tasks[taskIndex];

  return (
    <main className="flex flex-1 flex-col bg-gradient-to-b from-violet-50 to-white">
      <WanderingMascot mood={mood} active={phase === "task"} />
      <header className="flex items-center gap-3 px-5 py-4">
        <Link
          href="/learn"
          className="text-2xl font-bold text-violet-300 hover:text-violet-500"
          aria-label="Avslutt leksjon"
        >
          ✕
        </Link>
        <div className="h-3 flex-1 overflow-hidden rounded-full bg-violet-100">
          <div
            className="h-full rounded-full bg-violet-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="relative shrink-0">
          <Mascot mood={mood} className="h-10 w-10" />
          <XpBurst popups={xpPopups} />
        </div>
      </header>

      <div className="mx-auto w-full max-w-lg flex-1 px-5 pb-10">
        <p className="mb-4 text-sm font-bold text-violet-400">
          {lesson.title} &middot; oppgave {taskIndex + 1} av {totalTasks}
        </p>
        <TaskRenderer
          key={currentTask.id}
          task={currentTask}
          onComplete={handleTaskComplete}
        />
      </div>
    </main>
  );
}
