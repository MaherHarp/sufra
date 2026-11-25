import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Wrench } from "lucide-react";
import { techniques } from "@/data/techniques";
import { getRecipe } from "@/data/recipes";
import { RecipeCard } from "@/components/RecipeCard";
import { LessonVideo } from "@/components/LessonVideo";

export const dynamicParams = false;

export function generateStaticParams() {
  return techniques.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const t = techniques.find((x) => x.slug === params.slug);
  if (!t) return {};
  return {
    title: `${t.title} — Lebanese Cooking Technique`,
    description: `${t.summary} A ${t.minutes}-minute, beginner-friendly lesson with step-by-step instructions and fixes for common problems.`,
    alternates: { canonical: `/learn/${t.slug}` },
    openGraph: { images: [`${t.image.src}?auto=format&fit=crop&w=1200&h=630&q=75`] },
  };
}

export default function TechniquePage({ params }: { params: { slug: string } }) {
  const t = techniques.find((x) => x.slug === params.slug);
  if (!t) notFound();
  const related = t.related.map(getRecipe).filter((r): r is NonNullable<typeof r> => !!r);
  const others = techniques.filter((x) => x.slug !== t.slug);

  return (
    <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 sm:pt-12">
      <nav aria-label="Breadcrumb" className="text-sm text-walnut-soft">
        <Link href="/learn" className="hover:text-olive hover:underline">Techniques</Link>
      </nav>
      <div className="mt-4 grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
        <div>
          <h1 className="h-display text-[2.5rem] sm:text-6xl">{t.title}</h1>
          <p className="mt-4 text-xl">{t.summary}</p>
          <p className="mt-5 max-w-prose border-l-2 border-wood pl-4 text-lg leading-relaxed text-walnut-soft">{t.why}</p>
        </div>
        <div className="arch relative mx-auto aspect-[4/5] w-full max-w-sm">
          <Image src={t.image.src} alt={t.image.alt} fill priority sizes="(min-width: 1024px) 380px, 80vw" className="object-cover" />
        </div>
      </div>

      {t.video && (
        <section className="mt-12 max-w-4xl" aria-label="Video">
          <LessonVideo id={t.video.youtubeId} title={t.video.title} />
          <p className="mt-2 text-sm text-walnut-soft">
            Video: “{t.video.title}” by {t.video.creator} on YouTube.
          </p>
        </section>
      )}

      <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <section aria-labelledby="how-h">
          <h2 id="how-h" className="h-display text-3xl sm:text-4xl">How to do it</h2>
          <ol className="mt-6 space-y-5">
            {t.steps.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[3rem_1fr] gap-4 rounded-[1.25rem] border border-walnut/10 bg-[#FBF6EC] p-5 sm:p-6">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-walnut font-display text-xl text-paper" aria-hidden>
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-2xl leading-tight">{s.title}</h3>
                  <p className="mt-2 text-[1.12rem] leading-[1.7]">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[1.25rem] border border-saffron/60 bg-saffron-soft/60 p-5">
            <h2 className="flex items-center gap-2 font-display text-xl">
              <CheckCircle2 className="h-5 w-5 text-olive" aria-hidden /> You got it right if…
            </h2>
            <ul className="mt-3 list-disc space-y-1.5 pl-5">
              {t.checks.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-[1.25rem] border border-walnut/10 bg-[#FBF6EC] p-5">
            <h2 className="flex items-center gap-2 font-display text-xl">
              <Wrench className="h-5 w-5 text-terra" aria-hidden /> Fix it
            </h2>
            <dl className="mt-3 space-y-3">
              {t.fixes.map((f) => (
                <div key={f.problem}>
                  <dt className="font-semibold">{f.problem}</dt>
                  <dd className="text-[0.97rem] leading-snug text-walnut-soft">{f.fix}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-16" aria-labelledby="practice-h">
          <h2 id="practice-h" className="h-display text-3xl sm:text-4xl">Practise it in a recipe</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <RecipeCard key={r.slug} recipe={r} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-16" aria-labelledby="more-h">
        <h2 id="more-h" className="h-display text-2xl">More techniques</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/learn/${o.slug}`} className="chip hover:border-olive hover:text-olive">
                {o.title.replace("How to ", "")}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
