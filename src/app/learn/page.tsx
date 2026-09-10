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
    <main className="flex flex-1 flex-col bg-gradient-to-b from-violet-50 to-white">
      <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-violet-100 bg-white/90 px-5 py-3 backdrop-blur">
        <Link href="/profile" className="flex items-center gap-2">
          <Mascot mood="happy" className="h-10 w-10" />
          <div className="text-left">
            <p className="text-sm font-extrabold text-violet-900 leading-none">
              {profile.name}
            </p>
            <p className="text-xs font-semibold text-violet-400">
              {LEVEL_LABELS[profile.level]}
            </p>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/tips"
            className="rounded-full bg-violet-50 px-3 py-1.5 text-sm font-extrabold text-violet-600 shadow-sm hover:bg-violet-100"
          >
            💡 Tips
          </Link>
          <StreakPill streak={profile.streak} />
          <XpPill xp={profile.xp} />
        </div>
      </header>

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
