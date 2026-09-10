export interface XpPopup {
  id: number;
  amount: number;
}

export function XpBurst({ popups }: { popups: XpPopup[] }) {
  if (popups.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-x-0 top-full flex justify-center" aria-hidden>
      {popups.map((popup) => (
        <span
          key={popup.id}
          className="animate-xp-float absolute font-heading text-lg font-extrabold text-amber-500"
        >
          +{popup.amount} XP
        </span>
      ))}
    </div>
  );
}
