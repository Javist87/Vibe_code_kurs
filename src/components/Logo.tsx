import { useId } from "react";

/**
 * Ikonmerket ("V" for Vibeskolen/vibecoding) - bruker samme temafargevariabler
 * som maskoten Byte, så logoen følger med når brukeren bytter mellom
 * "lekent" og "seriøst" tema.
 */
export function LogoMark({
  className = "",
  decorative = false,
}: {
  className?: string;
  decorative?: boolean;
}) {
  const gradId = useId();

  return (
    <svg
      viewBox="0 0 128 128"
      className={className}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : "Vibeskolen-logo"}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--mascot-primary)" />
          <stop offset="100%" stopColor="var(--mascot-primary-dark)" />
        </linearGradient>
      </defs>
      <rect width="128" height="128" rx="30" fill={`url(#${gradId})`} />
      <path
        d="M30,46 L64,98 L98,46"
        stroke="#ffffff"
        strokeWidth="15"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M99,14 L101.83,23.17 L111,26 L101.83,28.83 L99,38 L96.17,28.83 L87,26 L96.17,23.17 Z"
        fill="var(--mascot-highlight)"
      />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-heading font-extrabold tracking-tight ${className}`}>
      <span className="bg-gradient-to-r from-accent-500 to-accent-700 bg-clip-text text-transparent">
        Vibe
      </span>
      <span className="text-brand-900">skolen</span>
    </span>
  );
}

export function Logo({
  className = "",
  markClassName = "h-10 w-10",
  wordmarkClassName = "text-2xl",
}: {
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark decorative className={`shrink-0 ${markClassName}`} />
      <Wordmark className={wordmarkClassName} />
    </span>
  );
}
