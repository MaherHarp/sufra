"use client";

import Link from "next/link";
import { Check, ShoppingBasket } from "lucide-react";
import type { IngredientGroup } from "@/data/types";
import { useStored } from "@/lib/storage";

interface Props {
  slug: string;
  groups: IngredientGroup[];
  onAddMissing: (skip: string[]) => void;
  inList: boolean;
}

/** "What do I already have?" checklist. Saved per recipe; only missing items go on the shopping list. */
export function PantryCheck({ slug, groups, onAddMissing, inList }: Props) {
  const [have, setHave] = useStored<string[]>(`pantry-check:${slug}`, []);
  // The same pantry item can appear in two groups (salt for the chips and for the dressing): show it once.
  const byName = new Map<string, { id: string; ids: string[]; name: string; aisle: string; optional: boolean }>();
  for (const i of groups.flatMap((g) => g.items)) {
    const key = i.name.toLowerCase();
    const e = byName.get(key);
    if (e) {
      e.ids.push(i.id);
      e.optional = e.optional && !!i.optional;
    } else byName.set(key, { id: i.id, ids: [i.id], name: i.name, aisle: i.aisle, optional: !!i.optional });
  }
  const all = [...byName.values()];
  const owned = (item: { ids: string[] }) => item.ids.every((id) => have.includes(id));
  const essentials = all.filter((i) => !i.optional);
  const missing = essentials.filter((i) => !owned(i));
  const toggle = (ids: string[]) =>
    setHave((h) => (ids.every((id) => h.includes(id)) ? h.filter((x) => !ids.includes(x)) : [...new Set([...h, ...ids])]));

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <p className="max-w-prose text-walnut-soft">
          Tick off everything already in your kitchen. Your answers are saved on this device, and only what&apos;s missing goes on your list.
        </p>
        <p className="font-semibold tabular-nums">
          {essentials.length - missing.length} of {essentials.length} essentials ready
        </p>
      </div>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {all.map((ing) => {
          const got = owned(ing);
          return (
            <li key={ing.id}>
              <button
                type="button"
                onClick={() => toggle(ing.ids)}
                aria-pressed={got}
                className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors ${
                  got ? "border-olive bg-olive-soft" : "border-walnut/15 bg-paper hover:border-olive/60"
                }`}
              >
                <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 ${got ? "border-olive bg-olive text-paper" : "border-walnut/30"}`} aria-hidden>
                  {got && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                </span>
                <span className="leading-tight">
                  {ing.name}
                  {ing.optional && <span className="text-sm text-walnut-soft"> (optional)</span>}
                  <span className="block text-xs text-walnut-soft">{got ? "I have this" : ing.aisle}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button type="button" className="btn-primary" onClick={() => onAddMissing(have)} disabled={missing.length === 0}>
          <ShoppingBasket className="h-4 w-4" aria-hidden />
          {missing.length === 0 ? "You have everything" : `Add ${missing.length} missing item${missing.length === 1 ? "" : "s"} to shopping list`}
        </button>
        {inList && (
          <Link href="/shopping-list" className="font-semibold text-olive underline underline-offset-4">
            View shopping list
          </Link>
        )}
        {have.length > 0 && (
          <button type="button" className="text-sm text-walnut-soft underline underline-offset-4" onClick={() => setHave([])}>
            Clear ticks
          </button>
        )}
      </div>
    </div>
  );
}
