"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useProfile } from "@/context/ProfileContext";
import { CURRICULUM } from "@/lib/curriculum";
import { ModulePath } from "@/components/ModulePath";
import { XpPill, StreakPill } from "@/components/HeaderStats";
import { Mascot } from "@/components/Mascot";
import { LEVEL_LABELS } from "@/lib/types";
import { learnPageGreeting } from "@/lib/motivation";

export default function LearnPage() {
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

  return (
    <main className="flex flex-1 flex-col bg-gradient-to-b from-brand-50 to-background">
      <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-brand-100 bg-surface/90 px-5 py-3 backdrop-blur">
        <Link href="/profile" className="flex items-center gap-2">
          <Mascot mood={profile.streak > 0 ? "celebrate" : "happy"} className="h-10 w-10" />
          <div className="text-left">
            <p className="text-sm font-extrabold text-brand-900 leading-none">
              {profile.name}
            </p>
            <p className="text-xs font-semibold text-brand-400">
              {LEVEL_LABELS[profile.level]}
            </p>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/tips"
            className="rounded-full bg-brand-50 px-3 py-1.5 text-sm font-extrabold text-accent-600 shadow-sm hover:bg-brand-100"
          >
            💡 Tips
          </Link>
          <Link
            href="/settings"
            aria-label="Innstillinger"
            className="rounded-full bg-brand-50 px-3 py-1.5 text-sm font-extrabold text-accent-600 shadow-sm hover:bg-brand-100"
          >
            ⚙️
          </Link>
          <StreakPill streak={profile.streak} />
          <XpPill xp={profile.xp} />
        </div>
      </header>

      <p className="px-5 pt-6 text-center font-heading text-lg font-extrabold text-brand-800">
        {learnPageGreeting(profile.name, profile.streak)}
      </p>

      <div className="flex flex-col gap-10 px-4 py-8">
        {CURRICULUM.map((curriculumModule) => (
          <ModulePath
            key={curriculumModule.id}
            module={curriculumModule}
            completedLessons={profile.completedLessons}
          />
        ))}
      </div>
    </main>
  );
}
