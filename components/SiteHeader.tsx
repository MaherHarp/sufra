"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { Heart, Menu, Search, ShoppingBasket, X } from "lucide-react";
import { useFavorites, useShoppingList } from "@/lib/storage";

const NAV = [
  { href: "/recipes", label: "Recipes" },
  { href: "/learn", label: "Techniques" },
  { href: "/pantry", label: "Pantry" },
];

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`group inline-flex items-baseline gap-2 ${className}`} aria-label="Sufra — home">
      <span className="font-display text-[1.6rem] leading-none text-olive-deep">Sufra</span>
      <span lang="ar" dir="rtl" className="font-arabic text-xl leading-none text-terra">
        سفرة
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { favorites } = useFavorites();
  const { entries } = useShoppingList();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => setOpen(false), [pathname]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    router.push(q.trim() ? `/recipes?q=${encodeURIComponent(q.trim())}` : "/recipes");
    setQ("");
  };

  const active = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="no-print sticky top-0 z-50 border-b border-walnut/10 bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/85">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:rounded-full focus:bg-olive focus:px-4 focus:py-2 focus:text-paper">
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Logo />
        <nav aria-label="Main" className="ml-6 hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={active(n.href) ? "page" : undefined}
              className={`rounded-full px-3.5 py-2 text-[0.95rem] font-medium transition-colors ${
                active(n.href) ? "bg-olive-soft text-olive-deep" : "hover:text-olive"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <form onSubmit={submit} role="search" className="ml-auto hidden items-center lg:flex">
          <label htmlFor="header-search" className="sr-only">
            Search recipes
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-walnut-soft" aria-hidden />
            <input
              id="header-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search recipes or ingredients"
              className="w-64 rounded-full border border-walnut/20 bg-white/60 py-2 pl-9 pr-3 text-sm placeholder:text-walnut-soft/80 focus:border-olive focus:outline-none"
            />
          </div>
        </form>

        <div className="ml-auto flex items-center gap-1 lg:ml-2">
          <Link href="/recipes" className="rounded-full p-2.5 hover:bg-linen lg:hidden" aria-label="Search recipes">
            <Search className="h-5 w-5" />
          </Link>
          <Link href="/saved" className="relative rounded-full p-2.5 hover:bg-linen" aria-label={`Saved recipes (${favorites.length})`}>
            <Heart className="h-5 w-5" />
            {favorites.length > 0 && <Badge n={favorites.length} />}
          </Link>
          <Link
            href="/shopping-list"
            className="relative rounded-full p-2.5 hover:bg-linen"
            aria-label={`Shopping list (${entries.length} recipes)`}
          >
            <ShoppingBasket className="h-5 w-5" />
            {entries.length > 0 && <Badge n={entries.length} />}
          </Link>
          <button
            type="button"
            className="rounded-full p-2.5 hover:bg-linen md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-walnut/10 px-4 pb-4 md:hidden">
          <form onSubmit={submit} role="search" className="my-3">
            <label htmlFor="mobile-search" className="sr-only">
              Search recipes
            </label>
            <input
              id="mobile-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search recipes or ingredients"
              className="w-full rounded-full border border-walnut/20 bg-white/60 px-4 py-2.5 text-base focus:border-olive focus:outline-none"
            />
          </form>
          {[...NAV, { href: "/saved", label: "Saved recipes" }, { href: "/shopping-list", label: "Shopping list" }].map((n) => (
            <Link key={n.href} href={n.href} className="block border-b border-walnut/10 py-3 text-lg font-medium last:border-0">
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

function Badge({ n }: { n: number }) {
  return (
    <span className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-terra px-1 text-[0.65rem] font-bold leading-none text-paper">
      {n}
    </span>
  );
}
