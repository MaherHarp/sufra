import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <p lang="ar" className="font-arabic text-4xl text-terra">مش موجود</p>
      <h1 className="h-display mt-4 text-5xl">This page isn&apos;t on the menu</h1>
      <p className="mt-4 text-lg text-walnut-soft">The link may be old or mistyped. Let&apos;s get you back to the kitchen.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/recipes" className="btn-primary">Browse recipes</Link>
        <Link href="/" className="btn-quiet">Go to the homepage</Link>
      </div>
    </div>
  );
}
