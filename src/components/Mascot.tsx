export type MascotMood = "happy" | "celebrate" | "thinking" | "oops";

const MOUTHS: Record<MascotMood, string> = {
  happy: "M70 120 Q100 145 130 120",
  celebrate: "M65 115 Q100 155 135 115",
  thinking: "M78 124 Q100 132 122 124",
  oops: "M75 130 Q100 112 125 130",
};

const EYE_STYLE: Record<MascotMood, { ry: number; cyOffset: number }> = {
  happy: { ry: 10, cyOffset: 0 },
  celebrate: { ry: 12, cyOffset: -2 },
  thinking: { ry: 8, cyOffset: 2 },
  oops: { ry: 7, cyOffset: 3 },
};

const MOOD_MOTION_CLASS: Record<MascotMood, string> = {
  happy: "",
  celebrate: "mascot-mood-celebrate",
  thinking: "mascot-mood-thinking",
  oops: "mascot-mood-oops",
};

export function Mascot({
  mood = "happy",
  className = "",
}: {
  mood?: MascotMood;
  className?: string;
}) {
  const eye = EYE_STYLE[mood];

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label={`Maskoten Byte, humør: ${mood}`}
    >
      <ellipse cx="100" cy="180" rx="55" ry="10" fill="#000" opacity="0.08" />

      <g className={`mascot-breathe ${MOOD_MOTION_CLASS[mood]}`}>
        {/* antenna */}
        <line x1="100" y1="20" x2="100" y2="45" stroke="#7C3AED" strokeWidth="6" strokeLinecap="round" />
        <circle
          cx="100"
          cy="16"
          r="9"
          fill={mood === "celebrate" ? "#FACC15" : "#F472B6"}
        />

        {/* body/head */}
        <rect x="35" y="45" width="130" height="115" rx="34" fill="url(#byteGradient)" />
        <rect x="35" y="45" width="130" height="115" rx="34" fill="url(#byteShine)" opacity="0.35" />

        {/* ears */}
        <circle cx="30" cy="100" r="12" fill="#A78BFA" />
        <circle cx="170" cy="100" r="12" fill="#A78BFA" />

        {/* face plate */}
        <rect x="55" y="70" width="90" height="70" rx="24" fill="#ffffff" opacity="0.95" />

        {/* eyes (blink automatically for a living feel) */}
        <g className="mascot-eyes">
          <ellipse cx="80" cy={100 + eye.cyOffset} rx="8" ry={eye.ry} fill="#4C1D95" />
          <ellipse cx="120" cy={100 + eye.cyOffset} rx="8" ry={eye.ry} fill="#4C1D95" />
        </g>

        {/* mouth */}
        <path
          d={MOUTHS[mood]}
          stroke="#4C1D95"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {mood === "celebrate" && (
        <g fill="#FACC15">
          <path className="mascot-sparkle" d="M20 60 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4 z" />
          <path
            className="mascot-sparkle"
            style={{ animationDelay: "0.2s" }}
            d="M180 130 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 z"
          />
          <path
            className="mascot-sparkle"
            style={{ animationDelay: "0.4s" }}
            fill="#F472B6"
            d="M175 55 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 z"
          />
        </g>
      )}

      <defs>
        <linearGradient id="byteGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#6D28D9" />
        </linearGradient>
        <linearGradient id="byteShine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
