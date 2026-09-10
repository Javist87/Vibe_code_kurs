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

  const sparkles = [
    { left: "12%", top: "20%", delay: "0s", duration: "5s", size: "text-2xl" },
    { left: "85%", top: "18%", delay: "1.2s", duration: "6s", size: "text-xl" },
    { left: "78%", top: "62%", delay: "0.6s", duration: "5.5s", size: "text-lg" },
    { left: "8%", top: "68%", delay: "1.8s", duration: "6.5s", size: "text-xl" },
    { left: "50%", top: "10%", delay: "0.9s", duration: "5.8s", size: "text-lg" },
  ];

  return (
    <main className="relative flex flex-1 flex-col items-center justify-center gap-8 overflow-hidden bg-gradient-to-b from-brand-100 via-brand-50 to-background px-6 py-16 text-center">
      {sparkles.map((s, i) => (
        <span
          key={i}
          aria-hidden
          className={`sparkle-drift -z-10 ${s.size}`}
          style={{
            left: s.left,
            top: s.top,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        >
          ✨
        </span>
      ))}

      <Mascot mood="celebrate" className="animate-float h-40 w-40" />

      <div className="flex flex-col gap-3">
        <h1 className="font-heading text-4xl font-extrabold text-brand-900 sm:text-5xl">
          Vibeskolen
        </h1>
        <p className="max-w-md text-lg font-semibold text-brand-700">
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
            className="rounded-full border border-brand-100 bg-surface px-4 py-2 text-sm font-bold text-brand-700 shadow-sm"
          >
            {item}
          </span>
        ))}
      </div>

      <Link href="/onboarding">
        <PrimaryButton className="text-lg">Kom i gang - gratis</PrimaryButton>
      </Link>

      <p className="text-sm font-semibold text-accent-600">
        Har du allerede en konto?{" "}
        <Link href="/login" className="text-brand-700 underline hover:text-brand-900">
          Logg inn
        </Link>
      </p>

      <div className="flex flex-col items-center gap-2 rounded-2xl border border-brand-100 bg-surface/70 px-6 py-4 shadow-sm">
        <h2 className="font-heading text-xl font-bold text-brand-800">
          Takk til Astar kursholdere
        </h2>
        <p className="max-w-sm text-sm font-medium text-accent-600">
          Stor takk til{" "}
          <a
            href="https://www.astar.sh"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline decoration-2 underline-offset-2 hover:text-brand-800"
          >
            Astar
          </a>{" "}
          for opplæringen som gjorde dette kurset mulig.
        </p>
      </div>

      <p className="text-xs font-semibold text-brand-400">
        Testversjon &middot; fremgangen din lagres kun i denne nettleseren
      </p>
    </main>
  );
}
