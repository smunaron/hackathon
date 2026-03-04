import { getShowsByCategory } from "@/lib/data";
import ShowCard from "@/components/ShowCard";
import { Tv } from "lucide-react";

export default function ShowsPage() {
  const shows = getShowsByCategory("series");

  return (
    <div className="pt-24 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 mb-8">
        <Tv size={28} className="text-red-600" />
        <h1 className="text-2xl font-bold text-white">Series</h1>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {shows.map((show) => <ShowCard key={show.id} show={show} size="sm" />)}
      </div>
    </div>
  );
}
