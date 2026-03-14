"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Radio } from "lucide-react";

const HLS_URL =
  "https://live-streaming.dpgmedia.net/hln-live-srt-mdai62ncqonw1qi0ec81tgeti80mtf/index_720.m3u8";

export default function LiveBanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [useFallbackVideo, setUseFallbackVideo] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: import("hls.js").default | null = null;
    let interval: ReturnType<typeof setInterval>;

    const captureFrame = () => {
      const canvas = canvasRef.current;
      if (!canvas || !video || video.readyState < 2) return;
      canvas.width = video.videoWidth || 1280;
      canvas.height = video.videoHeight || 720;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      try {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
        setThumbnail(dataUrl);
      } catch {
        setUseFallbackVideo(true);
        clearInterval(interval);
      }
    };

    async function init() {
      const Hls = (await import("hls.js")).default;
      if (Hls.isSupported()) {
        hls = new Hls({ enableWorker: true });
        hls.loadSource(HLS_URL);
        hls.attachMedia(video!);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          setReady(true);
          video!.play().catch(() => {});
          setTimeout(captureFrame, 2000);
          interval = setInterval(captureFrame, 10000);
        });
      } else if (video?.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = HLS_URL;
        video.addEventListener("loadedmetadata", () => {
          setReady(true);
          video!.play().catch(() => {});
          setTimeout(captureFrame, 2000);
          interval = setInterval(captureFrame, 10000);
        });
      }
    }

    init();
    return () => {
      clearInterval(interval);
      hls?.destroy();
    };
  }, []);

  return (
    <div className="mx-4 sm:mx-6 lg:mx-8">
      <Link href="/live" className="block group">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a0535] via-[#0e0118] to-[#1a0535] border border-[#2d1050] group-hover:border-red-500/40 transition-colors">
          <div className="flex items-center gap-5 sm:gap-7 px-6 sm:px-8 py-6 sm:py-8">

            {/* Left: live preview */}
            <div className="shrink-0 w-36 sm:w-52 lg:w-64">
              <div className="relative rounded-xl overflow-hidden aspect-video bg-[#0e0118] border border-white/10 shadow-2xl shadow-black/60 group-hover:border-red-500/30 transition-colors">

                {/* Hidden video for frame capture */}
                <video
                  ref={videoRef}
                  className={useFallbackVideo ? "absolute inset-0 w-full h-full object-cover" : "hidden"}
                  muted
                  playsInline
                />
                <canvas ref={canvasRef} className="hidden" />

                {/* Canvas screenshot */}
                {thumbnail && !useFallbackVideo && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={thumbnail}
                    alt="HLN Live preview"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}

                {/* Loading spinner */}
                {!ready && !thumbnail && !useFallbackVideo && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}

                {/* Live dot overlay on preview */}
                <div className="absolute top-1.5 left-1.5 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-1.5 py-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-white text-[10px] font-bold">LIVE</span>
                </div>
              </div>
            </div>

            {/* Right: copy */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-3">
                <span className="flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  LIVE
                </span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <Radio size={16} className="text-red-500 shrink-0" />
                <h3 className="text-white text-lg sm:text-xl font-black">HLN Live</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Volg het laatste nieuws live — rechtstreeks en non-stop.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-red-600 group-hover:bg-red-500 text-white text-sm font-bold rounded-full transition-colors shadow-lg shadow-red-900/30">
                Kijk nu live
              </div>
            </div>

          </div>
        </div>
      </Link>
    </div>
  );
}
