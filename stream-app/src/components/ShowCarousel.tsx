"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ShowCard from "./ShowCard";
import type { Show } from "@/lib/supabase/types";

interface ShowCarouselProps {
  title: string;
  shows: Show[];
}

export default function ShowCarousel({ title, shows }: ShowCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -400 : 400, behavior: "smooth" });
  };

  if (shows.length === 0) return null;

  return (
    <section className="relative">
      <div className="flex items-center justify-between mb-4 px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg sm:text-xl font-bold text-white">{title}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="carousel-scroll flex gap-4 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-2"
      >
        {shows.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>
    </section>
  );
}
