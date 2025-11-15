import { Download, Eye } from "lucide-react";
import { Image } from "../data/images";

interface ImageCardProps {
  image: Image;
  onPreview: (image: Image) => void;
  onDownload: (image: Image) => void;
}

export function ImageCard({ image, onPreview, onDownload }: ImageCardProps) {
  return (
    <div
      className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer bg-gray-100"
      onClick={() => onPreview(image)}
    >
      {/* Image */}
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Caption */}
      {image.caption && (
        <div className="absolute bottom-12 left-0 right-0 px-3 py-2 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="line-clamp-2">{image.caption}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-2 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPreview(image);
          }}
          className="flex-1 flex items-center justify-center gap-1 bg-gold-600 hover:bg-gold-700 text-white py-2 rounded-md transition-colors font-medium text-sm"
          aria-label="Preview image"
        >
          <Eye size={16} />
          Preview
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDownload(image);
          }}
          className="flex-1 flex items-center justify-center gap-1 bg-rose-500 hover:bg-rose-600 text-white py-2 rounded-md transition-colors font-medium text-sm"
          aria-label="Download image"
        >
          <Download size={16} />
          Download
        </button>
      </div>
    </div>
  );
}
