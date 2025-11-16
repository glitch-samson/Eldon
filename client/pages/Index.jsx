import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import { Lightbox } from "../components/Lightbox";
import { MasonryGrid } from "../components/MasonryGrid";
import { ChevronRight } from "lucide-react";
import { mediaApi } from "../lib/api";

export default function Index() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [allMedia, setAllMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setIsLoading(true);
        const response = await mediaApi.getAll({ limit: 100, type: "image" });
        setAllMedia(response.media || []);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch media:", err);
        setError(err.message);
        setAllMedia([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMedia();
  }, []);

  const previewImages = allMedia.slice(0, 6);

  const handleDownload = (image) => {
    const link = document.createElement("a");
    link.href = image.url;
    link.download = `wedding-photo-${image._id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleNext = () => {
    if (!selectedImage) return;
    const currentIndex = allMedia.findIndex(
      (img) => img._id === selectedImage._id,
    );
    if (currentIndex < allMedia.length - 1) {
      setSelectedImage(allMedia[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (!selectedImage) return;
    const currentIndex = allMedia.findIndex(
      (img) => img._id === selectedImage._id,
    );
    if (currentIndex > 0) {
      setSelectedImage(allMedia[currentIndex - 1]);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white via-purple-50 to-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-200/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-block">
            <span className="text-purple-600 font-serif text-lg tracking-widest uppercase">
              Our Wedding
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold text-gray-900 mb-6 leading-tight">
            Eldon and Geraldine
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 font-light mb-8 max-w-2xl mx-auto">
            A celebration of love, joy, and new beginnings. Join us as we share
            our most precious moments.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/gallery"
              className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              View Gallery
              <ChevronRight size={20} />
            </Link>
          </div>

          {/* Hero Image Preview */}
          <div className="relative">
            {isLoading ? (
              <div className="w-full max-w-lg mx-auto rounded-xl shadow-2xl object-cover aspect-[4/5] bg-gray-200 animate-pulse" />
            ) : (
              <>
                <img
                  src={allMedia[0]?.url}
                  alt="Wedding hero"
                  className="w-full max-w-lg mx-auto rounded-xl shadow-2xl object-cover aspect-[4/5] hover:shadow-3xl transition-shadow"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent" />
              </>
            )}
          </div>
        </div>
      </section>

      {/* Featured Gallery Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 mb-4">
            Gallery Preview
          </h2>
          <p className="text-xl text-gray-600 font-light">
            A glimpse of our special day
          </p>
        </div>

        <MasonryGrid
          images={previewImages}
          onPreview={setSelectedImage}
          onDownload={handleDownload}
        />

        <div className="flex justify-center mt-16">
          <Link
            to="/gallery"
            className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            View Full Gallery
            <ChevronRight size={20} />
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-purple-600 to-rose-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-serif font-bold mb-2">
                {allMedia.length}+
              </div>
              <p className="text-lg font-light">Beautiful Moments</p>
            </div>
            <div>
              <div className="text-4xl font-serif font-bold mb-2">2</div>
              <p className="text-lg font-light">Happy People</p>
            </div>
            <div>
              <div className="text-4xl font-serif font-bold mb-2">1</div>
              <p className="text-lg font-light">Magical Day</p>
            </div>
          </div>
        </div>
      </section>

      <Lightbox
        image={selectedImage}
        images={allMedia}
        onClose={() => setSelectedImage(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
}
