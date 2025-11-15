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
      className={`flex flex-col rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
        isSelected ? "ring-4 ring-purple-500" : ""
      }`}
    >
      {/* Image Container */}
      <div
        className={`group relative overflow-hidden bg-gray-100 cursor-pointer flex-1`}
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

        {/* Selection Checkbox */}
        {onSelect && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className={`absolute top-3 left-3 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
              isSelected
                ? "bg-purple-600 border-purple-600"
                : "bg-white/80 border-white hover:bg-white"
            }`}
            aria-label={isSelected ? "Deselect" : "Select"}
          >
            {isSelected && <Check size={16} className="text-white" />}
          </button>
        )}

        {/* Caption */}
        {image.caption && (
          <div className="absolute bottom-12 left-0 right-0 px-3 py-2 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="line-clamp-2">{image.caption}</p>
          </div>
        )}
      </div>

      {/* Icon Buttons Below */}
      <div className="flex items-center justify-center gap-3 p-3 bg-white">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPreview(image);
          }}
          className="p-2 rounded-full bg-gray-100 hover:bg-purple-600 text-gray-700 hover:text-white transition-all duration-200 hover:scale-110"
          aria-label="Preview image"
          title="Preview"
        >
          <Eye size={20} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDownload(image);
          }}
          className="p-2 rounded-full bg-gray-100 hover:bg-rose-500 text-gray-700 hover:text-white transition-all duration-200 hover:scale-110"
          aria-label="Download image"
          title="Download"
        >
          <Download size={20} />
        </button>
      </div>
    </div>
  );
}
