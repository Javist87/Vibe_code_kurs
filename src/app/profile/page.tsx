"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useProfile } from "@/context/ProfileContext";
import { Mascot } from "@/components/Mascot";
import { XpPill, StreakPill } from "@/components/HeaderStats";
import { BADGES } from "@/lib/badges";
import { LEVEL_LABELS } from "@/lib/types";
import { getAllLessons } from "@/lib/curriculum";
import { SecondaryButton } from "@/components/ui";

export default function ProfilePage() {
  const { profile, isLoaded, resetProfile } = useProfile();
  const router = useRouter();
  const [confirmingReset, setConfirmingReset] = useState(false);

  useEffect(() => {
    if (isLoaded && !profile) {
      router.replace("/");
    }
  }, [isLoaded, profile, router]);

  if (!isLoaded || !profile) {
    return <div className="flex flex-1 items-center justify-center" />;
  }

  const totalLessons = getAllLessons().length;
  const completed = profile.completedLessons.length;

  return (
    <main className="flex flex-1 flex-col items-center gap-8 bg-gradient-to-b from-violet-50 to-white px-5 py-10">
      <div className="flex w-full max-w-md items-center justify-between">
        <Link href="/learn" className="text-sm font-bold text-violet-400 hover:text-violet-600">
          ← Tilbake til stien
        </Link>
        <Link href="/tips" className="text-sm font-bold text-violet-400 hover:text-violet-600">
          💡 Tips og triks
        </Link>
      </div>

      <Mascot mood="happy" className="h-28 w-28" />

      <div className="text-center">
        <h1 className="font-heading text-2xl font-extrabold text-violet-900">
          {profile.name}
        </h1>
        <p className="font-semibold text-violet-400">
          {LEVEL_LABELS[profile.level]}
        </p>
      </div>

      <div className="flex gap-3">
        <XpPill xp={profile.xp} />
        <StreakPill streak={profile.streak} />
      </div>

      <div className="w-full max-w-md rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between text-sm font-bold text-violet-700">
          <span>Fremgang</span>
          <span>
            {completed} / {totalLessons} leksjoner
          </span>
        </div>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-violet-100">
          <div
            className="h-full rounded-full bg-violet-500 transition-all"
            style={{
              width: `${totalLessons > 0 ? (completed / totalLessons) * 100 : 0}%`,
            }}
          />
        </div>
      </div>

      <div className="w-full max-w-md">
        <h2 className="mb-3 font-heading text-lg font-extrabold text-violet-900">
          Premier
        </h2>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {BADGES.map((badge) => {
            const earned = profile.earnedBadges.includes(badge.id);
            return (
              <div
                key={badge.id}
                title={badge.description}
                className={`flex flex-col items-center gap-1 rounded-2xl p-3 text-center shadow-sm ${
                  earned ? "bg-white" : "bg-violet-50 opacity-50 grayscale"
                }`}
              >
                <span className="text-3xl">{badge.emoji}</span>
                <span className="text-[11px] font-bold text-violet-800 leading-tight">
                  {badge.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4">
        {confirmingReset ? (
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm font-bold text-rose-600">
              Sikker? Dette sletter all fremgang i denne nettleseren.
            </p>
            <div className="flex gap-2">
              <SecondaryButton onClick={() => setConfirmingReset(false)}>
                Avbryt
              </SecondaryButton>
              <SecondaryButton
                className="border-rose-300 text-rose-600 hover:bg-rose-50"
                onClick={() => {
                  resetProfile();
                  router.replace("/");
                }}
              >
                Ja, nullstill
              </SecondaryButton>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmingReset(true)}
            className="text-sm font-bold text-violet-300 hover:text-rose-500"
          >
            Nullstill fremgang
          </button>
        )}
      </div>
    </main>
  );
}
