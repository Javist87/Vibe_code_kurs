export function XpPill({ xp }: { xp: number }) {
  return (
    <div className="flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1.5 text-amber-700 font-extrabold shadow-sm">
      <span aria-hidden>⭐</span>
      <span>{xp} XP</span>
    </div>
  );
}

export function StreakPill({ streak }: { streak: number }) {
  return (
    <div className="flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1.5 text-orange-600 font-extrabold shadow-sm">
      <span aria-hidden className={streak > 0 ? "animate-wiggle inline-block" : ""}>
        🔥
      </span>
      <span>
        {streak} {streak === 1 ? "dag" : "dager"}
      </span>
    </div>
  );
}
