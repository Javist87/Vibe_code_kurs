import { useId } from "react";

/**
 * Ikonmerket ("V" for Vibeskolen/vibecoding) - samme lilla-farger og
 * sparkle-motiv som maskoten Byte, så logoen kjennes igjen som samme app.
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
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#6D28D9" />
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
        fill="#FACC15"
      />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-heading font-extrabold tracking-tight ${className}`}>
      <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
        Vibe
      </span>
      <span className="text-violet-950">skolen</span>
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
