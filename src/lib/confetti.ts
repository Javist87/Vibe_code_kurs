const COLORS = ["#8B5CF6", "#F472B6", "#FACC15", "#34D399", "#60A5FA"];

export interface ConfettiPiece {
  key: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
  rounded: boolean;
}

export function generateConfettiPieces(count: number): ConfettiPiece[] {
  return Array.from({ length: count }, (_, i) => ({
    key: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.4,
    duration: 2.2 + Math.random() * 1.2,
    size: 6 + Math.random() * 8,
    color: COLORS[i % COLORS.length],
    rounded: i % 2 === 0,
  }));
}
