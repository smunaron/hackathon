import { getShowById, getEpisodesForShow, getFirstEpisode } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Play, Clock } from "lucide-react";
import WatchlistButton from "@/components/WatchlistButton";

export default async function ShowPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const show = getShowById(id);
  if (!show) notFound();

  const episodes = getEpisodesForShow(show.id);
  const firstEpisode = episodes[0] ?? null;
  const seasons = [...new Set(episodes.map((e) => e.season))].sort();

  const fmt = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    return h > 0 ? `${h}u ${m}m` : `${m}m`;
  };

  return (
    <div className="pt-16">
      {/* Banner */}
      <div className="relative h-[50vh] min-h-[380px]">
        <Image src={show.banner} alt={show.title} fill className="object-cover" priority unoptimized />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="shrink-0">
            <div className="w-40 h-60 md:w-52 md:h-80 rounded-xl overflow-hidden shadow-2xl">
              <Image src={show.thumbnail} alt={show.title} width={208} height={320} className="object-cover w-full h-full" unoptimized />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 pt-2 md:pt-16">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{show.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-4">
              <span className="border border-gray-600 px-2 py-0.5 rounded text-xs">{show.rating}</span>
              <span>{show.year}</span>
              <span className="capitalize">{show.category === "movie" ? "Film" : "Serie"}</span>
              <span>{show.genres.join(" · ")}</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-2xl">{show.description}</p>
            <div className="flex flex-wrap gap-3">
              {firstEpisode && (
                <Link
                  href={`/watch/${firstEpisode.id}`}
                  className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Play className="fill-black" size={18} />
                  {show.category === "movie" ? "Bekijk nu" : "Speel S1 E1"}
                </Link>
              )}
              <WatchlistButton showId={show.id} />
            </div>
          </div>
        </div>

        {/* Episodes */}
        {episodes.length > 0 && (
          <div className="mt-12 pb-12">
            <h2 className="text-xl font-bold text-white mb-6">
              {show.category === "movie" ? "Bekijk" : "Afleveringen"}
            </h2>
            {seasons.map((season) => {
              const seasonEps = episodes.filter((e) => e.season === season);
              return (
                <div key={season} className="mb-8">
                  {seasons.length > 1 && (
                    <h3 className="text-base font-semibold text-gray-300 mb-4">Seizoen {season}</h3>
                  )}
                  <div className="space-y-3">
                    {seasonEps.map((ep) => (
                      <Link
                        key={ep.id}
                        href={`/watch/${ep.id}`}
                        className="flex items-start gap-4 p-4 rounded-xl bg-[#141420] hover:bg-[#1e1e2e] border border-[#1f1f2e] hover:border-red-600/30 transition-all group"
                      >
                        <div className="relative shrink-0 w-32 h-20 rounded-lg overflow-hidden bg-black">
                          <Image src={ep.thumbnail} alt={ep.title} fill className="object-cover group-hover:scale-105 transition-transform" unoptimized />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                            <Play className="text-white fill-white" size={20} />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="text-white font-medium group-hover:text-red-400 transition-colors">
                              {show.category !== "movie" && (
                                <span className="text-gray-500 text-sm mr-2">E{ep.episode_number}</span>
                              )}
                              {ep.title}
                            </h4>
                            <span className="shrink-0 flex items-center gap-1 text-xs text-gray-500">
                              <Clock size={12} />
                              {fmt(ep.duration)}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm mt-1 line-clamp-2">{ep.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
