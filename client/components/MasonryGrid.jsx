import { useState, useEffect } from "react";
import { ImageCard } from "./ImageCard";

export function MasonryGrid({
  images,
  onPreview,
  onDownload,
  selectedImages = new Set(),
  onSelectImage,
}) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const columnCount = isMobile ? 2 : "auto";
  const columnWidth = isMobile ? "1fr" : "300px";

  return (
    <div
      className="w-full"
      style={
        isMobile
          ? {
              display: "grid",
              gridTemplateColumns: `repeat(${columnCount}, ${columnWidth})`,
              gap: "1rem",
            }
          : {
              columnCount: "auto",
              columnWidth: "300px",
              columnGap: "1rem",
            }
      }
    >
      {images.map((image) => (
        <div
          key={image._id}
          className={isMobile ? "" : "mb-4 break-inside-avoid"}
          style={
            isMobile
              ? {}
              : {
                  breakInside: "avoid",
                }
          }
        >
          <ImageCard
            image={image}
            onPreview={onPreview}
            onDownload={onDownload}
            isSelected={selectedImages.has(image._id)}
            onSelect={onSelectImage ? () => onSelectImage(image._id) : undefined}
          />
        </div>
      ))}
    </div>
  );
}
