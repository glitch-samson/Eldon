import { Image } from "../data/images";
import { ImageCard } from "./ImageCard";

interface MasonryGridProps {
  images: Image[];
  onPreview: (image: Image) => void;
  onDownload: (image: Image) => void;
  selectedImages?: Set<string>;
  onSelectImage?: (imageId: string) => void;
}

export function MasonryGrid({
  images,
  onPreview,
  onDownload,
  selectedImages = new Set(),
  onSelectImage,
}: MasonryGridProps) {
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
            isSelected={selectedImages.has(image.id)}
            onSelect={onSelectImage ? () => onSelectImage(image.id) : undefined}
          />
        </div>
      ))}
    </div>
  );
}
