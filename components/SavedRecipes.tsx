"use client";

import Link from "next/link";
import { Heart, ShoppingBasket } from "lucide-react";
import type { Recipe } from "@/data/types";
import { useFavorites, useShoppingList } from "@/lib/storage";
import { RecipeCard } from "./RecipeCard";

export function SavedRecipes({ recipes }: { recipes: Recipe[] }) {
  const { favorites, loaded } = useFavorites();
  const list = useShoppingList();
  const saved = favorites.map((s) => recipes.find((r) => r.slug === s)).filter((r): r is Recipe => !!r);

  if (!loaded) return <p className="text-walnut-soft">Loading…</p>;

  if (!saved.length) {
    return (
      <div className="khatam-faint rounded-[1.5rem] border border-walnut/10 bg-[#FBF6EC] p-8 text-center sm:p-12">
        <Heart className="relative mx-auto h-10 w-10 text-terra" aria-hidden />
        <p className="relative mt-4 font-display text-3xl">Nothing saved yet</p>
        <p className="relative mx-auto mt-2 max-w-md text-walnut-soft">Tap the heart on a recipe to save it here for later.</p>
        <Link href="/recipes" className="btn-primary relative mt-6">
          Find something to cook
        </Link>
      </div>
    );
  }

  const notOnList = saved.filter((r) => !list.has(r.slug));
  return (
    <>
      {notOnList.length > 0 && (
        <button
          type="button"
          className="btn-primary mb-8"
          onClick={() => notOnList.forEach((r) => list.addRecipe({ slug: r.slug, servings: r.servings, method: r.methods?.[0].id, skip: [] }))}
        >
          <ShoppingBasket className="h-4 w-4" aria-hidden /> Add all {notOnList.length} to my shopping list
        </button>
      )}
      {notOnList.length === 0 && (
        <p className="mb-8">
          Everything here is on your{" "}
          <Link href="/shopping-list" className="font-semibold text-olive underline underline-offset-4">
            shopping list
          </Link>
          .
        </p>
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {saved.map((r) => (
          <RecipeCard key={r.slug} recipe={r} />
        ))}
      </div>
    </>
  );
}
