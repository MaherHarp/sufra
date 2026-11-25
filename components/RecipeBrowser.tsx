"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { CategoryId, Difficulty, Dietary, Recipe } from "@/data/types";
import { categories } from "@/data/recipes";
import { activeMinutes } from "@/lib/format";
import { matches, searchText } from "@/lib/search";
import { RecipeCard } from "./RecipeCard";

const DIFFICULTIES: Difficulty[] = ["Easy", "Medium", "Advanced"];
const DIETS: Dietary[] = ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Halal"];
const TIMES = [
  { id: "under-30", label: "Under 30 min", test: (m: number) => m < 30 },
  { id: "30-60", label: "30–60 min", test: (m: number) => m >= 30 && m <= 60 },
  { id: "over-60", label: "60+ min", test: (m: number) => m > 60 },
] as const;
const SORTS = [
  { id: "popular", label: "Most popular" },
  { id: "quickest", label: "Quickest" },
  { id: "easiest", label: "Easiest first" },
] as const;
const LEVEL: Record<Difficulty, number> = { Easy: 1, Medium: 2, Advanced: 3 };

export function RecipeBrowser({ recipes }: { recipes: Recipe[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Filters are held locally (so quick taps never race each other) and mirrored
  // into the URL, so a filtered view can be bookmarked or shared.
  const [state, setState] = useState(() => new URLSearchParams(params.toString()));
  const lastPushed = useRef(params.toString());
  const urlTimer = useRef<number>();
  useEffect(() => {
    // Navigation from elsewhere (header search, a category link) replaces the local filters.
    const s = params.toString();
    if (s !== lastPushed.current) {
      lastPushed.current = s;
      setState(new URLSearchParams(s));
    }
  }, [params]);

  const commit = (next: URLSearchParams, delay = 0) => {
    setState(next);
    window.clearTimeout(urlTimer.current);
    urlTimer.current = window.setTimeout(() => {
      const s = next.toString();
      lastPushed.current = s;
      router.replace(s ? `${pathname}?${s}` : pathname, { scroll: false });
    }, delay);
  };
  const update = (mutate: (p: URLSearchParams) => void, delay = 0) => {
    const next = new URLSearchParams(state.toString());
    mutate(next);
    commit(next, delay);
  };
  const clearAll = () => commit(new URLSearchParams());

  const q = state.get("q") ?? "";
  const category = state.get("category") as CategoryId | null;
  const difficulty = state.getAll("difficulty") as Difficulty[];
  const time = state.get("time");
  const diets = state.getAll("diet") as Dietary[];
  const sort = state.get("sort") ?? "popular";

  const toggleMulti = (key: string, value: string) =>
    update((p) => {
      const vals = p.getAll(key);
      p.delete(key);
      (vals.includes(value) ? vals.filter((v) => v !== value) : [...vals, value]).forEach((v) => p.append(key, v));
    });
  const setSingle = (key: string, value: string | null) => update((p) => (value === null || p.get(key) === value ? p.delete(key) : p.set(key, value)));

  const index = useMemo(() => new Map(recipes.map((r) => [r.slug, searchText(r)])), [recipes]);

  const results = useMemo(() => {
    const t = TIMES.find((x) => x.id === time);
    const out = recipes.filter(
      (r) =>
        matches(r, q, index.get(r.slug)) &&
        (!category || r.category === category) &&
        (!difficulty.length || difficulty.includes(r.difficulty)) &&
        (!t || t.test(activeMinutes(r))) &&
        diets.every((d) => r.dietary.includes(d)),
    );
    return out.sort((a, b) => {
      if (sort === "quickest") return activeMinutes(a) - activeMinutes(b);
      if (sort === "easiest") return LEVEL[a.difficulty] - LEVEL[b.difficulty] || activeMinutes(a) - activeMinutes(b);
      return a.popularity - b.popularity;
    });
  }, [recipes, q, category, difficulty, time, diets, sort, index]);

  const activeCount = (category ? 1 : 0) + difficulty.length + (time ? 1 : 0) + diets.length + (q ? 1 : 0);

  return (
    <div className="grid gap-8 lg:grid-cols-[17rem_minmax(0,1fr)]">
      <div className="lg:sticky lg:top-24 lg:self-start">
        <form role="search" onSubmit={(e) => e.preventDefault()} className="relative">
          <label htmlFor="recipe-search" className="sr-only">
            Search by recipe, ingredient or category
          </label>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-walnut-soft" aria-hidden />
          <input
            id="recipe-search"
            type="search"
            value={q}
            onChange={(e) => {
              const v = e.target.value;
              update((p) => (v ? p.set("q", v) : p.delete("q")), 300);
            }}
            placeholder="Try “tahini” or “lentil”"
            className="w-full rounded-full border border-walnut/20 bg-white/70 py-3 pl-11 pr-4 text-base placeholder:text-walnut-soft/80 focus:border-olive focus:outline-none"
          />
        </form>

        <details className="group mt-4" open>
          <summary className="flex cursor-pointer list-none items-center gap-2 font-semibold lg:hidden">
            <SlidersHorizontal className="h-4 w-4" aria-hidden /> Filters {activeCount > 0 && `(${activeCount})`}
          </summary>
          <div className="mt-4 space-y-6 lg:mt-2">
            <FilterGroup title="Category">
              {categories.map((c) => (
                <button key={c.id} type="button" className="chip" aria-pressed={category === c.id} onClick={() => setSingle("category", c.id)}>
                  {c.name}
                </button>
              ))}
            </FilterGroup>
            <FilterGroup title="Difficulty">
              {DIFFICULTIES.map((d) => (
                <button key={d} type="button" className="chip" aria-pressed={difficulty.includes(d)} onClick={() => toggleMulti("difficulty", d)}>
                  {d}
                </button>
              ))}
            </FilterGroup>
            <FilterGroup title="Cook time" hint="Hands-on and cooking time, not soaking or resting">
              {TIMES.map((t) => (
                <button key={t.id} type="button" className="chip" aria-pressed={time === t.id} onClick={() => setSingle("time", t.id)}>
                  {t.label}
                </button>
              ))}
            </FilterGroup>
            <FilterGroup title="Dietary">
              {DIETS.map((d) => (
                <button key={d} type="button" className="chip" aria-pressed={diets.includes(d)} onClick={() => toggleMulti("diet", d)}>
                  {d}
                </button>
              ))}
            </FilterGroup>
            {activeCount > 0 && (
              <button type="button" className="inline-flex items-center gap-1.5 text-sm font-semibold text-terra" onClick={clearAll}>
                <X className="h-4 w-4" aria-hidden /> Clear all filters
              </button>
            )}
          </div>
        </details>
      </div>

      <div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p aria-live="polite" className="text-walnut-soft">
            {results.length} {results.length === 1 ? "recipe" : "recipes"}
            {q && (
              <>
                {" "}for <strong className="text-walnut">&ldquo;{q}&rdquo;</strong>
              </>
            )}
          </p>
          <label className="flex items-center gap-2 text-sm">
            <span className="font-semibold">Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSingle("sort", e.target.value === "popular" ? null : e.target.value)}
              className="rounded-full border border-walnut/20 bg-white/70 px-3 py-2 focus:border-olive focus:outline-none"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        {results.length ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((r, i) => (
              <RecipeCard key={r.slug} recipe={r} priority={i < 3} />
            ))}
          </div>
        ) : (
          <div className="khatam-faint rounded-[1.5rem] border border-walnut/10 bg-[#FBF6EC] p-10 text-center">
            <p className="relative font-display text-2xl">No recipes match those filters.</p>
            <p className="relative mt-2 text-walnut-soft">Try removing a filter or searching for a single ingredient, like “lemon” or “chickpeas”.</p>
            <button type="button" className="btn-primary relative mt-5" onClick={clearAll}>
              Show all recipes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterGroup({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-2 font-semibold">{title}</legend>
      {hint && <p className="-mt-1 mb-2 text-xs text-walnut-soft">{hint}</p>}
      <div className="flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}
