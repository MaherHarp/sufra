type LoaderArgs = { src: string; width: number; quality?: number };

/** Requests a correctly sized image from Unsplash's own image CDN. */
export default function unsplashLoader({ src, width, quality }: LoaderArgs): string {
  if (!src.startsWith("https://images.unsplash.com/")) return src;
  const url = new URL(src);
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "crop");
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 72));
  return url.toString();
}
