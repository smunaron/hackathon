/**
 * Data access layer — backed by mock data for now.
 * Swap SHOWS/EPISODES imports for Supabase calls when you're ready.
 */
import { SHOWS, EPISODES } from "./mock-data";
import type { Show, Episode } from "./supabase/types";

export function getAllShows(): Show[] {
  return SHOWS;
}

export function getFeaturedShow(): Show | null {
  return SHOWS.find((s) => s.featured) ?? SHOWS[0] ?? null;
}

export function getShowById(id: string): Show | null {
  return SHOWS.find((s) => s.id === id) ?? null;
}

export function getShowsByCategory(category: "series" | "movie"): Show[] {
  return SHOWS.filter((s) => s.category === category);
}

export function searchShows(query: string): Show[] {
  const q = query.toLowerCase();
  return SHOWS.filter(
    (s) =>
      s.title.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.genres.some((g) => g.toLowerCase().includes(q))
  );
}

export function getShowsByGenre(genre: string): Show[] {
  return SHOWS.filter((s) => s.genres.includes(genre));
}

export function getGenreGroups(): Record<string, Show[]> {
  const groups: Record<string, Show[]> = {};
  SHOWS.forEach((show) => {
    show.genres.forEach((genre) => {
      if (!groups[genre]) groups[genre] = [];
      groups[genre].push(show);
    });
  });
  return groups;
}

export function getEpisodesForShow(showId: string): Episode[] {
  return EPISODES.filter((e) => e.show_id === showId).sort(
    (a, b) => a.season - b.season || a.episode_number - b.episode_number
  );
}

export function getAllEpisodes(): Episode[] {
  return EPISODES;
}

export function getEpisodeById(id: string): Episode | null {
  return EPISODES.find((e) => e.id === id) ?? null;
}

export function getFirstEpisode(showId: string): Episode | null {
  return (
    EPISODES.find((e) => e.show_id === showId && e.season === 1 && e.episode_number === 1) ?? null
  );
}

export function getRelatedShows(excludeShowId: string, limit = 6): Show[] {
  return SHOWS.filter((s) => s.id !== excludeShowId).slice(0, limit);
}

export function getShowsByVibes(genres: string[]): Show[] {
  return SHOWS.filter((s) => s.genres.some((g) => genres.includes(g)));
}
