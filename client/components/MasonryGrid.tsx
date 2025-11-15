import { Image } from "../data/images";
import { ImageCard } from "./ImageCard";

interface MasonryGridProps {
  images: Image[];
  onPreview: (image: Image) => void;
  onDownload: (image: Image) => void;
}

export function MasonryGrid({ images, onPreview, onDownload }: MasonryGridProps) {
  return (
    <div
      className="w-full"
      style={{
        columnCount: `auto`,
        columnWidth: "300px",
        columnGap: "1rem",
      } as React.CSSProperties}
    >
      {images.map((image) => (
        <div
          key={image.id}
          className="mb-4 break-inside-avoid"
          style={{
            breakInside: "avoid",
          }}
        >
          <ImageCard
            image={image}
            onPreview={onPreview}
            onDownload={onDownload}
          />
        </div>
      ))}
    </div>
  );
}
