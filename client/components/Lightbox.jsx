import { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  ZoomOut,
  Download,
} from "lucide-react";

export function Lightbox({ image, images, onClose, onNext, onPrev }) {
  const [zoom, setZoom] = useState(1);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const lightboxRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrev]);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    setTouchEnd(e.changedTouches[0].clientX);
    if (touchStart - touchEnd > 75) {
      onNext();
    } else if (touchEnd - touchStart > 75) {
      onPrev();
    }
  };

  const handleDownload = () => {
    if (image) {
      const link = document.createElement("a");
      link.href = image.src;
      link.download = `wedding-photo-${image.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!image) return null;

  const currentIndex = images.findIndex((img) => img.id === image.id);

  return (
    <div
      ref={lightboxRef}
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
        aria-label="Close"
      >
        <X size={24} />
      </button>

      {/* Image Container */}
      <div
        className="flex items-center justify-center max-h-[90vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.src}
          alt={image.alt}
          style={{ transform: `scale(${zoom})` }}
          className="max-h-[85vh] max-w-[85vw] object-contain rounded-lg transition-transform"
        />
      </div>

      {/* Navigation Arrows */}
      {currentIndex > 0 && (
        <button
          onClick={onPrev}
          className="absolute left-4 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
          aria-label="Previous"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {currentIndex < images.length - 1 && (
        <button
          onClick={onNext}
          className="absolute right-4 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
          aria-label="Next"
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* Controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-lg p-2">
        {/* Zoom Controls */}
        <button
          onClick={() => setZoom(Math.max(1, zoom - 0.2))}
          className="p-2 rounded-md hover:bg-white/20 transition-colors text-white"
          aria-label="Zoom out"
        >
          <ZoomOut size={20} />
        </button>

        <span className="text-white text-sm min-w-[3rem] text-center">
          {Math.round(zoom * 100)}%
        </span>

        <button
          onClick={() => setZoom(Math.min(3, zoom + 0.2))}
          className="p-2 rounded-md hover:bg-white/20 transition-colors text-white"
          aria-label="Zoom in"
        >
          <ZoomIn size={20} />
        </button>

        <div className="w-px h-6 bg-white/20 mx-1"></div>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          className="p-2 rounded-md hover:bg-white/20 transition-colors text-white"
          aria-label="Download"
        >
          <Download size={20} />
        </button>
      </div>

      {/* Image Info */}
      {image.caption && (
        <div className="absolute top-16 left-4 right-4 bg-white/10 backdrop-blur-md rounded-lg p-3 text-white max-w-md">
          <p className="text-sm">{image.caption}</p>
        </div>
      )}

      {/* Image Counter */}
      <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md rounded-lg px-3 py-2 text-white text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
