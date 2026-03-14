import LivePlayer from "@/components/LivePlayer";
import { Radio } from "lucide-react";

export default function LivePage() {
  return (
    <div className="pt-20 min-h-screen bg-[#07000f]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-2 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            LIVE
          </div>
          <h1 className="text-2xl font-black text-white">HLN Live</h1>
        </div>

        {/* Player */}
        <LivePlayer />

        {/* Info */}
        <div className="mt-6 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shrink-0">
            <Radio size={18} className="text-white" />
          </div>
          <div>
            <p className="text-white font-semibold">HLN Live</p>
            <p className="text-gray-400 text-sm mt-0.5">
              Volg het laatste nieuws live via HLN. Non-stop actueel nieuws, rechtstreeks van HLN.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
