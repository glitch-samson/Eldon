import { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Download,
  Play,
  Pause,
} from "lucide-react";

export function VideoLightbox({
  video,
  videos,
  onClose,
  onNext,
  onPrev,
  onDownload,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const lightboxRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === " ") {
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrev]);

  const togglePlay = () => {
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

  const handleDownload = () => {
    if (video && onDownload) {
      onDownload(video);
    } else if (video) {
      const url = video.url || video.src;
      const link = document.createElement("a");
      link.href = url;
      const extension = url.split(".").pop().split("?")[0];
      link.download = `${video.caption || video._id || "video"}.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!video) return null;

  const currentIndex = videos.findIndex((v) => v._id === video._id);
  const videoUrl = video.url || video.src;

  return (
    <div
      ref={lightboxRef}
      className="fixed inset-0 bg-black/95 flex items-center justify-center z-50"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 h-10 w-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white z-10"
        aria-label="Close"
      >
        <X size={24} />
      </button>

      {/* Video Container */}
      <div
        className="flex items-center justify-center max-h-[90vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          src={videoUrl}
          className="max-h-[85vh] max-w-[85vw] rounded-lg"
          controls
          autoPlay
          loop
          playsInline
        />
      </div>

      {/* Navigation Arrows */}
      {currentIndex > 0 && (
        <button
          onClick={onPrev}
          className="absolute left-4 h-12 w-12 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
          aria-label="Previous"
        >
          <ChevronLeft size={28} />
        </button>
      )}

      {currentIndex < videos.length - 1 && (
        <button
          onClick={onNext}
          className="absolute right-4 h-12 w-12 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
          aria-label="Next"
        >
          <ChevronRight size={28} />
        </button>
      )}

      {/* Controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white/10 backdrop-blur-md rounded-lg p-1">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="h-10 w-10 flex items-center justify-center rounded-md hover:bg-white/20 transition-colors text-white"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        <div className="w-px h-6 bg-white/20 mx-1"></div>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          className="h-10 w-10 flex items-center justify-center rounded-md hover:bg-white/20 transition-colors text-white"
          aria-label="Download"
        >
          <Download size={20} />
        </button>
      </div>

      {/* Video Info */}
      {video.caption && (
        <div className="absolute top-16 left-4 right-4 bg-white/10 backdrop-blur-md rounded-lg p-3 text-white max-w-md">
          <p className="text-sm">{video.caption}</p>
        </div>
      )}

      {/* Video Counter */}
      <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md rounded-lg px-3 py-2 text-white text-sm">
        {currentIndex + 1} / {videos.length}
      </div>
    </div>
  );
}
