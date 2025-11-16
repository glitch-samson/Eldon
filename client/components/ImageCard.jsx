import { Download, Eye, Check } from "lucide-react";

export function ImageCard({
  image,
  onPreview,
  onDownload,
  isSelected = false,
  onSelect,
}) {
  return (
    <div
      className={`rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
        isSelected ? "ring-4 ring-blue-900" : ""
      }`}
    >
      {/* Image Container */}
      <div
        className={`group relative overflow-hidden bg-gray-100 cursor-pointer`}
        onClick={() => onPreview(image)}
      >
        {/* Image */}
        <img
          src={image.url}
          alt={image.caption || "Wedding photo"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Selection Checkbox */}
        {onSelect && (
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

        {/* Icon Buttons at Bottom Right */}
        <div className="absolute bottom-2 right-2 flex items-center gap-2 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPreview(image);
            }}
            className="p-1.5 rounded-full bg-white/90 hover:bg-blue-900 text-gray-700 hover:text-white transition-all duration-200 hover:scale-110 shadow-md"
            aria-label="Preview image"
            title="Preview"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onDownload(image);
            }}
            className="p-1.5 rounded-full bg-white/90 hover:bg-amber-600 text-gray-700 hover:text-white transition-all duration-200 hover:scale-110 shadow-md"
            aria-label="Download image"
            title="Download"
          >
            <Download size={16} />
          </button>
        </div>
      </div>

      {/* Caption Below Image */}
      {image.caption && (
        <div className="px-3 py-3 bg-white">
          <p className="text-sm text-gray-700">{image.caption}</p>
        </div>
      )}
    </div>
  );
}
