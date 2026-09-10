export function XpPill({ xp }: { xp: number }) {
  return (
    <div className="flex items-center gap-1.5 rounded-full bg-[color:var(--xp-bg)] px-3 py-1.5 text-[color:var(--xp-text)] font-extrabold shadow-sm">
      <span aria-hidden>⭐</span>
      <span>{xp} XP</span>
    </div>
  );
}

export function StreakPill({ streak }: { streak: number }) {
  return (
    <div
      className={`flex items-center gap-1.5 rounded-full bg-[color:var(--streak-bg)] px-3 py-1.5 text-[color:var(--streak-text)] font-extrabold shadow-sm ${
        streak >= 3 ? "shadow-[0_0_0_3px_rgba(251,146,60,0.25)]" : ""
      }`}
    >
      <span aria-hidden className={streak > 0 ? "animate-wiggle inline-block" : ""}>
        🔥
      </span>
      <span>
        {streak} {streak === 1 ? "dag" : "dager"}
      </span>
    </div>
  );
}
