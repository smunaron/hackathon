import { getFeaturedShow, getAllShows, getShowsByCategory, getGenreGroups, getFirstEpisode } from "@/lib/data";
import HeroBanner from "@/components/HeroBanner";
import ShowCarousel from "@/components/ShowCarousel";
import VibeSearchSpotlight from "@/components/VibeSearchSpotlight";
import LiveBanner from "@/components/LiveBanner";

export default function HomePage() {
  const featured = getFeaturedShow();
  const allShows = getAllShows();
  const series = getShowsByCategory("series");
  const movies = getShowsByCategory("movie");
  const genreGroups = getGenreGroups();

  const topGenres = Object.entries(genreGroups)
    .filter(([, items]) => items.length >= 2)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 3);

  const firstEpisodeId = featured ? getFirstEpisode(featured.id)?.id : undefined;

  return (
    <div>
      {featured && <HeroBanner show={featured} firstEpisodeId={firstEpisodeId} />}
      <div className="mt-8 space-y-10 pb-10">
        <ShowCarousel title="Alle titels" shows={allShows} />
        <LiveBanner />
        {series.length > 0 && <ShowCarousel title="Series" shows={series} />}
        <VibeSearchSpotlight />
        {movies.length > 0 && <ShowCarousel title="Films" shows={movies} />}
        {topGenres.map(([genre, shows]) => (
          <ShowCarousel key={genre} title={genre} shows={shows} />
        ))}
      </div>
    </div>
  );
}
