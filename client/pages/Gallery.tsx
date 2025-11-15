import { useState } from "react";
import { Navigation } from "../components/Navigation";
import { Lightbox } from "../components/Lightbox";
import { MasonryGrid } from "../components/MasonryGrid";
import { images, Image } from "../data/images";
import { Download, X } from "lucide-react";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());

  const filteredImages = images;

  const handleSelectImage = (imageId: string) => {
    const newSelected = new Set(selectedImages);
    if (newSelected.has(imageId)) {
      newSelected.delete(imageId);
    } else {
      newSelected.add(imageId);
    }
    setSelectedImages(newSelected);
  };

  const handleDownload = (image: Image) => {
    const link = document.createElement("a");
    link.href = image.src;
    link.download = `wedding-photo-${image.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadSelected = () => {
    selectedImages.forEach((imageId) => {
      const image = filteredImages.find((img) => img.id === imageId);
      if (image) {
        setTimeout(() => handleDownload(image), 100);
      }
    });
    setSelectedImages(new Set());
  };

  const handleClearSelection = () => {
    setSelectedImages(new Set());
  };

  const handleNext = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(
      (img) => img.id === selectedImage.id
    );
    if (currentIndex < filteredImages.length - 1) {
      setSelectedImage(filteredImages[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(
      (img) => img.id === selectedImage.id
    );
    if (currentIndex > 0) {
      setSelectedImage(filteredImages[currentIndex - 1]);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white via-gold-50 to-white min-h-screen">
      <Navigation />

      {/* Header */}
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-200/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-serif font-bold text-gray-900 mb-4">
            Our Gallery
          </h1>
          <p className="text-xl text-gray-600 font-light">
            Every moment is precious. Discover our wedding day through these
            beautiful photographs.
          </p>
        </div>
      </section>

      {/* Image Count & Selection Toolbar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-gray-600">
            Showing {filteredImages.length} photo{filteredImages.length !== 1 ? "s" : ""}
          </p>

          {selectedImages.size > 0 && (
            <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {selectedImages.size} photo{selectedImages.size !== 1 ? "s" : ""} selected
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDownloadSelected}
                  className="flex items-center gap-2 bg-gold-600 hover:bg-gold-700 text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm"
                >
                  <Download size={16} />
                  Download All
                </button>
                <button
                  onClick={handleClearSelection}
                  className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors font-medium text-sm"
                >
                  <X size={16} />
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {filteredImages.length > 0 ? (
          <MasonryGrid
            images={filteredImages}
            onPreview={setSelectedImage}
            onDownload={handleDownload}
            selectedImages={selectedImages}
            onSelectImage={handleSelectImage}
          />
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">
              No photos available yet.
            </p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <p>&copy; 2024 Sarah & James. All rights reserved.</p>
        </div>
      </footer>

      <Lightbox
        image={selectedImage}
        images={filteredImages}
        onClose={() => setSelectedImage(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
}
