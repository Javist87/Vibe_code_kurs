"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mascot } from "@/components/Mascot";
import { Logo } from "@/components/Logo";
import { useProfile } from "@/context/ProfileContext";
import { PrimaryButton } from "@/components/ui";

/**
 * Visuell dummy som simulerer hvordan en pålogging kan se ut.
 * Ingen faktisk autentisering skjer - alt som skrives inn godtas,
 * og en midlertidig profil opprettes lokalt slik at flyten kan prøves.
 */
export default function LoginPage() {
  const router = useRouter();
  const { profile, isLoaded, startProfile } = useProfile();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading">("idle");

  useEffect(() => {
    if (isLoaded && profile) {
      router.replace("/learn");
    }
  }, [isLoaded, profile, router]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");

    setTimeout(() => {
      const displayName = email.split("@")[0] || "Vibecoder";
      startProfile(displayName, "nybegynner");
      router.push("/learn");
    }, 1100);
  };

  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-brand-50 to-background px-6 py-10">
      <div className="flex w-full max-w-sm flex-col items-center gap-6">
        <Logo markClassName="h-9 w-9" wordmarkClassName="text-xl" />

        <Mascot mood={status === "loading" ? "thinking" : "happy"} className="h-24 w-24" />

        <div className="text-center">
          <h1 className="font-heading text-2xl font-extrabold text-brand-900">
            Logg inn
          </h1>
          <p className="mt-1 text-sm font-semibold text-brand-400">
            Demo &middot; ingen ekte konto opprettes
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
          <label className="flex flex-col gap-1 text-left">
            <span className="text-xs font-bold text-accent-600">E-post</span>
            <input
              type="email"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="deg@eksempel.no"
              className="w-full rounded-2xl border-2 border-brand-200 bg-surface px-4 py-3 text-brand-900 outline-none focus:border-accent-500"
            />
          </label>

          <label className="flex flex-col gap-1 text-left">
            <span className="text-xs font-bold text-accent-600">Passord</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-2xl border-2 border-brand-200 bg-surface px-4 py-3 text-brand-900 outline-none focus:border-accent-500"
            />
          </label>

          <div className="text-right">
            <button
              type="button"
              className="text-xs font-bold text-brand-400 hover:text-accent-600"
            >
              Glemt passord?
            </button>
          </div>

          <PrimaryButton type="submit" disabled={status === "loading"} className="w-full">
            {status === "loading" ? "Logger inn ..." : "Logg inn"}
          </PrimaryButton>
        </form>

        <div className="flex w-full items-center gap-3 text-xs font-bold text-brand-300">
          <span className="h-px flex-1 bg-brand-100" />
          eller
          <span className="h-px flex-1 bg-brand-100" />
        </div>

        <div className="flex w-full flex-col gap-3">
          <button
            type="button"
            disabled={status === "loading"}
            onClick={handleSubmit}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-brand-200 bg-surface px-4 py-3 font-extrabold text-brand-700 transition hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            🔵 Fortsett med Google
          </button>
          <button
            type="button"
            disabled={status === "loading"}
            onClick={handleSubmit}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-brand-200 bg-surface px-4 py-3 font-extrabold text-brand-700 transition hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ⚫ Fortsett med GitHub
          </button>
        </div>

        <p className="text-sm font-semibold text-brand-400">
          Ny her?{" "}
          <Link href="/onboarding" className="text-accent-600 hover:text-brand-700">
            Start kurset
          </Link>
        </p>
      </div>
    </main>
  );
}
