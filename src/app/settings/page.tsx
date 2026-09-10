"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useProfile } from "@/context/ProfileContext";
import { useSettings } from "@/context/SettingsContext";
import { Mascot } from "@/components/Mascot";
import { PrimaryButton, SecondaryButton } from "@/components/ui";
import { LEVEL_LABELS, Level, Profile } from "@/lib/types";
import { AppTheme } from "@/lib/settings";

const THEME_OPTIONS: {
  value: AppTheme;
  title: string;
  description: string;
  emoji: string;
}[] = [
  {
    value: "playful",
    title: "Lekent",
    description:
      "Fargerikt og lett, med maskot, konfetti og feiringseffekter.",
    emoji: "🎉",
  },
  {
    value: "serious",
    title: "Seriøst",
    description:
      "Mørkt, stramt og fokusert - uten konfetti, glitter og hopping.",
    emoji: "🛠️",
  },
];

const LEVELS: Level[] = ["nybegynner", "viderekommen", "erfaren"];

export default function SettingsPage() {
  const { profile, isLoaded, resetProfile } = useProfile();
  const { settings, setTheme } = useSettings();
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

  return (
    <main className="flex flex-1 flex-col items-center gap-8 bg-gradient-to-b from-brand-50 to-background px-5 py-10">
      <div className="flex w-full max-w-md items-center justify-between">
        <Link href="/learn" className="text-sm font-bold text-brand-400 hover:text-accent-600">
          ← Tilbake til stien
        </Link>
        <Link href="/profile" className="text-sm font-bold text-brand-400 hover:text-accent-600">
          Til profil →
        </Link>
      </div>

      <Mascot mood="thinking" className="h-24 w-24" />

      <h1 className="font-heading text-2xl font-extrabold text-brand-900">
        Innstillinger
      </h1>

      <section className="w-full max-w-md">
        <h2 className="mb-3 font-heading text-lg font-extrabold text-brand-900">
          Utseende
        </h2>
        <div className="flex flex-col gap-3">
          {THEME_OPTIONS.map((option) => {
            const active = settings.theme === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setTheme(option.value)}
                className={`flex items-start gap-3 rounded-2xl border-2 p-4 text-left transition ${
                  active
                    ? "border-accent-600 bg-brand-50"
                    : "border-brand-100 bg-surface hover:border-brand-300"
                }`}
              >
                <span className="text-2xl">{option.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-heading font-extrabold text-brand-900">
                      {option.title}
                    </span>
                    {active && (
                      <span className="rounded-full bg-accent-600 px-2 py-0.5 text-xs font-bold text-white">
                        Valgt
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm font-semibold text-brand-400">
                    {option.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <ProfileSettingsForm profile={profile} />

      <section className="w-full max-w-md">
        <h2 className="mb-3 font-heading text-lg font-extrabold text-brand-900">
          Fremgang
        </h2>
        <div className="rounded-2xl border border-brand-100 bg-surface p-4 shadow-sm">
          {confirmingReset ? (
            <div className="flex flex-col items-center gap-3 text-center">
              <p className="text-sm font-bold text-[color:var(--danger-text)]">
                Sikker? Dette sletter all fremgang i denne nettleseren.
              </p>
              <div className="flex gap-2">
                <SecondaryButton onClick={() => setConfirmingReset(false)}>
                  Avbryt
                </SecondaryButton>
                <SecondaryButton
                  className="border-[color:var(--danger-border)] text-[color:var(--danger-text)] hover:bg-[color:var(--danger-bg)]"
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
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-brand-400">
                Sletter all lagret fremgang, XP og premier.
              </p>
              <SecondaryButton
                className="border-[color:var(--danger-border)] text-[color:var(--danger-text)] hover:bg-[color:var(--danger-bg)]"
                onClick={() => setConfirmingReset(true)}
              >
                Nullstill
              </SecondaryButton>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function ProfileSettingsForm({ profile }: { profile: Profile }) {
  const { updateProfile } = useProfile();
  const [name, setName] = useState(profile.name);
  const [level, setLevel] = useState<Level>(profile.level);

  const hasChanges = name.trim() !== profile.name || level !== profile.level;

  const saveProfile = () => {
    updateProfile({ name: name.trim() || profile.name, level });
  };

  return (
    <section className="w-full max-w-md">
      <h2 className="mb-3 font-heading text-lg font-extrabold text-brand-900">
        Profil
      </h2>
      <div className="flex flex-col gap-4 rounded-2xl border border-brand-100 bg-surface p-4 shadow-sm">
        <label className="flex flex-col gap-1 text-left">
          <span className="text-xs font-bold text-brand-700">Navn</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-2xl border-2 border-brand-200 bg-surface px-4 py-3 font-bold text-brand-900 outline-none focus:border-accent-500"
          />
        </label>

        <label className="flex flex-col gap-1 text-left">
          <span className="text-xs font-bold text-brand-700">Nivå</span>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value as Level)}
            className="w-full rounded-2xl border-2 border-brand-200 bg-surface px-4 py-3 font-bold text-brand-900 outline-none focus:border-accent-500"
          >
            {LEVELS.map((l) => (
              <option key={l} value={l}>
                {LEVEL_LABELS[l]}
              </option>
            ))}
          </select>
        </label>

        <PrimaryButton disabled={!hasChanges} onClick={saveProfile}>
          Lagre endringer
        </PrimaryButton>
      </div>
    </section>
  );
}
