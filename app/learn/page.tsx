import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, PlayCircle } from "lucide-react";
import { techniques } from "@/data/techniques";

export const metadata: Metadata = {
  title: "Techniques — Core Lebanese Cooking Skills",
  description:
    "Short lessons on the core skills of Lebanese cooking: tahini sauce, chopping parsley for tabbouleh, rolling grape leaves, crispy falafel, fluffy pita and balancing lemon, salt and garlic.",
  alternates: { canonical: "/learn" },
};

export default function LearnPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-14">
      <header className="mb-12 max-w-3xl">
        <h1 className="h-display text-5xl sm:text-6xl">Techniques</h1>
        <p className="mt-4 text-xl text-walnut-soft">
          Six short lessons on the skills that come up again and again. Learn them once and every recipe gets easier.
        </p>
      </header>
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {techniques.map((t) => (
          <li key={t.slug}>
            <Link href={`/learn/${t.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-walnut/10 bg-[#FBF6EC]">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={t.image.src} alt={t.image.alt} fill sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h2 className="font-display text-2xl leading-tight group-hover:underline">{t.title}</h2>
                <p className="mt-2 text-walnut-soft">{t.summary}</p>
                <p className="mt-auto flex items-center gap-4 pt-4 text-sm">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-olive" aria-hidden /> {t.minutes} min lesson
                  </span>
                  {t.video && (
                    <span className="inline-flex items-center gap-1.5">
                      <PlayCircle className="h-4 w-4 text-terra" aria-hidden /> Video
                    </span>
                  )}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
