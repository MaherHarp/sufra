import type { Aisle, Ingredient, MetricUnit, Recipe, UsUnit } from "@/data/types";
import type { ListEntry } from "./storage";
import { formatMetric, toFraction, usUnitLabel } from "./format";

export const AISLE_ORDER: Aisle[] = ["Produce", "Meat", "Dairy", "Bakery", "Frozen", "Spices", "Pantry"];

export interface ListLine {
  key: string;
  name: string;
  aisle: Aisle;
  amount: string; // e.g. "1½ cups (300 g)" or "" when to taste
  recipes: string[];
  optional: boolean;
}

/** Ingredient groups that apply for the chosen method. */
export function groupsFor(recipe: Recipe, method?: string) {
  return recipe.ingredients.filter((g) => !g.method || g.method === method);
}

interface Acc {
  key: string;
  name: string;
  aisle: Aisle;
  unit: UsUnit;
  qty: number;
  hasQty: boolean;
  metricUnit?: MetricUnit;
  metricQty: number;
  recipes: Set<string>;
  optional: boolean;
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9' ]/g, "").trim();
// Liquids are bought by volume and solids by weight, so g and kg / ml and l are merged.
const metricBase = (u: MetricUnit): MetricUnit => (u === "kg" ? "g" : u === "l" ? "ml" : u);
const toBase = (q: number, u: MetricUnit) => (u === "kg" || u === "l" ? q * 1000 : q);

/** Combines the ingredients of every recipe on the list, scaled and grouped by store aisle. */
export function buildList(entries: ListEntry[], recipes: Recipe[]): Record<Aisle, ListLine[]> {
  const acc = new Map<string, Acc>();
  for (const entry of entries) {
    const recipe = recipes.find((r) => r.slug === entry.slug);
    if (!recipe) continue;
    const factor = entry.servings / recipe.servings;
    for (const group of groupsFor(recipe, entry.method)) {
      for (const ing of group.items) {
        if (entry.skip.includes(ing.id)) continue;
        add(acc, ing, factor, recipe.title);
      }
    }
  }
  const out = Object.fromEntries(AISLE_ORDER.map((a) => [a, [] as ListLine[]])) as Record<Aisle, ListLine[]>;
  for (const a of acc.values()) {
    let amount = "";
    if (a.hasQty) {
      const unit = usUnitLabel(a.unit, a.qty);
      amount = unit ? `${toFraction(a.qty)} ${unit}` : toFraction(a.qty);
      if (a.metricUnit && a.metricQty > 0) amount += ` (${formatMetric(a.metricQty, a.metricUnit)})`;
    }
    out[a.aisle].push({ key: a.key, name: a.name, aisle: a.aisle, amount, recipes: [...a.recipes], optional: a.optional });
  }
  for (const a of AISLE_ORDER) out[a].sort((x, y) => x.name.localeCompare(y.name));
  return out;
}

function add(acc: Map<string, Acc>, ing: Ingredient, factor: number, recipeTitle: string) {
  const key = `${norm(ing.name)}|${ing.unit}`;
  const existing = acc.get(key);
  const metricUnit = ing.metric ? metricBase(ing.metric.unit) : undefined;
  const metricQty = ing.metric ? toBase(ing.metric.qty, ing.metric.unit) * factor : 0;
  if (existing) {
    if (ing.qty !== null) {
      existing.qty += ing.qty * factor;
      existing.hasQty = true;
    }
    if (metricUnit && (!existing.metricUnit || existing.metricUnit === metricUnit)) {
      existing.metricUnit = metricUnit;
      existing.metricQty += metricQty;
    }
    existing.recipes.add(recipeTitle);
    existing.optional = existing.optional && !!ing.optional;
    return;
  }
  acc.set(key, {
    key,
    name: ing.name,
    aisle: ing.aisle,
    unit: ing.unit,
    qty: ing.qty === null ? 0 : ing.qty * factor,
    hasQty: ing.qty !== null,
    metricUnit,
    metricQty,
    recipes: new Set([recipeTitle]),
    optional: !!ing.optional,
  });
}

/** Plain-text version of the list for sharing or copying. */
export function listToText(list: Record<Aisle, ListLine[]>, checked: string[]): string {
  const lines: string[] = ["Shopping list — Sufra Lebanese Kitchen", ""];
  for (const aisle of AISLE_ORDER) {
    const items = list[aisle].filter((l) => !checked.includes(l.key));
    if (!items.length) continue;
    lines.push(aisle.toUpperCase());
    for (const l of items) lines.push(`- ${l.amount ? l.amount + " " : ""}${l.name}${l.optional ? " (optional)" : ""}`);
    lines.push("");
  }
  return lines.join("\n").trim();
}
