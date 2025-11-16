import { useState, useRef } from "react";
import { Play, Pause, Download, Check } from "lucide-react";

export function VideoGalleryCard({
  video,
  onDownload,
  onPreview,
  isSelected = false,
  onSelect,
  showActions = true,
}) {
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
      const url = video.url || video.src;
      fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          const urlObj = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = urlObj;
          const extension = url.split(".").pop().split("?")[0];
          a.download = `${video.caption || video._id || "video"}.${extension}`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(urlObj);
        })
        .catch((err) => console.error("Download failed:", err));
    }
  };

  return (
    <div
      className={`rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
        isSelected ? "ring-4 ring-blue-900" : ""
      }`}
    >
      <div
        className="group relative cursor-pointer bg-black"
        style={{ width: "100%", height: "200px" }}
        onClick={() => {
          if (onPreview) onPreview(video);
          else togglePlay();
        }}
      >
        <video
          ref={videoRef}
          src={video.url || video.src}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Selection Checkbox */}
        {onSelect && showActions && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className={`absolute top-2 left-2 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
              isSelected
                ? "bg-blue-900 border-blue-900"
                : "bg-white/80 border-white hover:bg-white"
            }`}
            aria-label={isSelected ? "Deselect" : "Select"}
          >
            {isSelected && <Check size={12} className="text-white" />}
          </button>
        )}

        {/* Buttons */}
        {showActions && (
          <div className="absolute bottom-2 right-2 flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onPreview) onPreview(video);
                else togglePlay();
              }}
              className="h-10 w-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-blue-900 text-gray-700 hover:text-white transition-all duration-200 hover:scale-110 shadow-md"
              title={onPreview ? "Preview" : isPlaying ? "Pause" : "Play"}
            >
              {onPreview ? <Play size={18} /> : isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <button
              onClick={handleDownload}
              className="h-10 w-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-amber-600 text-gray-700 hover:text-white transition-all duration-200 hover:scale-110 shadow-md"
              title="Download"
            >
              <Download size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Caption Below Video */}
      {video.caption && (
        <div className="px-3 py-3 bg-white">
          <p className="text-sm text-gray-700">{video.caption}</p>
        </div>
      )}
    </div>
  );
}
