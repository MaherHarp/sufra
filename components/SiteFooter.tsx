import Link from "next/link";
import { categories } from "@/data/recipes";

export function SiteFooter() {
  return (
    <footer className="no-print mt-24 bg-olive-deep text-paper">
      <div className="khatam-faint">
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-3xl">
              Sufra <span lang="ar" className="font-arabic text-2xl text-saffron">سفرة</span>
            </p>
            <p className="mt-3 max-w-sm text-paper/80">
              A sufra is the spread laid out for family and guests. This is a free cooking school for anyone who wants to set
              one of their own, one dish at a time.
            </p>
          </div>
          <div>
            <p className="font-semibold text-saffron">Cook</p>
            <ul className="mt-3 space-y-2 text-paper/85">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link href={`/recipes?category=${c.id}`} className="hover:text-paper hover:underline">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-saffron">Learn</p>
            <ul className="mt-3 space-y-2 text-paper/85">
              <li><Link href="/#start-here" className="hover:text-paper hover:underline">Beginner path</Link></li>
              <li><Link href="/learn" className="hover:text-paper hover:underline">Techniques</Link></li>
              <li><Link href="/pantry" className="hover:text-paper hover:underline">The essential pantry</Link></li>
              <li><Link href="/shopping-list" className="hover:text-paper hover:underline">Shopping list</Link></li>
              <li><Link href="/saved" className="hover:text-paper hover:underline">Saved recipes</Link></li>
            </ul>
          </div>
        </div>
        <div className="relative border-t border-paper/15">
          <p className="mx-auto max-w-7xl px-4 py-5 text-sm text-paper/70 sm:px-6">
            Food photography from Unsplash. Embedded videos belong to their creators on YouTube. Calories are approximate.
          </p>
        </div>
      </div>
    </footer>
  );
}
