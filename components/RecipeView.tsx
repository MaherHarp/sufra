"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ChefHat, Flame, ListChecks, Minus, Plus, Printer, RotateCcw, Users, X } from "lucide-react";
import type { Ingredient, Recipe } from "@/data/types";
import { categoryName } from "@/data/recipes";
import { formatMinutes, totalMinutes } from "@/lib/format";
import { groupsFor } from "@/lib/shopping";
import { useShoppingList, useStored } from "@/lib/storage";
import { DifficultyMeter, StarRule, Stars } from "./Bits";
import { CookMode } from "./CookMode";
import { EquipmentList } from "./EquipmentList";
import { FavoriteButton } from "./FavoriteButton";
import { IngredientList } from "./IngredientList";
import { PantryCheck } from "./PantryCheck";
import { PrintSheet, printRecipe } from "./PrintSheet";
import { RecipeCard } from "./RecipeCard";
import { StepCard } from "./StepCard";
import { VideoPlayer } from "./VideoPlayer";

export function RecipeView({ recipe, related }: { recipe: Recipe; related: Recipe[] }) {
  const r = recipe;
  const [servings, setServings] = useState(r.servings);
  const [method, setMethod] = useStored<string | undefined>(`method:${r.slug}`, r.methods?.[0].id);
  const [checked, setChecked] = useStored<string[]>(`ingredients-checked:${r.slug}`, []);
  const [doneSteps, setDoneSteps] = useStored<number[]>(`steps-done:${r.slug}:${method ?? "main"}`, []);
  const [cookFrom, setCookFrom] = useState<number | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const list = useShoppingList();

  const factor = servings / r.servings;
  const groups = useMemo(() => groupsFor(r, method), [r, method]);
  const steps = useMemo(() => r.steps.filter((s) => !s.method || s.method === method), [r, method]);
  const lookup = useMemo(() => {
    const m = new Map<string, Ingredient>();
    r.ingredients.forEach((g) => g.items.forEach((i) => m.set(i.id, i)));
    return m;
  }, [r]);
  const methodInfo = r.methods?.find((m) => m.id === method);
  const timerIdFor = useCallback((i: number) => `${r.slug}:${method ?? "main"}:${i}`, [r.slug, method]);

  const currentStep = steps.findIndex((_, i) => !doneSteps.includes(i));
  const doneCount = doneSteps.filter((i) => i < steps.length).length;
  const inList = list.has(r.slug);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(id);
  }, [toast]);

  useEffect(() => {
    document.body.classList.add("has-cookbar");
    return () => document.body.classList.remove("has-cookbar");
  }, []);

  const toggleIngredient = (id: string) => setChecked((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));
  const toggleStep = (i: number) => setDoneSteps((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i]));
  const markDone = (i: number) => setDoneSteps((d) => (d.includes(i) ? d : [...d, i]));
  const jumpTo = (i: number) => document.getElementById(`step-${i + 1}`)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const addToList = (skip: string[] = []) => {
    list.addRecipe({ slug: r.slug, servings, method, skip });
    setToast(skip.length ? `Missing ingredients for ${servings} added to your shopping list` : `Ingredients for ${servings} ${r.servingsLabel ?? "servings"} added to your shopping list`);
  };

  const step = Math.max(1, Math.round(r.servings / 6));
  const minServ = step;
  const maxServ = r.servings * 4;

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="mx-auto grid max-w-7xl items-center gap-8 px-4 pb-10 pt-8 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:pt-12">
        <div>
          <nav aria-label="Breadcrumb" className="text-sm text-walnut-soft">
            <Link href="/recipes" className="hover:text-olive hover:underline">Recipes</Link>
            <span aria-hidden> / </span>
            <Link href={`/recipes?category=${r.category}`} className="hover:text-olive hover:underline">{categoryName(r.category)}</Link>
          </nav>
          <p lang="ar" dir="rtl" className="mt-5 text-left font-arabic text-4xl leading-none text-terra sm:text-5xl">
            {r.arabic}
          </p>
          <h1 className="h-display mt-3 text-[2.6rem] sm:text-6xl">{r.title}</h1>
          <p className="mt-5 max-w-prose text-xl leading-relaxed">{r.description}</p>
          <p className="mt-4 max-w-prose border-l-2 border-wood pl-4 text-[1.02rem] italic text-walnut-soft">{r.origin}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button type="button" className="btn-primary px-6 py-3 text-base" onClick={() => setCookFrom(Math.max(0, currentStep))}>
              <ChefHat className="h-5 w-5" aria-hidden />
              {doneCount > 0 && currentStep !== -1 ? `Continue cooking (step ${currentStep + 1})` : "Start cook mode"}
            </button>
            <FavoriteButton slug={r.slug} title={r.title} />
            <button type="button" className="btn-quiet" onClick={() => printRecipe("full")}>
              <Printer className="h-4 w-4" aria-hidden /> Print recipe
            </button>
          </div>
        </div>
        <div className="arch relative mx-auto aspect-[4/5] w-full max-w-md lg:max-w-none">
          <Image src={r.image.src} alt={r.image.alt} fill priority sizes="(min-width: 1024px) 520px, 90vw" className="object-cover" />
        </div>
      </section>

      {/* ---------- Quick facts + scaler ---------- */}
      <section aria-label="Quick facts" className="border-y border-walnut/10 bg-linen/60">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 sm:grid-cols-3 sm:px-6 lg:grid-cols-[repeat(5,auto)_1fr]">
          <Fact label="Prep" value={formatMinutes(r.prepMinutes)} />
          <Fact label="Cook" value={formatMinutes(r.cookMinutes)} />
          <Fact label="Total" value={formatMinutes(totalMinutes(r))} sub={r.waitMinutes ? `incl. ${formatMinutes(r.waitMinutes)} ${r.waitLabel?.toLowerCase() ?? "waiting"}` : undefined} />
          <Fact label="Difficulty" value={<DifficultyMeter level={r.difficulty} />} />
          <Fact label="Calories" value={`≈${r.calories}`} sub={`per ${r.servingsLabel === "pieces" ? "piece" : r.servingsLabel === "flatbreads" ? "flatbread" : "serving"}`} />
          <div className="col-span-2 flex flex-wrap items-center gap-3 py-4 sm:col-span-3 lg:col-span-1 lg:justify-end">
            <span className="flex items-center gap-2 font-semibold">
              <Users className="h-5 w-5 text-olive" aria-hidden /> Servings
            </span>
            <div className="flex items-center rounded-full border border-walnut/20 bg-paper">
              <button type="button" className="rounded-l-full p-2.5 hover:bg-linen disabled:opacity-40" onClick={() => setServings((s) => Math.max(minServ, s - step))} disabled={servings <= minServ} aria-label="Fewer servings">
                <Minus className="h-4 w-4" />
              </button>
              <output aria-live="polite" className="min-w-[4.5rem] text-center font-display text-xl tabular-nums">
                {servings}
                <span className="sr-only"> {r.servingsLabel ?? "servings"}</span>
              </output>
              <button type="button" className="rounded-r-full p-2.5 hover:bg-linen disabled:opacity-40" onClick={() => setServings((s) => Math.min(maxServ, s + step))} disabled={servings >= maxServ} aria-label="More servings">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <span className="text-sm text-walnut-soft">{r.servingsLabel ?? "servings"}</span>
            {servings !== r.servings && (
              <button type="button" className="text-sm font-semibold text-olive underline underline-offset-4" onClick={() => setServings(r.servings)}>
                Reset to {r.servings}
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          {r.dietary.map((d) => (
            <span key={d} className="rounded-full bg-olive-soft px-3 py-1 font-medium text-olive-deep">{d}</span>
          ))}
          <Stars rating={r.rating} />
        </div>

        {/* ---------- Video ---------- */}
        <section aria-labelledby="video-h" className="no-print mt-12">
          <h2 id="video-h" className="h-display text-3xl sm:text-4xl">Watch it first</h2>
          <p className="mb-5 mt-2 max-w-prose text-walnut-soft">
            Watch once all the way through before you start, then keep the written steps open while you cook.
          </p>
          <VideoPlayer recipe={r} steps={steps} onJumpToStep={jumpTo} />
        </section>

        {/* ---------- Ingredients + steps ---------- */}
        <div className="mt-16 grid gap-10 lg:grid-cols-[22rem_minmax(0,1fr)] xl:grid-cols-[24rem_minmax(0,1fr)]">
          <aside aria-labelledby="ingredients-h" className="lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:self-start lg:overflow-y-auto lg:pr-2">
            <div className="rounded-[1.5rem] border border-walnut/10 bg-[#FBF6EC] p-5 sm:p-6">
              <div className="flex items-baseline justify-between gap-2">
                <h2 id="ingredients-h" className="h-display text-3xl">Ingredients</h2>
                <span className="text-sm text-walnut-soft">for {servings} {r.servingsLabel ?? "servings"}</span>
              </div>
              <p className="mb-4 mt-1 text-sm text-walnut-soft">US measures first, metric after the slash. Tick each one as you set it out.</p>
              <IngredientList
                groups={groups}
                factor={factor}
                checked={checked}
                onToggle={toggleIngredient}
                onAddToList={() => addToList()}
                onPrint={() => printRecipe("ingredients")}
                inList={inList}
              />
              {checked.length > 0 && (
                <button type="button" className="no-print mt-3 text-sm text-walnut-soft underline underline-offset-4" onClick={() => setChecked([])}>
                  Untick all ingredients
                </button>
              )}
            </div>
            <div className="mt-6 rounded-[1.5rem] border border-walnut/10 bg-[#FBF6EC] p-5 sm:p-6">
              <h2 className="h-display mb-4 text-2xl">Equipment</h2>
              <EquipmentList items={r.equipment} />
            </div>
          </aside>

          <section aria-labelledby="steps-h" className="min-w-0">
            <h2 id="steps-h" className="h-display text-3xl sm:text-4xl">Step by step</h2>

            {r.methods && (
              <div className="mt-5 rounded-2xl border border-walnut/10 bg-linen/60 p-4">
                <p className="mb-3 font-semibold">Choose your method</p>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Cooking method">
                  {r.methods.map((m) => (
                    <button key={m.id} type="button" className="chip bg-paper" aria-pressed={method === m.id} onClick={() => setMethod(m.id)}>
                      <Flame className="h-4 w-4" aria-hidden /> {m.label}
                    </button>
                  ))}
                </div>
                {methodInfo && <p className="mt-3 text-walnut-soft">{methodInfo.description}</p>}
              </div>
            )}

            <div className="sticky top-16 z-20 -mx-4 mt-5 border-b border-walnut/10 bg-paper/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-2xl sm:border">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <p className="font-semibold" aria-live="polite">
                  {doneCount === steps.length ? "All steps done — sahtein!" : `You're on step ${currentStep + 1} of ${steps.length}`}
                </p>
                <div className="h-2 min-w-[8rem] flex-1 overflow-hidden rounded-full bg-linen" role="progressbar" aria-valuemin={0} aria-valuemax={steps.length} aria-valuenow={doneCount} aria-label="Steps completed">
                  <div className="h-full rounded-full bg-olive transition-[width] duration-300" style={{ width: `${(doneCount / steps.length) * 100}%` }} />
                </div>
                {doneCount > 0 && (
                  <button type="button" className="no-print inline-flex items-center gap-1 text-sm text-walnut-soft hover:text-walnut" onClick={() => setDoneSteps([])}>
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden /> Start over
                  </button>
                )}
              </div>
            </div>

            <div className="mt-6 space-y-6">
              {steps.map((s, i) => (
                <StepCard
                  key={`${method}-${i}`}
                  step={s}
                  number={i + 1}
                  total={steps.length}
                  factor={factor}
                  lookup={lookup}
                  done={doneSteps.includes(i)}
                  onToggleDone={() => toggleStep(i)}
                  timerId={timerIdFor(i)}
                  recipeTitle={r.title}
                  current={i === currentStep}
                />
              ))}
            </div>
          </section>
        </div>

        <StarRule className="mt-16" />

        {/* ---------- Chef's notes ---------- */}
        <section aria-labelledby="notes-h" className="mt-12">
          <h2 id="notes-h" className="h-display text-3xl sm:text-4xl">Chef&apos;s notes</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <Note title="Substitutions">
              <ul className="list-disc space-y-2 pl-5">
                {r.notes.substitutions.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </Note>
            <Note title="Storage">{r.notes.storage}</Note>
            <Note title="Make ahead">{r.notes.makeAhead}</Note>
            <Note title="How to serve">{r.notes.serving}</Note>
          </div>
        </section>

        {/* ---------- Pantry check ---------- */}
        <section aria-labelledby="pantry-h" className="no-print mt-14 rounded-[1.5rem] border border-walnut/10 bg-[#FBF6EC] p-5 sm:p-8">
          <h2 id="pantry-h" className="h-display text-3xl">Pantry check</h2>
          <div className="mt-4">
            <PantryCheck slug={r.slug} groups={groups} inList={inList} onAddMissing={(have) => addToList(have)} />
          </div>
        </section>

        {/* ---------- Pairs with ---------- */}
        {related.length > 0 && (
          <section aria-labelledby="pairs-h" className="no-print mt-16">
            <h2 id="pairs-h" className="h-display text-3xl sm:text-4xl">Make it a meal</h2>
            <p className="mt-2 text-walnut-soft">These go beautifully alongside {r.title.split(" (")[0]}.</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((x) => (
                <RecipeCard key={x.slug} recipe={x} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ---------- Mobile cooking bar ---------- */}
      <div className="no-print fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-walnut/10 bg-paper/95 p-3 backdrop-blur lg:hidden">
        <button type="button" className="btn-quiet flex-1" onClick={() => setSheetOpen(true)} aria-haspopup="dialog">
          <ListChecks className="h-4 w-4" aria-hidden /> Ingredients ({checked.filter((c) => groups.some((g) => g.items.some((i) => i.id === c))).length}/{groups.reduce((n, g) => n + g.items.length, 0)})
        </button>
        <button type="button" className="btn-primary flex-1" onClick={() => setCookFrom(Math.max(0, currentStep))}>
          <ChefHat className="h-4 w-4" aria-hidden /> Cook mode
        </button>
      </div>
      <div className="h-20 lg:hidden" aria-hidden />

      {sheetOpen && (
        <div role="dialog" aria-modal="true" aria-label="Ingredients" className="no-print fixed inset-0 z-[65] lg:hidden">
          <button type="button" className="absolute inset-0 bg-walnut/40" aria-label="Close ingredients" onClick={() => setSheetOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[80vh] overflow-y-auto rounded-t-[1.5rem] bg-paper p-5 shadow-2xl">
            <div className="mb-3 flex items-center justify-between">
              <p className="h-display text-2xl">Ingredients · {servings} {r.servingsLabel ?? "servings"}</p>
              <button type="button" className="rounded-full p-2 hover:bg-linen" onClick={() => setSheetOpen(false)} aria-label="Close ingredients">
                <X className="h-5 w-5" />
              </button>
            </div>
            <IngredientList groups={groups} factor={factor} checked={checked} onToggle={toggleIngredient} compact />
          </div>
        </div>
      )}

      {cookFrom !== null && (
        <CookMode
          title={r.title}
          steps={steps}
          groups={groups}
          factor={factor}
          lookup={lookup}
          start={cookFrom}
          checkedIngredients={checked}
          onToggleIngredient={toggleIngredient}
          onStepDone={markDone}
          onClose={(last) => {
            setCookFrom(null);
            setTimeout(() => jumpTo(Math.min(last, steps.length - 1)), 50);
          }}
          timerIdFor={timerIdFor}
        />
      )}

      {toast && (
        <div role="status" className="no-print fixed left-1/2 top-20 z-[80] flex -translate-x-1/2 items-center gap-3 rounded-full bg-olive-deep px-5 py-3 text-paper shadow-lg">
          <span>{toast}</span>
          <Link href="/shopping-list" className="font-semibold text-saffron underline underline-offset-4">View list</Link>
        </div>
      )}

      <PrintSheet recipe={r} groups={groups} steps={steps} factor={factor} servings={servings} methodLabel={methodInfo?.label} />
    </>
  );
}

function Fact({ label, value, sub }: { label: string; value: React.ReactNode; sub?: string }) {
  return (
    <div className="py-4 pr-6">
      <p className="text-sm text-walnut-soft">{label}</p>
      <p className="font-display text-xl">{value}</p>
      {sub && <p className="text-xs text-walnut-soft">{sub}</p>}
    </div>
  );
}

function Note({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[1.25rem] border border-walnut/10 bg-[#FBF6EC] p-5 sm:p-6">
      <h3 className="mb-2 font-display text-xl text-olive-deep">{title}</h3>
      <div className="leading-relaxed">{children}</div>
    </div>
  );
}
