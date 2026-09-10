"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Mascot } from "@/components/Mascot";
import { useProfile } from "@/context/ProfileContext";
import { PrimaryButton } from "@/components/ui";

export default function Home() {
  const { profile, isLoaded } = useProfile();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && profile) {
      router.replace("/learn");
    }
  }, [isLoaded, profile, router]);

  if (!isLoaded || profile) {
    return <div className="flex flex-1 items-center justify-center" />;
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 bg-gradient-to-b from-violet-100 via-fuchsia-50 to-white px-6 py-16 text-center">
      <Mascot mood="celebrate" className="animate-float h-40 w-40" />

      <div className="flex flex-col gap-3">
        <h1 className="font-heading text-4xl font-extrabold text-violet-900 sm:text-5xl">
          Vibekurs
        </h1>
        <p className="max-w-md text-lg font-semibold text-violet-700">
          Lær å bygge programvare sammen med AI - i små, lekne steg som
          tilpasser seg akkurat ditt nivå.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {[
          "🎯 Tilpasset ditt nivå",
          "🔥 Bygg en daglig streak",
          "🏆 Lås opp premier",
        ].map((item) => (
          <span
            key={item}
            className="rounded-full bg-white px-4 py-2 text-sm font-bold text-violet-700 shadow-sm"
          >
            {item}
          </span>
        ))}
      </div>

      <Link href="/onboarding">
        <PrimaryButton className="text-lg">Kom i gang - gratis</PrimaryButton>
      </Link>

      <h2 className="font-heading text-xl font-bold text-violet-800">
        Takk til Astar kursholdere
      </h2>

      <p className="text-xs font-semibold text-violet-400">
        Testversjon &middot; fremgangen din lagres kun i denne nettleseren
      </p>
    </main>
  );
}
