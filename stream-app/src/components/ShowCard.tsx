import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";
import type { Show } from "@/lib/supabase/types";

interface ShowCardProps {
  show: Show;
  size?: "sm" | "md" | "lg";
}

export default function ShowCard({ show, size = "md" }: ShowCardProps) {
  const dims = {
    sm: { w: 160, h: 240, cls: "w-40 h-60" },
    md: { w: 200, h: 300, cls: "w-48 h-72 sm:w-52 sm:h-80" },
    lg: { w: 240, h: 360, cls: "w-56 h-84 sm:w-64 sm:h-96" },
  }[size];

  return (
    <Link href={`/shows/${show.id}`} className="group block shrink-0">
      <div className={`relative ${dims.cls} rounded-xl overflow-hidden bg-[#141420]`}>
        <Image
          src={show.thumbnail}
          alt={show.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 160px, 200px"
          unoptimized
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/30">
            <Play className="text-white fill-white" size={24} />
          </div>
        </div>
        {/* Category badge */}
        <div className="absolute top-2 left-2">
          <span className="text-xs font-medium px-2 py-0.5 bg-red-600/90 text-white rounded-full uppercase tracking-wide">
            {show.category === "movie" ? "Film" : "Series"}
          </span>
        </div>
        {/* Bottom info on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <p className="text-white text-sm font-semibold line-clamp-2 leading-tight">
            {show.title}
          </p>
          <p className="text-gray-300 text-xs mt-0.5">{show.year} · {show.rating}</p>
        </div>
      </div>
      <div className="mt-2 px-0.5">
        <p className="text-sm font-medium text-gray-200 truncate group-hover:text-white transition-colors">
          {show.title}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">
          {show.genres.slice(0, 2).join(" · ")}
        </p>
      </div>
    </Link>
  );
}
