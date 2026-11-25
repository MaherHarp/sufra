import type { Metadata, Viewport } from "next";
import "@fontsource/young-serif/400.css";
import "@fontsource-variable/figtree/index.css";
import "@fontsource/amiri/arabic-400.css";
import "@fontsource/amiri/arabic-700.css";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { TimerProvider } from "@/components/Timer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sufra — Learn to Cook Lebanese & Middle Eastern Food, Step by Step",
    template: "%s | Sufra Lebanese Kitchen",
  },
  description:
    "A free, beginner-friendly cooking school for authentic Lebanese and Middle Eastern food: video walkthroughs, detailed step-by-step recipes, timers, shopping lists and technique lessons.",
  openGraph: {
    type: "website",
    siteName: "Sufra Lebanese Kitchen",
    images: ["https://images.unsplash.com/photo-1785734290864-eca98549d0b6?auto=format&fit=crop&w=1200&q=75"],
  },
};

export const viewport: Viewport = {
  themeColor: "#F6EFE2",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans text-[1.0625rem] leading-relaxed antialiased">
        <TimerProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </TimerProvider>
      </body>
    </html>
  );
}
