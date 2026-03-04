"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { searchShows, getShowsByVibes, getAllShows } from "@/lib/data";
import { VIBES } from "@/lib/vibes";
import type { Show } from "@/lib/supabase/types";
import ShowCard from "@/components/ShowCard";
import { Search, Sparkles } from "lucide-react";

function scoreByMood(show: Show, query: string): number {
  const q = query.toLowerCase();
  const text = `${show.title} ${show.description} ${show.genres.join(" ")}`.toLowerCase();
  return q.split(" ").filter((word) => word.length > 2 && text.includes(word)).length;
}

export default function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";

  const [activeVibe, setActiveVibe] = useState<string | null>(null);
  const [moodInput, setMoodInput] = useState("");

  // Title search takes precedence when ?q= is in URL
  if (query) {
    const shows = searchShows(query);
    return (
      <div className="pt-24 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-white mb-2">
          Resultaten voor &ldquo;{query}&rdquo;
        </h1>
        <p className="text-gray-400 text-sm mb-8">
          {shows.length} titel{shows.length !== 1 ? "s" : ""} gevonden
        </p>
        {shows.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <Search size={48} className="text-gray-600 mb-4" />
            <p className="text-white text-lg font-semibold mb-2">Geen resultaten</p>
            <p className="text-gray-400">Probeer een andere titel of genre.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {shows.map((show) => (
              <ShowCard key={show.id} show={show} size="sm" />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Determine vibe results
  const selectedVibe = VIBES.find((v) => v.id === activeVibe) ?? null;

  let vibeShows: Show[] = [];
  let resultsLabel = "";

  if (moodInput.trim().length > 0) {
    const withScores = getAllShows()
      .map((s) => ({ show: s, score: scoreByMood(s, moodInput) }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score);
    vibeShows = withScores.map((x) => x.show);
    resultsLabel =
      vibeShows.length > 0
        ? `${vibeShows.length} titel${vibeShows.length !== 1 ? "s" : ""} voor jouw stemming ✨`
        : "";
  } else if (selectedVibe) {
    vibeShows = getShowsByVibes(selectedVibe.genres);
    resultsLabel = `${vibeShows.length} titel${vibeShows.length !== 1 ? "s" : ""} voor ${selectedVibe.label} ${selectedVibe.emoji}`;
  }

  const handleVibeClick = (vibeId: string) => {
    setMoodInput("");
    setActiveVibe((prev) => (prev === vibeId ? null : vibeId));
  };

  const handleMoodInput = (value: string) => {
    setMoodInput(value);
    if (value.trim().length > 0) {
      setActiveVibe(null);
    }
  };

  return (
    <div className="pt-24 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">Wat is je vibe?</h1>
        <p className="text-gray-400">Kies een stemming en ontdek wat perfect bij je past.</p>
      </div>

      {/* Vibe cards grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
        {VIBES.map((vibe) => {
          const isActive = activeVibe === vibe.id;
          return (
            <button
              key={vibe.id}
              onClick={() => handleVibeClick(vibe.id)}
              className={`relative overflow-hidden rounded-2xl p-5 text-left transition-all duration-200
                bg-gradient-to-br ${vibe.gradient}
                border ${
                  isActive
                    ? `border-pink-500 shadow-lg shadow-pink-500/25 scale-[1.02]`
                    : "border-white/5 hover:border-white/20 hover:scale-[1.01]"
                }`}
            >
              <span className="text-3xl mb-3 block">{vibe.emoji}</span>
              <p className="font-bold text-white text-sm">{vibe.label}</p>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">{vibe.description}</p>
              {isActive && (
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-pink-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Free-text mood input */}
      <div className="relative mb-10">
        <Sparkles
          className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-500 pointer-events-none"
          size={16}
        />
        <input
          type="text"
          value={moodInput}
          onChange={(e) => handleMoodInput(e.target.value)}
          placeholder="Of beschrijf je stemming... bijv. 'iets chill voor een regenachtige avond'"
          className="w-full bg-[#160429] border border-[#2d1050] focus:border-pink-500 rounded-2xl
                     pl-11 pr-4 py-4 text-white placeholder-gray-500 outline-none transition-colors"
        />
      </div>

      {/* Results */}
      {vibeShows.length > 0 && (
        <div>
          <p className="text-gray-400 text-sm mb-6">{resultsLabel}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {vibeShows.map((show) => (
              <ShowCard key={show.id} show={show} size="sm" />
            ))}
          </div>
        </div>
      )}

      {/* No results for mood input */}
      {moodInput.trim().length > 0 && vibeShows.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Sparkles size={40} className="text-gray-600 mb-4" />
          <p className="text-white text-lg font-semibold mb-2">Geen match gevonden</p>
          <p className="text-gray-400">Probeer andere woorden of kies een vibe hierboven.</p>
        </div>
      )}

      {/* Empty state — nothing selected yet */}
      {!activeVibe && moodInput.trim().length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Search size={40} className="text-gray-600 mb-4" />
          <p className="text-gray-400">Kies een vibe of beschrijf je stemming om te beginnen.</p>
        </div>
      )}
    </div>
  );
}
