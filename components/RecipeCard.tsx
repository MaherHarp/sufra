import Image from "next/image";
import Link from "next/link";
import { Clock, Users } from "lucide-react";
import type { Recipe } from "@/data/types";
import { categoryName } from "@/data/recipes";
import { activeMinutes, formatMinutes } from "@/lib/format";
import { FavoriteButton } from "./FavoriteButton";
import { DifficultyMeter, Stars } from "./Bits";

export function RecipeCard({ recipe, priority = false }: { recipe: Recipe; priority?: boolean }) {
  const r = recipe;
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[1.25rem] border border-walnut/10 bg-[#FBF6EC]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={r.image.src}
          alt={r.image.alt}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 380px, (min-width: 768px) 45vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute right-3 top-3">
          <FavoriteButton slug={r.slug} title={r.title} compact />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm text-walnut-soft">
          {categoryName(r.category)}
          <span lang="ar" className="float-right font-arabic text-lg leading-none text-terra/80">
            {r.arabic}
          </span>
        </p>
        <h3 className="mt-1.5 font-display text-[1.45rem] leading-tight">
          <Link href={`/recipes/${r.slug}`} className="after:absolute after:inset-0 after:content-[''] focus:outline-none">
            {r.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-[0.97rem] text-walnut-soft">{r.summary}</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-4 text-sm">
          <span className="inline-flex items-center gap-1.5" title="Hands-on and cooking time">
            <Clock className="h-4 w-4 text-olive" aria-hidden />
            {formatMinutes(activeMinutes(r))}
            {r.waitMinutes > 0 && <span className="text-walnut-soft">+ wait</span>}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="h-4 w-4 text-olive" aria-hidden />
            {r.servings} {r.servingsLabel ?? "servings"}
          </span>
          <DifficultyMeter level={r.difficulty} />
          <Stars rating={r.rating} />
        </div>
      </div>
    </article>
  );
}
