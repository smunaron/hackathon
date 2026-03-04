"use client";

import { useSearchParams } from "next/navigation";
import { searchShows } from "@/lib/data";
import ShowCard from "@/components/ShowCard";
import { Search } from "lucide-react";

export default function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";
  const shows = query ? searchShows(query) : [];

  return (
    <div className="pt-24 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-white mb-2">
        {query ? `Resultaten voor "${query}"` : "Zoeken"}
      </h1>

      {query && (
        <p className="text-gray-400 text-sm mb-8">
          {shows.length} titel{shows.length !== 1 ? "s" : ""} gevonden
        </p>
      )}

      {!query && (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <Search size={48} className="text-gray-600 mb-4" />
          <p className="text-gray-400 text-lg">Gebruik de zoekbalk om shows en films te vinden.</p>
        </div>
      )}

      {query && shows.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <Search size={48} className="text-gray-600 mb-4" />
          <p className="text-white text-lg font-semibold mb-2">Geen resultaten</p>
          <p className="text-gray-400">Probeer een andere titel of genre.</p>
        </div>
      )}

      {shows.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {shows.map((show) => (
            <ShowCard key={show.id} show={show} size="sm" />
          ))}
        </div>
      )}
    </div>
  );
}
