"use client";

import Image from "next/image";
import { Check, Clock, Eye, Lightbulb, TriangleAlert } from "lucide-react";
import type { Ingredient, Step } from "@/data/types";
import { formatMinutes, scaleIngredient } from "@/lib/format";
import { TimerButton } from "./Timer";

interface Props {
  step: Step;
  number: number;
  total: number;
  factor: number;
  lookup: Map<string, Ingredient>;
  done: boolean;
  onToggleDone: () => void;
  timerId: string;
  recipeTitle: string;
  current?: boolean;
}

/** The ingredients a step uses, with scaled amounts, so nobody has to scroll back up. */
export function StepIngredients({ step, factor, lookup, large = false }: { step: Step; factor: number; lookup: Map<string, Ingredient>; large?: boolean }) {
  if (!step.uses?.length) return null;
  return (
    <div className={`rounded-xl bg-linen/80 ${large ? "p-5" : "p-4"}`}>
      <p className={`mb-2 font-semibold text-olive-deep ${large ? "text-lg" : "text-sm"}`}>You&apos;ll need</p>
      <ul className={`flex flex-wrap gap-2 ${large ? "text-lg" : "text-[0.95rem]"}`}>
        {step.uses.map((u) => {
          const ing = lookup.get(u.id);
          if (!ing) return null;
          const amt = scaleIngredient(ing, factor, u.part ?? 1);
          return (
            <li key={u.id + (u.part ?? "")} className="rounded-full border border-walnut/15 bg-paper px-3 py-1">
              {amt && <strong className="font-semibold">{amt.us}</strong>}
              {amt?.metric && <span className="text-walnut-soft"> ({amt.metric})</span>} {ing.name}
              {u.part && u.part < 1 && <span className="text-walnut-soft"> — part of it</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function StepTipBoxes({ step, large = false }: { step: Step; large?: boolean }) {
  return (
    <div className={`grid gap-3 sm:grid-cols-2 ${large ? "text-lg" : ""}`}>
      <div className="rounded-xl border-l-4 border-olive bg-olive-soft/70 p-4">
        <p className="mb-1 flex items-center gap-2 font-semibold text-olive-deep">
          <Lightbulb className="h-4 w-4" aria-hidden /> Pro tip
        </p>
        <p className="leading-snug">{step.tip}</p>
      </div>
      <div className="rounded-xl border-l-4 border-terra bg-terra-soft/70 p-4">
        <p className="mb-1 flex items-center gap-2 font-semibold text-terra">
          <TriangleAlert className="h-4 w-4" aria-hidden /> Common mistake to avoid
        </p>
        <p className="leading-snug">{step.mistake}</p>
      </div>
    </div>
  );
}

export function StepCue({ step, large = false }: { step: Step; large?: boolean }) {
  return (
    <div className={`flex gap-3 rounded-xl border border-saffron/60 bg-saffron-soft/60 p-4 ${large ? "text-lg" : ""}`}>
      <Eye className="mt-1 h-5 w-5 shrink-0 text-walnut" aria-hidden />
      <p className="leading-snug">
        <strong className="font-semibold">What it should look like: </strong>
        {step.cue}
      </p>
    </div>
  );
}

export function StepCard({ step, number, total, factor, lookup, done, onToggleDone, timerId, recipeTitle, current }: Props) {
  return (
    <article
      id={`step-${number}`}
      aria-labelledby={`step-${number}-title`}
      className={`step-card scroll-mt-24 rounded-[1.5rem] border bg-[#FBF6EC] p-5 transition-colors sm:p-7 ${
        current ? "border-olive/60 shadow-[0_0_0_3px_rgba(91,107,47,0.12)]" : "border-walnut/10"
      } ${done ? "opacity-70" : ""}`}
    >
      <header className="flex flex-wrap items-start gap-4">
        <span
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-full font-display text-xl ${
            done ? "bg-olive text-paper" : "bg-walnut text-paper"
          }`}
          aria-hidden
        >
          {done ? <Check className="h-6 w-6" strokeWidth={3} /> : number}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm text-walnut-soft">
            Step {number} of {total}
          </p>
          <h3 id={`step-${number}-title`} className="font-display text-2xl leading-tight sm:text-[1.7rem]">
            {step.title}
          </h3>
          <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-walnut-soft">
            <Clock className="h-4 w-4" aria-hidden /> About {formatMinutes(step.minutes)}
          </p>
        </div>
      </header>

      <div className="mt-5 grid gap-6 md:grid-cols-[minmax(0,1fr)_14rem]">
        <div className="space-y-4">
          <StepIngredients step={step} factor={factor} lookup={lookup} />
          <div className="space-y-3 text-[1.12rem] leading-[1.7]">
            {step.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <StepCue step={step} />
        </div>
        <StepImage step={step} number={number} />
      </div>

      <div className="mt-5">
        <StepTipBoxes step={step} />
      </div>

      <footer className="no-print mt-5 flex flex-wrap items-center gap-3 border-t border-walnut/10 pt-5">
        {step.timer && <TimerButton id={timerId} label={step.timer.label} seconds={step.timer.seconds} recipe={recipeTitle} />}
        <button type="button" onClick={onToggleDone} aria-pressed={done} className={done ? "btn-primary" : "btn-quiet"}>
          <Check className="h-4 w-4" aria-hidden />
          {done ? "Done — nice work" : "Mark step as done"}
        </button>
      </footer>
    </article>
  );
}

function StepImage({ step, number }: { step: Step; number: number }) {
  if (step.image) {
    return (
      <figure className="order-first md:order-none">
        <div className="arch relative aspect-[4/5] w-full max-w-[14rem]">
          <Image src={step.image.src} alt={step.image.alt} fill sizes="224px" className="object-cover" />
        </div>
        <figcaption className="mt-2 max-w-[14rem] text-xs text-walnut-soft">{step.image.alt}</figcaption>
      </figure>
    );
  }
  return (
    <div
      className="arch khatam relative hidden aspect-[4/5] w-full max-w-[14rem] place-items-center bg-linen md:grid"
      role="img"
      aria-label={`Illustration for step ${number}: ${step.title}`}
    >
      <span className="grid h-20 w-20 place-items-center rounded-full bg-paper font-display text-4xl text-terra shadow-sm">{number}</span>
    </div>
  );
}
