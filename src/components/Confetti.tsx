"use client";

import { useState } from "react";
import { generateConfettiPieces } from "@/lib/confetti";

export function Confetti({ pieces = 40 }: { pieces?: number }) {
  const [items] = useState(() => generateConfettiPieces(pieces));

  return (
    <div className="fixed inset-0 overflow-hidden z-50" aria-hidden>
      {items.map((item) => (
        <span
          key={item.key}
          className="confetti-piece"
          style={{
            left: `${item.left}%`,
            width: item.size,
            height: item.size,
            backgroundColor: item.color,
            borderRadius: item.rounded ? "9999px" : "3px",
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
