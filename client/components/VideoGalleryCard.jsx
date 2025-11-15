import { useState } from "react";
import { Play, Pause, Download } from "lucide-react";

export function VideoGalleryCard({ video }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Video Container */}
      <div
        className="group relative overflow-hidden bg-gray-900 cursor-pointer"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {/* Video */}
        <video
          src={video.src}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Caption */}
        {video.caption && (
          <div className="absolute bottom-12 left-0 right-0 px-3 py-2 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="line-clamp-2">{video.caption}</p>
          </div>
        )}

        {/* Icon Buttons at Bottom Right */}
        <div className="absolute bottom-2 right-2 flex items-center gap-2 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsPlaying(!isPlaying);
            }}
            className="p-1.5 rounded-full bg-white/90 hover:bg-purple-600 text-gray-700 hover:text-white transition-all duration-200 hover:scale-110 shadow-md"
            aria-label={isPlaying ? "Pause video" : "Play video"}
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="p-1.5 rounded-full bg-white/90 hover:bg-rose-500 text-gray-700 hover:text-white transition-all duration-200 hover:scale-110 shadow-md"
            aria-label="Download video"
            title="Download"
          >
            <Download size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
