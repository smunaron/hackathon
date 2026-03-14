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
        // CORS blocks toDataURL — fall back to showing the video element
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
          // First capture after a short delay, then every 10s
          setTimeout(captureFrame, 2000);
          interval = setInterval(captureFrame, 10000);
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = HLS_URL;
        video.addEventListener("loadedmetadata", () => {
          setReady(true);
          video.play().catch(() => {});
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
        <div className="relative rounded-2xl overflow-hidden bg-[#0e0118] border border-[#2d1050] aspect-video sm:aspect-[21/6] min-h-[140px]">

          {/* Hidden video + canvas for frame capture */}
          <video
            ref={videoRef}
            className={useFallbackVideo ? "absolute inset-0 w-full h-full object-cover" : "hidden"}
            muted
            playsInline
          />
          <canvas ref={canvasRef} className="hidden" />

          {/* Thumbnail from canvas */}
          {thumbnail && !useFallbackVideo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={thumbnail}
              alt="HLN Live preview"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {/* Loading state */}
          {!ready && !thumbnail && !useFallbackVideo && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1a0535] to-[#0e0118]">
              <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Dark overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center px-6 sm:px-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  LIVE
                </span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <Radio size={16} className="text-red-500 shrink-0" />
                <h3 className="text-white text-lg sm:text-xl font-black">HLN Live</h3>
              </div>
              <p className="text-gray-300 text-sm max-w-xs leading-relaxed">
                Volg het laatste nieuws live — rechtstreeks en non-stop.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 group-hover:bg-red-500 text-white text-sm font-bold rounded-full transition-colors">
                Kijk nu live
              </div>
            </div>
          </div>

          {/* Hover border glow */}
          <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-red-500/40 transition-colors pointer-events-none" />
        </div>
      </Link>
    </div>
  );
}
