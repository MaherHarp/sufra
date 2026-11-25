import type { MetadataRoute } from "next";
import { recipes } from "@/data/recipes";
import { techniques } from "@/data/techniques";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/recipes", "/learn", "/pantry"].map((p) => ({ url: `${base}${p}`, changeFrequency: "weekly" as const, priority: p ? 0.8 : 1 }));
  return [
    ...pages,
    ...recipes.map((r) => ({ url: `${base}/recipes/${r.slug}`, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...techniques.map((t) => ({ url: `${base}/learn/${t.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
