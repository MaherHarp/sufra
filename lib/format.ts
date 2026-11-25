import type { Ingredient, MetricUnit, UsUnit } from "@/data/types";

const FRACTIONS: [number, string][] = [
  [0, ""],
  [1 / 8, "⅛"],
  [1 / 4, "¼"],
  [1 / 3, "⅓"],
  [3 / 8, "⅜"],
  [1 / 2, "½"],
  [5 / 8, "⅝"],
  [2 / 3, "⅔"],
  [3 / 4, "¾"],
  [7 / 8, "⅞"],
  [1, ""],
];

/** 1.5 → "1½", 0.33 → "⅓", 2.97 → "3". Used for US measures. */
export function toFraction(value: number): string {
  if (value <= 0) return "0";
  if (value >= 10) return String(Math.round(value));
  let whole = Math.floor(value);
  const rest = value - whole;
  let best = FRACTIONS[0];
  for (const f of FRACTIONS) if (Math.abs(f[0] - rest) < Math.abs(best[0] - rest)) best = f;
  if (best[0] === 1) {
    whole += 1;
    return String(whole);
  }
  if (whole === 0 && best[1] === "") return "⅛"; // never show "0" for a tiny amount
  return `${whole || ""}${best[1]}`;
}

const PLURAL: Partial<Record<UsUnit, string>> = {
  cup: "cups",
  clove: "cloves",
  bunch: "bunches",
  can: "cans",
  jar: "jars",
  sheet: "sheets",
  pinch: "pinches",
};

export function usUnitLabel(unit: UsUnit, qty: number): string {
  if (!unit) return "";
  return qty > 1.01 ? PLURAL[unit] ?? unit : unit;
}

/** Metric amounts are rounded to sensible kitchen precision. */
export function formatMetric(qty: number, unit: MetricUnit): string {
  let q = qty;
  let u: MetricUnit = unit;
  if (u === "g" && q >= 1000) {
    q = q / 1000;
    u = "kg";
  }
  if (u === "ml" && q >= 1000) {
    q = q / 1000;
    u = "l";
  }
  let rounded: number;
  if (u === "kg" || u === "l") rounded = Math.round(q * 100) / 100;
  else if (q < 10) rounded = Math.round(q * 2) / 2 || 0.5;
  else if (q < 100) rounded = Math.round(q);
  else rounded = Math.round(q / 5) * 5;
  return `${rounded} ${u}`;
}

export interface ScaledAmount {
  us: string; // e.g. "1½ cups"
  metric?: string; // e.g. "300 g"
}

/** Formats an ingredient amount scaled by `factor`; `part` is the fraction used in a step. */
export function scaleIngredient(ing: Ingredient, factor: number, part = 1): ScaledAmount | null {
  if (ing.qty === null) return null;
  const qty = ing.qty * factor * part;
  const usNum = toFraction(qty);
  const unit = usUnitLabel(ing.unit, qty);
  const us = unit ? `${usNum} ${unit}` : usNum;
  const metric = ing.metric ? formatMetric(ing.metric.qty * factor * part, ing.metric.unit) : undefined;
  return { us, metric };
}

/** 95 → "1 hr 35 min", 1440 → "24 hr". */
export function formatMinutes(min: number): string {
  if (min <= 0) return "0 min";
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h} hr ${m} min` : `${h} hr`;
}

/** Seconds → "12:05" or "1:02:00". */
export function formatClock(totalSeconds: number): string {
  const s = Math.max(0, Math.ceil(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const mm = h ? String(m).padStart(2, "0") : String(m);
  return h ? `${h}:${mm}:${String(sec).padStart(2, "0")}` : `${mm}:${String(sec).padStart(2, "0")}`;
}

/** Seconds → a friendly duration for timer buttons: "30 min", "12 hr", "1 hr 15 min". */
export function formatDuration(totalSeconds: number): string {
  if (totalSeconds < 60) return `${totalSeconds} sec`;
  return formatMinutes(Math.round(totalSeconds / 60));
}

export const activeMinutes = (r: { prepMinutes: number; cookMinutes: number }) => r.prepMinutes + r.cookMinutes;
export const totalMinutes = (r: { prepMinutes: number; cookMinutes: number; waitMinutes: number }) =>
  r.prepMinutes + r.cookMinutes + r.waitMinutes;
