"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Ingredient, IngredientGroup, Recipe, Step } from "@/data/types";
import { formatMinutes, scaleIngredient, totalMinutes } from "@/lib/format";

/**
 * A plain, ink-friendly copy of the recipe mounted directly in <body>.
 * It is hidden on screen and is the only thing printed on recipe pages.
 */
export function PrintSheet({ recipe, groups, steps, factor, servings, methodLabel }: { recipe: Recipe; groups: IngredientGroup[]; steps: Step[]; factor: number; servings: number; methodLabel?: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const line = (ing: Ingredient) => {
    const a = scaleIngredient(ing, factor);
    return `${a ? `${a.us}${a.metric ? ` (${a.metric})` : ""} ` : ""}${ing.name}${ing.note ? `, ${ing.note}` : ""}${ing.optional ? " (optional)" : ""}`;
  };

  return createPortal(
    <div className="print-sheet" style={{ fontFamily: "Georgia, serif", color: "#000" }}>
      <h1 style={{ fontSize: "22pt", margin: 0 }}>{recipe.title}</h1>
      <p style={{ margin: "4pt 0 10pt" }}>
        Serves {servings} {recipe.servingsLabel ?? ""} · Prep {formatMinutes(recipe.prepMinutes)} · Cook {formatMinutes(recipe.cookMinutes)} · Total{" "}
        {formatMinutes(totalMinutes(recipe))}
        {methodLabel ? ` · Method: ${methodLabel}` : ""}
      </p>
      <section>
        <h2 style={{ fontSize: "14pt", borderBottom: "1px solid #000", paddingBottom: 2 }}>Ingredients</h2>
        {groups.map((g) => (
          <div key={g.title} style={{ marginBottom: 8 }}>
            <h3 style={{ fontSize: "11.5pt", margin: "6pt 0 2pt" }}>{g.title}</h3>
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
              {g.items.map((i) => (
                <li key={i.id}>☐ {line(i)}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <section className="print-steps">
        <h2 style={{ fontSize: "14pt", borderBottom: "1px solid #000", paddingBottom: 2 }}>Method</h2>
        <ol style={{ paddingLeft: "16pt" }}>
          {steps.map((s, idx) => (
            <li key={idx} style={{ marginBottom: 8 }}>
              <strong>{s.title}.</strong> {s.body.join(" ")} <em>Look for: {s.cue}</em>
            </li>
          ))}
        </ol>
      </section>
      <section className="print-notes">
        <h2 style={{ fontSize: "14pt", borderBottom: "1px solid #000", paddingBottom: 2 }}>Chef&apos;s notes</h2>
        <p><strong>Storage:</strong> {recipe.notes.storage}</p>
        <p><strong>Make ahead:</strong> {recipe.notes.makeAhead}</p>
      </section>
      <p style={{ marginTop: 12, fontSize: "9pt" }}>Sufra Lebanese Kitchen</p>
    </div>,
    document.body,
  );
}

/** Prints either the full recipe or only the ingredient list. */
export function printRecipe(mode: "full" | "ingredients") {
  document.body.dataset.print = mode;
  const done = () => {
    delete document.body.dataset.print;
    window.removeEventListener("afterprint", done);
  };
  window.addEventListener("afterprint", done);
  window.print();
}
