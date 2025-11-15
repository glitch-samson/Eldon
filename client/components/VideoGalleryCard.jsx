import { useState } from "react";
import { Play, Pause, Download } from "lucide-react";

export function VideoGalleryCard({ video }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex flex-col rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Video Container */}
      <div
        className="group relative overflow-hidden bg-gray-900 cursor-pointer flex-1"
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
          <div className="absolute bottom-12 left-0 right-0 px-3 py-2 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="line-clamp-2">{video.caption}</p>
          </div>
        )}
      </div>

      {/* Icon Buttons Below */}
      <div className="flex items-center justify-center gap-3 p-3 bg-gray-800">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsPlaying(!isPlaying);
          }}
          className="p-2 rounded-full bg-gray-700 hover:bg-purple-600 text-gray-200 hover:text-white transition-all duration-200 hover:scale-110"
          aria-label={isPlaying ? "Pause video" : "Play video"}
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="p-2 rounded-full bg-gray-700 hover:bg-rose-500 text-gray-200 hover:text-white transition-all duration-200 hover:scale-110"
          aria-label="Download video"
          title="Download"
        >
          <Download size={20} />
        </button>
      </div>
    </div>
  );
}
