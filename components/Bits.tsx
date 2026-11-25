import { Star } from "lucide-react";
import type { Difficulty } from "@/data/types";

const LEVEL: Record<Difficulty, number> = { Easy: 1, Medium: 2, Advanced: 3 };

/** Three small bars, filled to the difficulty level. */
export function DifficultyMeter({ level, showLabel = true }: { level: Difficulty; showLabel?: boolean }) {
  const n = LEVEL[level];
  return (
    <span className="inline-flex items-center gap-1.5" aria-label={`Difficulty: ${level}`}>
      <span className="flex items-end gap-[2px]" aria-hidden>
        {[1, 2, 3].map((i) => (
          <span key={i} className={`w-[5px] rounded-sm ${i <= n ? "bg-terra" : "bg-walnut/20"}`} style={{ height: 6 + i * 3 }} />
        ))}
      </span>
      {showLabel && <span>{level}</span>}
    </span>
  );
}

export function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-1" aria-label={`Kitchen-tested rating ${rating} out of 5`} title="Kitchen-tested rating">
      <Star className="h-4 w-4 fill-saffron text-saffron" aria-hidden />
      <span className="tabular-nums">{rating.toFixed(1)}</span>
    </span>
  );
}

/** A short line of eight-point stars used as a section divider. */
export function StarRule({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 text-wood ${className}`} aria-hidden>
      <span className="h-px flex-1 bg-current opacity-50" />
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="6" y="6" width="12" height="12" />
        <rect x="6" y="6" width="12" height="12" transform="rotate(45 12 12)" />
      </svg>
      <span className="h-px flex-1 bg-current opacity-50" />
    </div>
  );
}
