import Image from "next/image";
import Link from "next/link";
import { Clock, Eye, ListChecks, PlayCircle } from "lucide-react";
import { beginnerPath, categories, getRecipe, recipes } from "@/data/recipes";
import { pantry } from "@/data/pantry";
import { siteImages } from "@/data/images";
import { activeMinutes, formatMinutes } from "@/lib/format";
import { RecipeCard } from "@/components/RecipeCard";
import { Carousel } from "@/components/Carousel";
import { DifficultyMeter, StarRule } from "@/components/Bits";

export default function HomePage() {
  const featured = recipes.filter((r) => r.featured).sort((a, b) => a.popularity - b.popularity);
  const path = beginnerPath.map((p) => ({ ...p, recipe: getRecipe(p.slug)! }));
  const hummus = getRecipe("classic-creamy-hummus")!;
  const sampleStep = hummus.steps[5];

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden">
        <div className="khatam-faint absolute inset-y-0 right-0 hidden w-[42%] bg-linen lg:block" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:pb-24 lg:pt-16">
          <div>
            <p lang="ar" dir="rtl" className="text-left font-arabic text-3xl text-terra">أهلا وسهلا</p>
            <h1 className="h-display mt-4 text-[2.9rem] sm:text-7xl lg:text-[5.4rem]">
              Learn to Cook Lebanese &amp; Middle Eastern Food, Step-by-Step
            </h1>
            <p className="mt-6 max-w-xl text-xl leading-relaxed sm:text-[1.35rem]">
              A free cooking school for complete beginners. Every recipe comes with a video, timed steps that tell you exactly
              what each stage should look like, and a shopping list — so you can cook your first Lebanese meal tonight.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#start-here" className="btn-primary px-7 py-3.5 text-lg">
                Start Cooking
              </Link>
              <Link href="/recipes" className="btn-quiet px-7 py-3.5 text-lg">
                Browse all {recipes.length} recipes
              </Link>
            </div>
          </div>
          <figure className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="arch relative aspect-[3/4] w-full border-[6px] border-paper shadow-[0_30px_60px_-30px_rgba(74,50,34,0.55)]">
              <Image src={siteImages.hero.src} alt={siteImages.hero.alt} fill priority sizes="(min-width: 1024px) 480px, 90vw" className="object-cover" />
            </div>
            <figcaption className="mt-3 text-center text-sm text-walnut-soft">
              A sufra: the spread laid out for family and guests.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ---------- Beginner path ---------- */}
      <section id="start-here" aria-labelledby="start-h" className="scroll-mt-20 bg-olive-deep text-paper">
        <div className="khatam-faint">
          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
              <div>
                <h2 id="start-h" className="font-display text-4xl leading-tight sm:text-5xl">
                  Start here if you&apos;re a beginner
                </h2>
                <p className="mt-4 max-w-md text-lg text-paper/85">
                  Cook these six dishes in order. Each one teaches a single new skill and builds on the last, from a two-ingredient
                  dip to your first yeast dough. By the end you&apos;ll have a full Lebanese table.
                </p>
                <Link href={`/recipes/${path[0].recipe.slug}`} className="btn mt-7 bg-saffron px-6 py-3 text-walnut hover:bg-saffron-soft">
                  Begin with lesson 1: {path[0].recipe.title.split(" with")[0]}
                </Link>
              </div>
              <ol className="grid gap-3 sm:grid-cols-2">
                {path.map(({ recipe, why }, i) => (
                  <li key={recipe.slug}>
                    <Link href={`/recipes/${recipe.slug}`} className="group flex h-full gap-4 rounded-2xl bg-paper/[0.07] p-4 ring-1 ring-paper/10 transition-colors hover:bg-paper/[0.13]">
                      <div className="arch relative h-24 w-[4.5rem] shrink-0">
                        <Image src={recipe.image.src} alt="" fill sizes="72px" className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm text-saffron">Lesson {i + 1}</p>
                        <p className="font-display text-xl leading-tight group-hover:underline">{recipe.title.split(" (")[0]}</p>
                        <p className="mt-1 text-[0.95rem] leading-snug text-paper/80">{why}</p>
                        <p className="mt-2 flex items-center gap-3 text-sm text-paper/70">
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" aria-hidden /> {formatMinutes(activeMinutes(recipe))}
                          </span>
                          <DifficultyMeter level={recipe.difficulty} />
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Featured ---------- */}
      <section aria-labelledby="featured-h" className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="featured-h" className="h-display text-4xl sm:text-5xl">Cooked most often</h2>
            <p className="mt-2 max-w-lg text-lg text-walnut-soft">The dishes people make again and again once they&apos;ve learned them.</p>
          </div>
          <Link href="/recipes" className="font-semibold text-olive underline underline-offset-4">
            See every recipe
          </Link>
        </div>
        <div className="mt-6">
          <Carousel label="Featured recipes">
            {featured.map((r) => (
              <RecipeCard key={r.slug} recipe={r} />
            ))}
          </Carousel>
        </div>
      </section>

      {/* ---------- Categories ---------- */}
      <section aria-labelledby="cat-h" className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <h2 id="cat-h" className="h-display text-4xl sm:text-5xl">Browse by course</h2>
        <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
          {categories.map((c) => {
            const count = recipes.filter((r) => r.category === c.id).length;
            return (
              <li key={c.id}>
                <Link href={`/recipes?category=${c.id}`} className="group relative block aspect-[4/3] overflow-hidden rounded-[1.25rem] sm:aspect-[16/10]">
                  <Image src={c.image.src} alt={c.image.alt} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute inset-0 bg-gradient-to-t from-walnut/85 via-walnut/25 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 p-4 text-paper sm:p-5">
                    <span className="block font-display text-xl leading-tight sm:text-2xl">{c.name}</span>
                    <span className="mt-0.5 block text-sm text-paper/80">
                      {c.blurb} · {count} {count === 1 ? "recipe" : "recipes"}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ---------- Pantry preview ---------- */}
      <section aria-labelledby="pantry-h" className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 rounded-[2rem] bg-linen/70 p-6 sm:p-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 id="pantry-h" className="h-display text-4xl sm:text-5xl">The essential pantry</h2>
            <p className="mt-4 max-w-md text-lg">
              Nine jars and bags unlock almost every recipe on this site. Here&apos;s what each one is, what it tastes like and where
              to buy it.
            </p>
            <Link href="/pantry" className="btn-primary mt-7">
              Stock your pantry
            </Link>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {pantry.filter((p) => p.essential).slice(0, 6).map((p) => (
              <li key={p.id} className="overflow-hidden rounded-2xl bg-paper">
                <div className="relative aspect-[4/3]">
                  <Image src={p.image.src} alt={p.image.alt} fill sizes="(min-width: 1024px) 200px, 45vw" className="object-cover" />
                </div>
                <div className="p-3">
                  <p className="font-display text-lg leading-tight">{p.name}</p>
                  <p lang="ar" className="font-arabic text-terra">{p.arabic}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Why this works ---------- */}
      <section aria-labelledby="why-h" className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <StarRule className="mb-14" />
        <h2 id="why-h" className="h-display max-w-3xl text-4xl sm:text-5xl">Why beginners don&apos;t get lost here</h2>
        <div className="mt-10 grid gap-10 lg:grid-cols-3">
          <div>
            <PlayCircle className="h-8 w-8 text-terra" aria-hidden />
            <h3 className="mt-3 font-display text-2xl">Watch before you cook</h3>
            <p className="mt-2 text-lg leading-relaxed">
              Each recipe has a video walkthrough and a guided lesson with chapters that line up with the written steps, plus a full
              transcript.
            </p>
          </div>
          <div>
            <Eye className="h-8 w-8 text-terra" aria-hidden />
            <h3 className="mt-3 font-display text-2xl">Know when it&apos;s right</h3>
            <p className="mt-2 text-lg leading-relaxed">
              No vague &ldquo;mix and cook&rdquo;. Every step says what it should look, smell or feel like, with a pro tip and the most
              common mistake.
            </p>
            <blockquote className="mt-4 rounded-xl border-l-4 border-saffron bg-saffron-soft/60 p-4 text-[0.98rem] leading-snug">
              <span className="font-semibold">Hummus, step 6: </span>
              {sampleStep.cue}
            </blockquote>
          </div>
          <div>
            <ListChecks className="h-8 w-8 text-terra" aria-hidden />
            <h3 className="mt-3 font-display text-2xl">Shopping lists included</h3>
            <p className="mt-2 text-lg leading-relaxed">
              Tick off what you already have and send the rest to one combined list, sorted by store aisle and scaled to however many
              people you&apos;re feeding.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
