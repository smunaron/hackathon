"use client";

import { useEffect, useRef, useState } from "react";
import { Radio, Volume2, VolumeX, Maximize } from "lucide-react";

const HLS_URL =
  "https://live-streaming.dpgmedia.net/hln-live-srt-mdai62ncqonw1qi0ec81tgeti80mtf/index_720.m3u8";

export default function LivePlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: import("hls.js").default | null = null;

    async function init() {
      const Hls = (await import("hls.js")).default;
      if (Hls.isSupported()) {
        hls = new Hls({ enableWorker: true });
        hls.loadSource(HLS_URL);
        hls.attachMedia(video!);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          setReady(true);
          video!.play().catch(() => {
            // Autoplay blocked, user must click
          });
        });
        hls.on(Hls.Events.ERROR, (_e, data) => {
          if (data.fatal) setError(true);
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // Native HLS (Safari)
        video.src = HLS_URL;
        video.addEventListener("loadedmetadata", () => {
          setReady(true);
          video.play().catch(() => {});
        });
      } else {
        setError(true);
      }
    }

    init();
    return () => { hls?.destroy(); };
  }, []);

  const toggleFullscreen = () => {
    const el = videoRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen();
  };

  return (
    <div className="relative w-full bg-black rounded-2xl overflow-hidden aspect-video group">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted={muted}
        playsInline
      />

      {/* Loading overlay */}
      {!ready && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0e0118]">
          <div className="w-10 h-10 border-2 border-red-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-400 text-sm">Stream wordt geladen…</p>
        </div>
      )}

      {/* Error overlay */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0e0118]">
          <Radio size={40} className="text-gray-600 mb-3" />
          <p className="text-white font-semibold mb-1">Stream niet beschikbaar</p>
          <p className="text-gray-400 text-sm">Probeer het later opnieuw.</p>
        </div>
      )}

      {/* Controls overlay */}
      {ready && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              LIVE
            </span>
            <span className="text-white text-sm font-semibold">HLN Live</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMuted((m) => !m)}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <Maximize size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
