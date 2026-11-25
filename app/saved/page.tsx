import type { Metadata } from "next";
import { recipes } from "@/data/recipes";
import { SavedRecipes } from "@/components/SavedRecipes";

export const metadata: Metadata = {
  title: "Saved Recipes",
  description: "The Lebanese recipes you've saved to cook later.",
  robots: { index: false },
};

export default function SavedPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-14">
      <header className="mb-10 max-w-3xl">
        <h1 className="h-display text-5xl sm:text-6xl">Saved recipes</h1>
        <p className="mt-4 text-xl text-walnut-soft">Tap the heart on any recipe to keep it here. Saved recipes stay on this device.</p>
      </header>
      <SavedRecipes recipes={recipes} />
    </div>
  );
}
