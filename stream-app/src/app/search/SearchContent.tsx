"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { searchShows, getShowsByVibes, getAllShows } from "@/lib/data";
import { VIBES } from "@/lib/vibes";
import type { Show } from "@/lib/supabase/types";
import ShowCard from "@/components/ShowCard";
import { Search, Sparkles, Shuffle } from "lucide-react";

const MOOD_SUGGESTIONS = [
  "ontspannen avond",
  "spannend en donker",
  "iets voor het gezin",
  "snel iets tussendoor",
  "avontuurlijk & meeslepend",
  "grappig & luchtig",
];

function scoreByMood(show: Show, query: string): number {
  const q = query.toLowerCase();
  const text = `${show.title} ${show.description} ${show.genres.join(" ")}`.toLowerCase();
  return q.split(" ").filter((word) => word.length > 2 && text.includes(word)).length;
}

export default function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";

  const [activeVibes, setActiveVibes] = useState<string[]>([]);
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
            <p className="text-gray-400 mb-6">Probeer een andere titel of genre.</p>
            <a
              href="/search"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-pink-600 hover:bg-pink-500 text-white text-sm font-semibold rounded-full transition-colors"
            >
              <Sparkles size={15} />
              Zoek op vibe
            </a>
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

  // Multi-vibe toggle
  const toggleVibe = (vibeId: string) => {
    setMoodInput("");
    setActiveVibes((prev) =>
      prev.includes(vibeId) ? prev.filter((v) => v !== vibeId) : [...prev, vibeId]
    );
  };

  // Verras me: pick a random vibe (different from current)
  const surpriseMe = () => {
    setMoodInput("");
    const available = VIBES.filter((v) => !activeVibes.includes(v.id));
    const pool = available.length > 0 ? available : VIBES;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    setActiveVibes([pick.id]);
  };

  const handleMoodInput = (value: string) => {
    setMoodInput(value);
    if (value.trim().length > 0) setActiveVibes([]);
  };

  const applySuggestion = (suggestion: string) => {
    setMoodInput(suggestion);
    setActiveVibes([]);
  };

  // Compute results
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
  } else if (activeVibes.length > 0) {
    const genres = VIBES.filter((v) => activeVibes.includes(v.id)).flatMap((v) => v.genres);
    const unique = [...new Set(genres)];
    vibeShows = getShowsByVibes(unique);
    const labels = VIBES.filter((v) => activeVibes.includes(v.id))
      .map((v) => `${v.emoji} ${v.label}`)
      .join(", ");
    resultsLabel = `${vibeShows.length} titel${vibeShows.length !== 1 ? "s" : ""} voor ${labels}`;
  }

  return (
    <div className="pt-24 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Waar heb je zin in?</h1>
          <p className="text-gray-400">
            Kies één of meerdere stemmingen en ontdek wat perfect bij je past.
          </p>
        </div>
        <button
          onClick={surpriseMe}
          className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 text-white text-sm font-semibold rounded-full transition-all"
        >
          <Shuffle size={15} />
          Verras me
        </button>
      </div>

      {/* Vibe cards grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
        {VIBES.map((vibe) => {
          const isActive = activeVibes.includes(vibe.id);
          return (
            <button
              key={vibe.id}
              onClick={() => toggleVibe(vibe.id)}
              className={`relative overflow-hidden rounded-2xl p-5 text-left transition-all duration-200
                bg-gradient-to-br ${vibe.gradient}
                border ${
                  isActive
                    ? "border-pink-500 shadow-lg shadow-pink-500/25 scale-[1.02]"
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
      <div className="mb-4">
        <div className="relative">
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

        {/* Suggestion pills */}
        <div className="flex flex-wrap gap-2 mt-3">
          {MOOD_SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => applySuggestion(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                moodInput === s
                  ? "bg-pink-600 border-pink-500 text-white"
                  : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {vibeShows.length > 0 && (
        <div className="mt-8">
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
        <div className="flex flex-col items-center justify-center py-16 text-center mt-4">
          <Sparkles size={40} className="text-gray-600 mb-4" />
          <p className="text-white text-lg font-semibold mb-2">Geen match gevonden</p>
          <p className="text-gray-400">Probeer andere woorden of kies een vibe hierboven.</p>
        </div>
      )}

      {/* Empty state */}
      {activeVibes.length === 0 && moodInput.trim().length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center mt-4">
          <Search size={40} className="text-gray-600 mb-4" />
          <p className="text-gray-400">Kies een vibe of beschrijf je stemming om te beginnen.</p>
        </div>
      )}
    </div>
  );
}
