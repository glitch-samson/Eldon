import { ImageCard } from "./ImageCard";

export function MasonryGrid({
  images,
  onPreview,
  onDownload,
  selectedImages = new Set(),
  onSelectImage,
}) {
  return (
    <div
      className="w-full"
      style={{
        columnCount: "auto",
        columnWidth: "300px",
        columnGap: "1rem",
      }}
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
