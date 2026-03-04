"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ReactPlayer = dynamic(() => import("react-player").then((mod) => mod.default), { ssr: false }) as any;

interface VideoPlayerProps {
  src: string;
  title: string;
  episodeId: string;
}

export default function VideoPlayer({ src }: VideoPlayerProps) {
  const [ready, setReady] = useState(false);

  return (
    <div className="w-full aspect-video bg-black relative">
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-pink-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-gray-400 text-sm">Laden...</span>
          </div>
        </div>
      )}
      <ReactPlayer
        src={src}
        width="100%"
        height="100%"
        playing
        muted
        controls
        onReady={() => setReady(true)}
      />
    </div>
  );
}
