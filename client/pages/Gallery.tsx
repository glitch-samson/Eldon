import { useState } from "react";
import { Navigation } from "../components/Navigation";
import { Lightbox } from "../components/Lightbox";
import { MasonryGrid } from "../components/MasonryGrid";
import { images, Image } from "../data/images";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const filteredImages = images;

  const handleDownload = (image: Image) => {
    const link = document.createElement("a");
    link.href = image.src;
    link.download = `wedding-photo-${image.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

      {/* Image Count */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center">
          <p className="text-gray-600">
            Showing {filteredImages.length} photo{filteredImages.length !== 1 ? "s" : ""}
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {filteredImages.length > 0 ? (
          <MasonryGrid
            images={filteredImages}
            onPreview={setSelectedImage}
            onDownload={handleDownload}
          />
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">
              No photos in this category yet.
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
