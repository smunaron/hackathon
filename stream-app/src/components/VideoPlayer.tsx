"use client";

import { useRef, useState } from "react";
import ReactPlayer from "react-player";

interface VideoPlayerProps {
  src: string;
  title: string;
  episodeId: string;
}

export default function VideoPlayer({ src, title }: VideoPlayerProps) {
  const [ready, setReady] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);

  return (
    <div className="w-full aspect-video bg-black relative">
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-gray-400 text-sm">Laden...</span>
          </div>
        </div>
      )}
      <ReactPlayer
        ref={playerRef}
        url={src}
        width="100%"
        height="100%"
        playing
        controls
        onReady={() => setReady(true)}
        config={{
          file: {
            attributes: {
              title,
              controlsList: "nodownload",
            },
          },
        }}
      />
    </div>
  );
}
