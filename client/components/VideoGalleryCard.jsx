import { useState } from "react";
import { Play, Pause } from "lucide-react";

export function VideoGalleryCard({ video }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div
      className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer bg-gray-900"
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

      {/* Play/Pause Button */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsPlaying(!isPlaying);
          }}
          className="flex items-center justify-center gap-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-md transition-colors font-medium text-sm"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? (
            <>
              <Pause size={16} />
              Pause
            </>
          ) : (
            <>
              <Play size={16} />
              Play
            </>
          )}
        </button>
      </div>
    </div>
  );
}
