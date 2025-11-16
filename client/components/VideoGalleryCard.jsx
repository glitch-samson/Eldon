import { useState, useRef } from "react";
import { Play, Pause, Download } from "lucide-react";

export function VideoGalleryCard({ video, onDownload }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .catch((err) => console.error("Playback failed:", err));
      setIsPlaying(true);
    }
  };

  const handleDownload = (e) => {
    e.stopPropagation();
    if (onDownload) onDownload(video);
    else {
      fetch(video.src)
        .then((res) => res.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          const extension = video.src.split(".").pop().split("?")[0];
          a.download = `${video.caption || video._id || "video"}.${extension}`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        })
        .catch((err) => console.error("Download failed:", err));
    }
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      <div
        className="group relative cursor-pointer bg-black"
        style={{ width: "100%", height: "200px" }} // visible video height
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src={video.src}
          className="w-full h-full object-cover"
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

        {/* Buttons */}
        <div className="absolute bottom-2 right-2 flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="p-1.5 rounded-full bg-white/90 hover:bg-purple-600 text-gray-700 hover:text-white transition-all duration-200 hover:scale-110 shadow-md"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button
            onClick={handleDownload}
            className="p-1.5 rounded-full bg-white/90 hover:bg-rose-500 text-gray-700 hover:text-white transition-all duration-200 hover:scale-110 shadow-md"
            title="Download"
          >
            <Download size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
