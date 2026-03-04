"use client";

import { useEffect, useState } from "react";
import { getAllShows } from "@/lib/data";
import ShowCard from "@/components/ShowCard";
import { BookmarkCheck } from "lucide-react";

export default function WatchlistPage() {
  const [watchlistIds, setWatchlistIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("watchlist");
    setWatchlistIds(stored ? JSON.parse(stored) : []);
    setMounted(true);
  }, []);

  const allShows = getAllShows();
  const shows = allShows.filter((s) => watchlistIds.includes(s.id));

  if (!mounted) return null;

  return (
    <div className="pt-24 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 mb-8">
        <BookmarkCheck size={28} className="text-red-600" />
        <h1 className="text-2xl font-bold text-white">Mijn Watchlist</h1>
      </div>

      {shows.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <BookmarkCheck size={48} className="text-gray-600 mb-4" />
          <p className="text-white text-lg font-semibold mb-2">Je watchlist is leeg</p>
          <p className="text-gray-400">
            Bladere door shows en films en klik op{" "}
            <span className="text-white font-medium">Toevoegen</span> om ze hier op te slaan.
          </p>
        </div>
      ) : (
        <>
          <p className="text-gray-400 text-sm mb-6">
            {shows.length} titel{shows.length !== 1 ? "s" : ""} opgeslagen
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {shows.map((show) => <ShowCard key={show.id} show={show} size="sm" />)}
          </div>
        </>
      )}
    </div>
  );
}
