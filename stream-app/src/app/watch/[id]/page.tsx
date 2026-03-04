import { getEpisodeById, getShowById, getEpisodesForShow, getRelatedShows } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import VideoPlayer from "@/components/VideoPlayer";
import ShowCard from "@/components/ShowCard";

export default async function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const episode = getEpisodeById(id);
  if (!episode) notFound();

  const show = getShowById(episode.show_id);
  if (!show) notFound();

  const allEpisodes = getEpisodesForShow(show.id);
  const related = getRelatedShows(show.id);

  return (
    <div className="pt-16 min-h-screen bg-black">
      <div className="relative w-full bg-black">
        <div className="absolute top-4 left-4 z-20">
          <Link
            href={`/shows/${show.id}`}
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full transition-colors"
          >
            <ArrowLeft size={16} />
            <span>{show.title}</span>
          </Link>
        </div>
        <VideoPlayer
          src={episode.video_url}
          title={`${show.title} — ${episode.title}`}
          episodeId={episode.id}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">{episode.title}</h1>
            <p className="text-sm text-gray-400 mt-1">
              <Link href={`/shows/${show.id}`} className="hover:text-red-400 transition-colors">
                {show.title}
              </Link>
              {show.category !== "movie" && (
                <span> · Seizoen {episode.season}, Aflevering {episode.episode_number}</span>
              )}
            </p>
            <p className="text-gray-300 mt-4 leading-relaxed">{episode.description}</p>
          </div>

          {show.category !== "movie" && allEpisodes.length > 1 && (
            <div className="lg:w-80 xl:w-96">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Volgende — {show.title}
              </h2>
              <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
                {allEpisodes.map((ep) => (
                  <Link
                    key={ep.id}
                    href={`/watch/${ep.id}`}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                      ep.id === id
                        ? "bg-red-600/20 border border-red-600/40"
                        : "bg-[#141420] hover:bg-[#1e1e2e] border border-[#1f1f2e]"
                    }`}
                  >
                    <span className="shrink-0 w-6 text-center text-xs text-gray-500">
                      {ep.episode_number}
                    </span>
                    <p className={`flex-1 text-sm font-medium truncate ${ep.id === id ? "text-red-400" : "text-gray-200"}`}>
                      {ep.title}
                    </p>
                    <span className="shrink-0 text-xs text-gray-500">{Math.floor(ep.duration / 60)}m</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-white mb-4">Meer om te bekijken</h2>
            <div className="flex gap-4 overflow-x-auto carousel-scroll pb-2">
              {related.map((s) => <ShowCard key={s.id} show={s} size="sm" />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
