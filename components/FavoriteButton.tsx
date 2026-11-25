"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "@/lib/storage";

export function FavoriteButton({ slug, title, compact = false }: { slug: string; title: string; compact?: boolean }) {
  const { isFavorite, toggle } = useFavorites();
  const saved = isFavorite(slug);

  if (compact) {
    return (
      <button
        type="button"
        onClick={() => toggle(slug)}
        aria-pressed={saved}
        aria-label={saved ? `Remove ${title} from saved recipes` : `Save ${title}`}
        className="relative z-10 grid h-10 w-10 place-items-center rounded-full bg-paper/90 shadow-sm backdrop-blur transition-colors hover:bg-paper"
      >
        <Heart className={`h-5 w-5 ${saved ? "fill-terra text-terra" : "text-walnut"}`} />
      </button>
    );
  }
  return (
    <button type="button" onClick={() => toggle(slug)} aria-pressed={saved} className="btn-quiet">
      <Heart className={`h-4 w-4 ${saved ? "fill-terra text-terra" : ""}`} aria-hidden />
      {saved ? "Saved" : "Save recipe"}
    </button>
  );
}
