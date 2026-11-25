"use client";

import { Check, Printer, ShoppingBasket } from "lucide-react";
import type { IngredientGroup } from "@/data/types";
import { scaleIngredient } from "@/lib/format";

interface Props {
  groups: IngredientGroup[];
  factor: number;
  checked: string[];
  onToggle: (id: string) => void;
  onAddToList?: () => void;
  onPrint?: () => void;
  inList?: boolean;
  compact?: boolean;
}

export function IngredientList({ groups, factor, checked, onToggle, onAddToList, onPrint, inList, compact = false }: Props) {
  return (
    <div>
      {groups.map((g) => (
        <div key={g.title} className="ingredient-group mb-5 last:mb-0">
          <h3 className="mb-2 font-display text-[1.15rem] text-olive-deep">{g.title}</h3>
          <ul className="divide-y divide-walnut/10">
            {g.items.map((ing) => {
              const amt = scaleIngredient(ing, factor);
              const done = checked.includes(ing.id);
              return (
                <li key={ing.id}>
                  <label className={`flex cursor-pointer items-start gap-3 py-2.5 ${compact ? "text-base" : "text-[1.02rem]"}`}>
                    <input type="checkbox" className="peer sr-only" checked={done} onChange={() => onToggle(ing.id)} />
                    <span
                      aria-hidden
                      className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-terra ${
                        done ? "border-olive bg-olive text-paper" : "border-walnut/35 bg-white/60"
                      }`}
                    >
                      {done && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                    </span>
                    <span className={`flex-1 leading-snug ${done ? "text-walnut/45 line-through decoration-walnut/40" : ""}`}>
                      {amt ? (
                        <>
                          <strong className="font-semibold">{amt.us}</strong>
                          {amt.metric && <span className="text-walnut-soft"> / {amt.metric}</span>}{" "}
                        </>
                      ) : null}
                      {ing.name}
                      {ing.note && <span className="text-walnut-soft">, {ing.note}</span>}
                      {ing.qty === null && !ing.optional && <span className="text-walnut-soft"> (to taste)</span>}
                      {ing.optional && <span className="ml-1 rounded bg-linen px-1.5 py-0.5 text-xs font-semibold text-walnut-soft">optional</span>}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      {(onAddToList || onPrint) && (
        <div className="no-print mt-5 flex flex-wrap gap-2">
          {onAddToList && (
            <button type="button" className="btn-primary" onClick={onAddToList}>
              <ShoppingBasket className="h-4 w-4" aria-hidden />
              {inList ? "Update shopping list" : "Add all to shopping list"}
            </button>
          )}
          {onPrint && (
            <button type="button" className="btn-quiet" onClick={onPrint}>
              <Printer className="h-4 w-4" aria-hidden /> Print ingredients
            </button>
          )}
        </div>
      )}
    </div>
  );
}
