import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRecipe, recipes } from "@/data/recipes";
import { RecipeView } from "@/components/RecipeView";
import { scaleIngredient } from "@/lib/format";

export const dynamicParams = false;

export function generateStaticParams() {
  return recipes.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const r = getRecipe(params.slug);
  if (!r) return {};
  const title = `${r.title} — Step-by-Step Lebanese Recipe for Beginners`;
  const description = `${r.summary} Video walkthrough, ${r.steps.length} detailed steps with timers, US and metric measurements, and a shopping list.`;
  const image = `${r.image.src}?auto=format&fit=crop&w=1200&h=630&q=75`;
  return {
    title,
    description,
    alternates: { canonical: `/recipes/${r.slug}` },
    openGraph: { title, description, type: "article", images: [{ url: image, width: 1200, height: 630, alt: r.image.alt }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

const iso = (min: number) => `PT${Math.floor(min / 60) ? `${Math.floor(min / 60)}H` : ""}${min % 60 ? `${min % 60}M` : ""}` || "PT0M";

export default function RecipePage({ params }: { params: { slug: string } }) {
  const r = getRecipe(params.slug);
  if (!r) notFound();
  const related = r.notes.pairsWith.map((s) => getRecipe(s)).filter((x): x is NonNullable<typeof x> => !!x).slice(0, 4);

  // Structured data so search engines can show rich recipe results.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: r.title,
    description: r.summary,
    image: [`${r.image.src}?auto=format&fit=crop&w=1200&q=75`],
    recipeCuisine: "Lebanese",
    recipeCategory: r.category,
    prepTime: iso(r.prepMinutes),
    cookTime: iso(r.cookMinutes),
    totalTime: iso(r.prepMinutes + r.cookMinutes + r.waitMinutes),
    recipeYield: `${r.servings} ${r.servingsLabel ?? "servings"}`,
    nutrition: { "@type": "NutritionInformation", calories: `${r.calories} calories` },
    suitableForDiet: r.dietary.includes("Vegan") ? "https://schema.org/VeganDiet" : r.dietary.includes("Vegetarian") ? "https://schema.org/VegetarianDiet" : undefined,
    recipeIngredient: r.ingredients
      .filter((g) => !g.method || g.method === r.methods?.[0].id)
      .flatMap((g) => g.items.map((i) => `${scaleIngredient(i, 1)?.us ?? ""} ${i.name}`.trim())),
    recipeInstructions: r.steps
      .filter((s) => !s.method || s.method === r.methods?.[0].id)
      .map((s) => ({ "@type": "HowToStep", name: s.title, text: s.body.join(" ") })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <RecipeView recipe={r} related={related} />
    </>
  );
}
