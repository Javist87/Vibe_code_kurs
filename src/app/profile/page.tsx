"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useProfile } from "@/context/ProfileContext";
import { Mascot } from "@/components/Mascot";
import { XpPill, StreakPill } from "@/components/HeaderStats";
import { BADGES } from "@/lib/badges";
import { LEVEL_LABELS } from "@/lib/types";
import { getAllLessons } from "@/lib/curriculum";

export default function ProfilePage() {
  const { profile, isLoaded } = useProfile();
  const router = useRouter();

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
    <main className="flex flex-1 flex-col items-center gap-8 bg-gradient-to-b from-brand-50 to-background px-5 py-10">
      <div className="flex w-full max-w-md items-center justify-between">
        <Link href="/learn" className="text-sm font-bold text-brand-400 hover:text-accent-600">
          ← Tilbake til stien
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/tips" className="text-sm font-bold text-brand-400 hover:text-accent-600">
            💡 Tips og triks
          </Link>
          <Link href="/settings" className="text-sm font-bold text-brand-400 hover:text-accent-600">
            ⚙️ Innstillinger
          </Link>
        </div>
      </div>

      <Mascot mood="happy" className="h-28 w-28" />

      <div className="text-center">
        <h1 className="font-heading text-2xl font-extrabold text-brand-900">
          {profile.name}
        </h1>
        <p className="font-semibold text-brand-400">
          {LEVEL_LABELS[profile.level]}
        </p>
      </div>

      <div className="flex gap-3">
        <XpPill xp={profile.xp} />
        <StreakPill streak={profile.streak} />
      </div>

      <div className="w-full max-w-md rounded-2xl border border-brand-100 bg-surface p-4 shadow-sm">
        <div className="flex items-center justify-between text-sm font-bold text-brand-700">
          <span>Fremgang</span>
          <span>
            {completed} / {totalLessons} leksjoner
          </span>
        </div>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-brand-100">
          <div
            className="h-full rounded-full bg-accent-500 transition-all"
            style={{
              width: `${totalLessons > 0 ? (completed / totalLessons) * 100 : 0}%`,
            }}
          />
        </div>
      </div>

      <div className="w-full max-w-md">
        <h2 className="mb-3 font-heading text-lg font-extrabold text-brand-900">
          Premier
        </h2>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {BADGES.map((badge) => {
            const earned = profile.earnedBadges.includes(badge.id);
            return (
              <div
                key={badge.id}
                title={badge.description}
                className={`flex flex-col items-center gap-1 rounded-2xl border border-brand-100 p-3 text-center shadow-sm ${
                  earned ? "bg-surface" : "bg-brand-50 opacity-50 grayscale"
                }`}
              >
                <span className="text-3xl">{badge.emoji}</span>
                <span className="text-[11px] font-bold text-brand-800 leading-tight">
                  {badge.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <Link
        href="/settings"
        className="text-sm font-bold text-brand-300 hover:text-accent-600"
      >
        ⚙️ Endre navn, nivå eller nullstill fremgang
      </Link>
    </main>
  );
}
