import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { pantry } from "@/data/pantry";
import { getRecipe } from "@/data/recipes";

export const metadata: Metadata = {
  title: "The Lebanese Pantry — Essential Ingredients & Where to Buy Them",
  description:
    "Tahini, za'atar, sumac, seven spice, bulgur, pomegranate molasses, orange blossom water and more: what each Lebanese pantry staple is, what it's used for and where to buy it.",
  alternates: { canonical: "/pantry" },
};

export default function PantryPage() {
  const essentials = pantry.filter((p) => p.essential);
  const extras = pantry.filter((p) => !p.essential);
  return (
    <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-14">
      <header className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <h1 className="h-display text-5xl sm:text-6xl">The Lebanese pantry</h1>
          <p className="mt-4 max-w-2xl text-xl text-walnut-soft">
            You don&apos;t need a special shop to start. These staples keep for months and turn up again and again across the recipes.
            Buy the essentials first; pick up the rest as you need them.
          </p>
        </div>
        <div className="rounded-2xl bg-linen/80 p-5">
          <p className="font-semibold">Where to shop</p>
          <p className="mt-1 text-[0.98rem] leading-relaxed">
            A Middle Eastern, Lebanese, Turkish or Greek grocer will have everything at the best prices. Larger supermarkets carry most
            items in the international or spice aisle, and all of them are easy to find online.
          </p>
          <Link href="/shopping-list" className="mt-3 inline-block font-semibold text-olive underline underline-offset-4">
            Open your shopping list
          </Link>
        </div>
      </header>

      <PantrySection title="Start with these" items={essentials} />
      <PantrySection title="Add these as you go" items={extras} />
    </div>
  );
}

function PantrySection({ title, items }: { title: string; items: typeof pantry }) {
  return (
    <section className="mt-14" aria-label={title}>
      <h2 className="h-display text-3xl sm:text-4xl">{title}</h2>
      <ul className="mt-6 grid gap-6 md:grid-cols-2">
        {items.map((p) => (
          <li key={p.id} id={p.id} className="grid scroll-mt-24 overflow-hidden rounded-[1.5rem] border border-walnut/10 bg-[#FBF6EC] sm:grid-cols-[12rem_1fr]">
            <div className="relative aspect-[16/9] sm:aspect-auto">
              <Image src={p.image.src} alt={p.image.alt} fill sizes="(min-width: 640px) 192px, 100vw" className="object-cover" />
            </div>
            <div className="p-5 sm:p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-2xl">{p.name}</h3>
                <span lang="ar" className="font-arabic text-xl text-terra">{p.arabic}</span>
              </div>
              <p className="mt-2 leading-relaxed">{p.what}</p>
              <dl className="mt-4 space-y-2 text-[0.97rem] leading-snug">
                <div>
                  <dt className="inline font-semibold text-olive-deep">Used for: </dt>
                  <dd className="inline">{p.usedFor}</dd>
                </div>
                <div>
                  <dt className="inline font-semibold text-olive-deep">Where to buy: </dt>
                  <dd className="inline">{p.buying}</dd>
                </div>
                <div>
                  <dt className="inline font-semibold text-olive-deep">Keeps: </dt>
                  <dd className="inline">{p.keeps}</dd>
                </div>
              </dl>
              <p className="mt-4 flex flex-wrap gap-2 text-sm">
                {p.usedIn.map((slug) => {
                  const r = getRecipe(slug);
                  return r ? (
                    <Link key={slug} href={`/recipes/${slug}`} className="rounded-full bg-olive-soft px-3 py-1 font-medium text-olive-deep hover:bg-olive hover:text-paper">
                      {r.title.split(" (")[0]}
                    </Link>
                  ) : null;
                })}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
