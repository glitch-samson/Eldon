import { useState, useEffect } from "react";
import { ImageCard } from "./ImageCard";

export function MasonryGrid({
  images,
  onPreview,
  onDownload,
  selectedImages = new Set(),
  onSelectImage,
  showActions = true,
}) {
  const [columnCount, setColumnCount] = useState(
    window.innerWidth < 640 ? 2 : window.innerWidth < 1024 ? 3 : 4
  );

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setColumnCount(2);
      else if (width < 1024) setColumnCount(3);
      else setColumnCount(4);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`w-full`}
      style={{
        columnCount: columnCount,
        columnGap: "1rem",
      }}
    >
      {images.map((image) => (
        <div
          key={image._id}
          className="mb-4 break-inside-avoid rounded-lg overflow-hidden"
        >
          <ImageCard
            image={image}
            onPreview={onPreview}
            onDownload={onDownload}
            isSelected={selectedImages.has(image._id)}
            onSelect={onSelectImage ? () => onSelectImage(image._id) : undefined}
            showActions={showActions}
          />
        </div>
      ))}
    </div>
  );
}
