/**
 * Validates the recipe seed data: run with `npm run check:data`.
 * Catches broken ingredient references, unknown pairings and missing step content.
 */
import { recipes } from "../data/recipes";
import { pantry } from "../data/pantry";
import { techniques } from "../data/techniques";

const errors: string[] = [];
const slugs = new Set(recipes.map((r) => r.slug));
if (slugs.size !== recipes.length) errors.push("Duplicate recipe slugs");

for (const r of recipes) {
  const ids = new Set<string>();
  for (const g of r.ingredients)
    for (const i of g.items) {
      if (ids.has(i.id)) errors.push(`${r.slug}: duplicate ingredient id "${i.id}"`);
      ids.add(i.id);
      if (i.qty !== null && !i.metric && i.unit !== "" && i.unit !== "pinch") errors.push(`${r.slug}: "${i.name}" has no metric amount`);
    }
  const methodIds = new Set(r.methods?.map((m) => m.id) ?? []);
  r.steps.forEach((s, n) => {
    const where = `${r.slug} step ${n + 1}`;
    for (const u of s.uses ?? []) if (!ids.has(u.id)) errors.push(`${where}: unknown ingredient "${u.id}"`);
    if (s.method && !methodIds.has(s.method)) errors.push(`${where}: unknown method "${s.method}"`);
    if (!s.body.length || !s.cue || !s.tip || !s.mistake) errors.push(`${where}: missing body, cue, tip or mistake`);
  });
  for (const g of r.ingredients) if (g.method && !methodIds.has(g.method)) errors.push(`${r.slug}: group "${g.title}" has unknown method`);
  for (const p of r.notes.pairsWith) if (!slugs.has(p)) errors.push(`${r.slug}: pairsWith unknown "${p}"`);
  if (r.steps.length < 4) errors.push(`${r.slug}: fewer than 4 steps`);
}
for (const p of pantry) for (const s of p.usedIn) if (!slugs.has(s)) errors.push(`pantry ${p.id}: unknown recipe "${s}"`);
for (const t of techniques) for (const s of t.related) if (!slugs.has(s)) errors.push(`technique ${t.slug}: unknown recipe "${s}"`);

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`OK: ${recipes.length} recipes, ${recipes.reduce((n, r) => n + r.steps.length, 0)} steps, ${pantry.length} pantry items, ${techniques.length} techniques`);
