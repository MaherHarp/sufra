import type { Metadata } from "next";
import { recipes } from "@/data/recipes";
import { ShoppingList } from "@/components/ShoppingList";

export const metadata: Metadata = {
  title: "Shopping List",
  description: "One combined shopping list for every recipe you're cooking, scaled and sorted by store aisle.",
  robots: { index: false },
};

export default function ShoppingListPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-14">
      <header className="mb-10 max-w-3xl">
        <h1 className="h-display text-5xl sm:text-6xl">Shopping list</h1>
        <p className="mt-4 text-xl text-walnut-soft">
          Ingredients from every recipe you&apos;ve added, combined and sorted by store aisle. Your list is saved on this device.
        </p>
      </header>
      <ShoppingList recipes={recipes} />
    </div>
  );
}
