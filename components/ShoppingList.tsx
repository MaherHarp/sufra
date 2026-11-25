"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Check, Copy, Heart, Minus, Plus, Printer, Share2, ShoppingBasket, Trash2 } from "lucide-react";
import type { Recipe } from "@/data/types";
import { AISLE_ORDER, buildList, listToText } from "@/lib/shopping";
import { useFavorites, useShoppingList } from "@/lib/storage";

export function ShoppingList({ recipes }: { recipes: Recipe[] }) {
  const list = useShoppingList();
  const { favorites } = useFavorites();
  const [shared, setShared] = useState<string | null>(null);

  const lines = useMemo(() => buildList(list.entries, recipes), [list.entries, recipes]);
  const total = AISLE_ORDER.reduce((n, a) => n + lines[a].length, 0);
  const done = AISLE_ORDER.reduce((n, a) => n + lines[a].filter((l) => list.checked.includes(l.key)).length, 0);
  const savedNotOnList = favorites.filter((s) => !list.has(s));

  const addSaved = () => {
    for (const slug of savedNotOnList) {
      const r = recipes.find((x) => x.slug === slug);
      if (r) list.addRecipe({ slug, servings: r.servings, method: r.methods?.[0].id, skip: [] });
    }
  };

  const share = async () => {
    const text = listToText(lines, list.checked);
    try {
      if (navigator.share) {
        await navigator.share({ title: "Shopping list", text });
        setShared("Shared");
      } else {
        await navigator.clipboard.writeText(text);
        setShared("Copied to clipboard");
      }
    } catch (e) {
      if ((e as Error).name !== "AbortError") {
        try {
          await navigator.clipboard.writeText(text);
          setShared("Copied to clipboard");
        } catch {
          setShared("Couldn't share — try Print instead");
        }
      }
    }
    setTimeout(() => setShared(null), 2500);
  };

  const setServings = (slug: string, servings: number) => {
    const e = list.entries.find((x) => x.slug === slug);
    if (e) list.addRecipe({ ...e, servings });
  };

  if (!list.loaded) return <p className="text-walnut-soft">Loading your list…</p>;

  if (!list.entries.length) {
    return (
      <div className="khatam-faint rounded-[1.5rem] border border-walnut/10 bg-[#FBF6EC] p-8 text-center sm:p-12">
        <ShoppingBasket className="relative mx-auto h-10 w-10 text-olive" aria-hidden />
        <p className="relative mt-4 font-display text-3xl">Your list is empty</p>
        <p className="relative mx-auto mt-2 max-w-md text-walnut-soft">
          Open any recipe and press &ldquo;Add all to shopping list&rdquo;, or use the pantry check to add only what you&apos;re missing.
        </p>
        <div className="relative mt-6 flex flex-wrap justify-center gap-3">
          {savedNotOnList.length > 0 && (
            <button type="button" className="btn-primary" onClick={addSaved}>
              <Heart className="h-4 w-4" aria-hidden /> Add my {savedNotOnList.length} saved recipe{savedNotOnList.length === 1 ? "" : "s"}
            </button>
          )}
          <Link href="/recipes" className={savedNotOnList.length ? "btn-quiet" : "btn-primary"}>
            Browse recipes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div>
        <div className="no-print mb-6 flex flex-wrap items-center gap-3">
          <p className="mr-auto font-semibold tabular-nums" aria-live="polite">
            {done} of {total} items in the basket
          </p>
          <button type="button" className="btn-quiet" onClick={share}>
            <Share2 className="h-4 w-4" aria-hidden /> Share
          </button>
          <button type="button" className="btn-quiet" onClick={() => navigator.clipboard?.writeText(listToText(lines, list.checked)).then(() => { setShared("Copied to clipboard"); setTimeout(() => setShared(null), 2500); })}>
            <Copy className="h-4 w-4" aria-hidden /> Copy
          </button>
          <button type="button" className="btn-quiet" onClick={() => window.print()}>
            <Printer className="h-4 w-4" aria-hidden /> Print
          </button>
          {shared && <span role="status" className="w-full text-sm font-semibold text-olive">{shared}</span>}
        </div>

        <div className="space-y-6">
          {AISLE_ORDER.filter((a) => lines[a].length).map((aisle) => (
            <section key={aisle} aria-labelledby={`aisle-${aisle}`} className="rounded-[1.25rem] border border-walnut/10 bg-[#FBF6EC] p-5 sm:p-6">
              <h2 id={`aisle-${aisle}`} className="mb-2 font-display text-2xl text-olive-deep">
                {aisle}
              </h2>
              <ul className="divide-y divide-walnut/10">
                {lines[aisle].map((l) => {
                  const on = list.checked.includes(l.key);
                  return (
                    <li key={l.key}>
                      <label className="flex cursor-pointer items-start gap-3 py-3">
                        <input type="checkbox" className="peer sr-only" checked={on} onChange={() => list.toggleChecked(l.key)} />
                        <span aria-hidden className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border-2 peer-focus-visible:ring-2 peer-focus-visible:ring-terra ${on ? "border-olive bg-olive text-paper" : "border-walnut/35 bg-white/60"}`}>
                          {on && <Check className="h-4 w-4" strokeWidth={3} />}
                        </span>
                        <span className={`flex-1 ${on ? "text-walnut/45 line-through" : ""}`}>
                          {l.amount && <strong className="font-semibold">{l.amount} </strong>}
                          {l.name}
                          {l.optional && <span className="text-sm text-walnut-soft"> (optional)</span>}
                          <span className="block text-sm text-walnut-soft">For {l.recipes.join(", ")}</span>
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>

      <aside className="no-print space-y-5 lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-[1.25rem] border border-walnut/10 bg-[#FBF6EC] p-5">
          <h2 className="font-display text-2xl">Cooking</h2>
          <ul className="mt-3 space-y-3">
            {list.entries.map((e) => {
              const r = recipes.find((x) => x.slug === e.slug);
              if (!r) return null;
              const step = Math.max(1, Math.round(r.servings / 6));
              return (
                <li key={e.slug} className="flex gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                    <Image src={r.image.src} alt="" fill sizes="56px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link href={`/recipes/${r.slug}`} className="block truncate font-semibold hover:underline">
                      {r.title.split(" (")[0]}
                    </Link>
                    <div className="mt-1 flex items-center gap-1 text-sm">
                      <button type="button" className="rounded-full p-1 hover:bg-linen disabled:opacity-40" disabled={e.servings <= step} onClick={() => setServings(e.slug, e.servings - step)} aria-label={`Fewer servings of ${r.title}`}>
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="tabular-nums">{e.servings}</span>
                      <button type="button" className="rounded-full p-1 hover:bg-linen" onClick={() => setServings(e.slug, e.servings + step)} aria-label={`More servings of ${r.title}`}>
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                      <span className="text-walnut-soft">{r.servingsLabel ?? "servings"}</span>
                      {e.skip.length > 0 && <span className="text-walnut-soft">· {e.skip.length} at home</span>}
                    </div>
                  </div>
                  <button type="button" className="self-start rounded-full p-2 text-walnut-soft hover:bg-linen hover:text-terra" onClick={() => list.removeRecipe(e.slug)} aria-label={`Remove ${r.title} from list`}>
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              );
            })}
          </ul>
          {savedNotOnList.length > 0 && (
            <button type="button" className="btn-quiet mt-4 w-full" onClick={addSaved}>
              <Heart className="h-4 w-4" aria-hidden /> Add {savedNotOnList.length} saved recipe{savedNotOnList.length === 1 ? "" : "s"}
            </button>
          )}
        </div>
        <div className="flex flex-col gap-2">
          {done > 0 && (
            <button type="button" className="btn-quiet" onClick={list.clearChecked}>
              Untick all items
            </button>
          )}
          <button
            type="button"
            className="btn text-terra hover:bg-terra-soft"
            onClick={() => {
              if (window.confirm("Remove every recipe and item from your shopping list?")) list.clearAll();
            }}
          >
            <Trash2 className="h-4 w-4" aria-hidden /> Clear the whole list
          </button>
        </div>
      </aside>
    </div>
  );
}
