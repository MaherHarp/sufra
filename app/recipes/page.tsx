import type { Metadata } from "next";
import { Suspense } from "react";
import { recipes } from "@/data/recipes";
import { RecipeBrowser } from "@/components/RecipeBrowser";

export const metadata: Metadata = {
  title: "Recipe Library — Lebanese & Middle Eastern Recipes",
  description:
    "Browse authentic Lebanese recipes by category, difficulty, cook time and diet: hummus, tabbouleh, falafel, shawarma, kibbeh, manakish, baklava and more.",
  alternates: { canonical: "/recipes" },
};

export default function RecipesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6 sm:pt-14">
      <header className="mb-10 max-w-3xl">
        <h1 className="h-display text-5xl sm:text-6xl">The recipe library</h1>
        <p className="mt-4 text-xl text-walnut-soft">
          Every recipe has a video, timed steps with photos and plain-language instructions, and a shopping list. Search by
          dish or by what&apos;s in your fridge.
        </p>
      </header>
      <Suspense fallback={<p className="text-walnut-soft">Loading recipes…</p>}>
        <RecipeBrowser recipes={recipes} />
      </Suspense>
    </div>
  );
}
