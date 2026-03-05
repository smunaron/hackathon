import Link from "next/link";
import { VIBES } from "@/lib/vibes";
import { Sparkles } from "lucide-react";

export default function VibeSearchSpotlight() {
  const preview = VIBES.slice(0, 4);

  return (
    <div className="mx-4 sm:mx-6 lg:mx-8 rounded-3xl overflow-hidden bg-gradient-to-br from-[#1a0535] via-[#0e0118] to-[#1a0535] border border-[#2d1050]">
      <div className="px-6 py-8 sm:px-10 sm:py-10 flex flex-col lg:flex-row lg:items-center gap-8">

        {/* Left: copy */}
        <div className="flex-1 min-w-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-600/20 border border-pink-500/30 text-pink-400 text-xs font-semibold mb-4">
            <Sparkles size={12} />
            Nieuw
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3 leading-tight">
            Weet je niet wat je<br className="hidden sm:block" /> wil kijken vanavond?
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-md">
            Kies een stemming en laat MuniStream voor jou beslissen. Van donker & spannend
            tot lachen & luchtig — jij kiest de vibe, wij de titels.
          </p>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-6 py-3 bg-pink-600 hover:bg-pink-500 text-white text-sm font-bold rounded-full transition-colors shadow-lg shadow-pink-600/30"
          >
            <Sparkles size={15} />
            Zoek op vibe
          </Link>
        </div>

        {/* Right: vibe preview cards */}
        <div className="grid grid-cols-2 gap-2 lg:w-80 shrink-0">
          {preview.map((vibe) => (
            <Link
              key={vibe.id}
              href="/search"
              className={`bg-gradient-to-br ${vibe.gradient} border border-white/5 hover:border-pink-500/40 rounded-2xl p-4 transition-all hover:scale-[1.02] group`}
            >
              <span className="text-2xl block mb-1.5">{vibe.emoji}</span>
              <p className="text-white text-xs font-bold leading-tight group-hover:text-pink-200 transition-colors">
                {vibe.label}
              </p>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
