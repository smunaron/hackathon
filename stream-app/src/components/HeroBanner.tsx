import Link from "next/link";
import Image from "next/image";
import { Play, Info } from "lucide-react";
import type { Show } from "@/lib/supabase/types";

interface HeroBannerProps {
  show: Show;
  firstEpisodeId?: string;
}

export default function HeroBanner({ show, firstEpisodeId }: HeroBannerProps) {
  return (
    <div className="relative h-[70vh] min-h-[500px] max-h-[800px] w-full overflow-hidden">
      {/* Background image */}
      <Image
        src={show.banner}
        alt={show.title}
        fill
        className="object-cover"
        priority
        unoptimized
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-end pb-16 sm:pb-20">
        <div className="px-4 sm:px-6 lg:px-8 max-w-2xl">
          {/* Featured badge */}
          <div className="mb-3">
            <span className="text-xs font-bold px-2 py-1 bg-red-600 text-white rounded uppercase tracking-widest">
              Featured
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">
            {show.title}
          </h1>

          <div className="flex items-center gap-3 text-sm text-gray-300 mb-4">
            <span className="border border-gray-500 px-2 py-0.5 rounded text-xs">
              {show.rating}
            </span>
            <span>{show.year}</span>
            <span>{show.genres.slice(0, 3).join(" · ")}</span>
          </div>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3 max-w-lg">
            {show.description}
          </p>

          <div className="flex flex-wrap gap-3">
            {firstEpisodeId ? (
              <Link
                href={`/watch/${firstEpisodeId}`}
                className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Play className="fill-black" size={18} />
                Play
              </Link>
            ) : null}
            <Link
              href={`/shows/${show.id}`}
              className="flex items-center gap-2 px-6 py-3 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 backdrop-blur-sm transition-colors border border-white/20"
            >
              <Info size={18} />
              More Info
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
