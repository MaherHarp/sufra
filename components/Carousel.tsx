"use client";

import { useRef, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/** Horizontal scroll-snap carousel with previous/next buttons; swipeable on touch screens. */
export function Carousel({ children, label }: { children: ReactNode[]; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };
  return (
    <div role="region" aria-roledescription="carousel" aria-label={label} className="relative">
      <div className="mb-4 flex justify-end gap-2">
        <button type="button" onClick={() => scroll(-1)} className="grid h-11 w-11 place-items-center rounded-full border border-walnut/20 hover:border-olive hover:text-olive" aria-label="Previous recipes">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button type="button" onClick={() => scroll(1)} className="grid h-11 w-11 place-items-center rounded-full border border-walnut/20 hover:border-olive hover:text-olive" aria-label="Next recipes">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <div ref={ref} className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-4 [scrollbar-width:thin] sm:-mx-6 sm:px-6">
        {children.map((child, i) => (
          <div key={i} className="w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-[31.5%]" role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${children.length}`}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
