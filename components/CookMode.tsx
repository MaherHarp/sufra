"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ListChecks, Sun, X } from "lucide-react";
import type { Ingredient, IngredientGroup, Step } from "@/data/types";
import { formatMinutes } from "@/lib/format";
import { StepCue, StepIngredients, StepTipBoxes } from "./StepCard";
import { IngredientList } from "./IngredientList";
import { TimerButton } from "./Timer";

interface Props {
  title: string;
  steps: Step[];
  groups: IngredientGroup[];
  factor: number;
  lookup: Map<string, Ingredient>;
  start: number;
  checkedIngredients: string[];
  onToggleIngredient: (id: string) => void;
  onStepDone: (i: number) => void;
  onClose: (lastIndex: number) => void;
  timerIdFor: (i: number) => string;
}

type WakeLockSentinelLike = { release: () => Promise<void> };

/** Full-screen, one-step-at-a-time view with big text that keeps the screen awake. */
export function CookMode({ title, steps, groups, factor, lookup, start, checkedIngredients, onToggleIngredient, onStepDone, onClose, timerIdFor }: Props) {
  const [i, setI] = useState(start);
  const [awake, setAwake] = useState<"pending" | "on" | "unsupported" | "off">("pending");
  const [showIngredients, setShowIngredients] = useState(false);
  const lock = useRef<WakeLockSentinelLike | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const step = steps[i];
  const finished = i >= steps.length;

  // Keep the screen on while cooking; re-request when the tab becomes visible again.
  useEffect(() => {
    const nav = navigator as Navigator & { wakeLock?: { request: (t: "screen") => Promise<WakeLockSentinelLike> } };
    const request = async () => {
      if (!nav.wakeLock) return setAwake("unsupported");
      try {
        lock.current = await nav.wakeLock.request("screen");
        setAwake("on");
      } catch {
        setAwake("off");
      }
    };
    request();
    const onVis = () => document.visibilityState === "visible" && request();
    document.addEventListener("visibilitychange", onVis);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      lock.current?.release().catch(() => undefined);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    headingRef.current?.focus();
  }, [i]);

  const next = () => {
    if (!finished) onStepDone(i);
    setI((x) => Math.min(steps.length, x + 1));
  };
  const prev = () => setI((x) => Math.max(0, x - 1));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose(i);
      if ((e.target as HTMLElement).tagName === "INPUT") return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const pct = (Math.min(i, steps.length) / steps.length) * 100;

  return (
    <div role="dialog" aria-modal="true" aria-label={`Cook mode: ${title}`} className="no-print fixed inset-0 z-[70] flex flex-col bg-paper">
      <div className="flex items-center gap-3 border-b border-walnut/10 px-4 py-3 sm:px-8">
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-lg">{title}</p>
          <p className="flex items-center gap-1.5 text-sm text-walnut-soft">
            <Sun className={`h-4 w-4 ${awake === "on" ? "text-saffron" : ""}`} aria-hidden />
            {awake === "on"
              ? "Screen will stay on"
              : awake === "pending"
                ? "Keeping the screen on…"
                : "This browser can't keep the screen on — tap it now and then"}
          </p>
        </div>
        <button type="button" className="btn-quiet" onClick={() => setShowIngredients((s) => !s)} aria-expanded={showIngredients}>
          <ListChecks className="h-4 w-4" aria-hidden /> <span className="hidden sm:inline">Ingredients</span>
        </button>
        <button type="button" className="rounded-full p-3 hover:bg-linen" onClick={() => onClose(i)} aria-label="Exit cook mode">
          <X className="h-6 w-6" />
        </button>
      </div>
      <div className="h-2 bg-linen" role="progressbar" aria-valuemin={0} aria-valuemax={steps.length} aria-valuenow={Math.min(i, steps.length)} aria-label="Recipe progress">
        <div className="h-full bg-olive transition-[width] duration-300" style={{ width: `${pct}%` }} />
      </div>

      <div className="relative flex-1 overflow-y-auto">
        {showIngredients && (
          <div className="absolute inset-0 z-10 overflow-y-auto bg-paper px-4 py-6 sm:px-8">
            <div className="mx-auto max-w-2xl">
              <IngredientList groups={groups} factor={factor} checked={checkedIngredients} onToggle={onToggleIngredient} />
              <button type="button" className="btn-primary mt-6" onClick={() => setShowIngredients(false)}>
                Back to step {Math.min(i + 1, steps.length)}
              </button>
            </div>
          </div>
        )}
        <div className="mx-auto max-w-3xl px-5 py-8 sm:px-8 sm:py-12">
          {finished ? (
            <div className="py-12 text-center">
              <p lang="ar" className="font-arabic text-5xl text-terra">صحتين</p>
              <h2 ref={headingRef} tabIndex={-1} className="h-display mt-4 text-4xl focus:outline-none sm:text-5xl">
                Sahtein — you did it!
              </h2>
              <p className="mx-auto mt-4 max-w-md text-xl text-walnut-soft">
                &ldquo;Sahtein&rdquo; means &ldquo;double health&rdquo; — what Lebanese cooks say when the food hits the table.
              </p>
              <button type="button" className="btn-primary mt-8 px-8 py-3 text-lg" onClick={() => onClose(steps.length - 1)}>
                Back to the recipe
              </button>
            </div>
          ) : (
            <>
              <p className="text-lg font-semibold text-terra">
                You&apos;re on step {i + 1} of {steps.length}
                <span className="font-normal text-walnut-soft"> · about {formatMinutes(step.minutes)}</span>
              </p>
              <h2 ref={headingRef} tabIndex={-1} className="h-display mt-2 text-[2.1rem] focus:outline-none sm:text-5xl">
                {step.title}
              </h2>
              <div className="mt-6 space-y-6">
                <StepIngredients step={step} factor={factor} lookup={lookup} large />
                <div className="space-y-4 text-[1.35rem] leading-[1.6] sm:text-2xl">
                  {step.body.map((p, k) => (
                    <p key={k}>{p}</p>
                  ))}
                </div>
                {step.timer && (
                  <TimerButton id={timerIdFor(i)} label={step.timer.label} seconds={step.timer.seconds} recipe={title} large />
                )}
                <StepCue step={step} large />
                <StepTipBoxes step={step} large />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-walnut/10 bg-[#FBF6EC] px-4 py-3 sm:px-8 sm:py-4">
        <button type="button" onClick={prev} disabled={i === 0} className="btn-quiet px-5 py-3 text-lg">
          <ChevronLeft className="h-5 w-5" aria-hidden /> Previous
        </button>
        <span className="mx-auto text-sm tabular-nums text-walnut-soft">
          {Math.min(i + 1, steps.length)} / {steps.length}
        </span>
        {!finished && (
          <button type="button" onClick={next} className="btn-primary px-6 py-3 text-lg">
            {i === steps.length - 1 ? "Finish" : "Next step"} <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        )}
      </div>
    </div>
  );
}
