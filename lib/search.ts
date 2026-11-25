import type { Recipe } from "@/data/types";
import { categoryName } from "@/data/recipes";

const fold = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/['’]/g, "");

/** Common alternate spellings so beginners find what they mean. */
const ALIASES: Record<string, string[]> = {
  hummus: ["humus", "hommus", "houmous", "homos"],
  tabbouleh: ["tabouli", "tabouleh", "tabbouli", "taboule"],
  "baba ghanoush": ["baba ganoush", "baba ghanouj", "mutabbal", "moutabal", "eggplant", "aubergine"],
  "warak enab": ["dolma", "dolmas", "dolmades", "grape leaves", "vine leaves", "wara enab"],
  kafta: ["kofta", "kefta", "kebab", "kabab"],
  manakish: ["manakeesh", "manaeesh", "manoushe", "zaatar bread", "flatbread"],
  shawarma: ["shawerma", "shwarma", "gyro"],
  baklava: ["baklawa"],
  labneh: ["labne", "labna", "yogurt cheese"],
  "shorbat adas": ["lentil", "shorba"],
  kibbeh: ["kibbe", "kibbi", "kubbeh"],
};

/** Builds one searchable string per recipe from its name, category, ingredients and tags. */
export function searchText(r: Recipe): string {
  const parts = [
    r.title,
    r.arabic,
    r.summary,
    categoryName(r.category),
    r.category,
    r.difficulty,
    ...r.dietary,
    ...r.ingredients.flatMap((g) => g.items.map((i) => i.name)),
  ];
  const title = fold(r.title);
  for (const [key, alts] of Object.entries(ALIASES)) if (title.includes(key)) parts.push(...alts);
  return fold(parts.join(" "));
}

/** Every word in the query must appear somewhere in the recipe. */
export function matches(r: Recipe, query: string, index?: string): boolean {
  const words = fold(query).split(/\s+/).filter(Boolean);
  if (!words.length) return true;
  const text = index ?? searchText(r);
  return words.every((w) => text.includes(w));
}
