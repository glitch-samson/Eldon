import { Play, Trash2 } from "lucide-react";

export function VideoCard({ video, onDelete }) {
  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all">
      {/* Video Thumbnail */}
      <div className="relative w-full aspect-square bg-gray-900 overflow-hidden">
        <video
          src={video.src}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          preload="metadata"
        />

        {/* Play Icon Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
            <Play size={24} className="text-white fill-white" />
          </div>
        </div>

        {/* Delete Button */}
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(video.id);
            }}
            className="absolute top-2 right-2 p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors opacity-0 group-hover:opacity-100"
            title="Delete video"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-xs text-gray-500">ID: {video.id}</p>
        <p
          className="text-xs text-gray-700 line-clamp-2 mt-1"
          title={video.caption}
        >
          {video.caption || "No caption"}
        </p>
      </div>
    </div>
  );
}
