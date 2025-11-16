import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import { Lightbox } from "../components/Lightbox";
import { MasonryGrid } from "../components/MasonryGrid";
import { SkeletonGrid } from "../components/SkeletonGrid";
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

  const previewImages = allMedia.slice(0, 3);

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
    <div className="bg-gradient-to-br from-white via-blue-50 to-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-block">
            <span className="text-blue-900 font-serif text-lg tracking-widest uppercase">
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
              className="inline-flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-800 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors text-base sm:text-base h-12 sm:h-auto"
            >
              View Gallery
              <ChevronRight size={20} />
            </Link>
          </div>

          {/* Hero Image Preview */}
          <div className="relative w-full max-w-lg mx-auto">
            {isLoading ? (
              <div className="rounded-xl shadow-2xl overflow-hidden">
                <div className="w-full aspect-[4/5] bg-gray-100 animate-pulse rounded-xl" />
              </div>
            ) : (
              <>
                <img
                  src={allMedia[0]?.url}
                  alt="Wedding hero"
                  className="w-full rounded-xl shadow-2xl object-cover aspect-[4/5] hover:shadow-3xl transition-shadow"
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

        {isLoading ? (
          <SkeletonGrid count={3} />
        ) : (
          <>
            <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4">
              {previewImages.map((image, index) => (
                <div
                  key={image._id}
                  className={`h-fit ${index === 1 ? "md:col-span-2" : "md:col-span-1"}`}
                >
                  <div
                    className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer"
                    onClick={() => setSelectedImage(image)}
                  >
                    <div className="group relative overflow-hidden bg-gray-100">
                      <img
                        src={image.url}
                        alt={image.caption || "Wedding photo"}
                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    {image.caption && (
                      <div className="px-3 py-3 bg-white">
                        <p className="text-sm text-gray-700">{image.caption}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-16">
              <Link
                to="/gallery"
                className="inline-flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-800 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors text-base sm:text-base h-12 sm:h-auto"
              >
                View Full Gallery
                <ChevronRight size={20} />
              </Link>
            </div>
          </>
        )}
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-900 to-amber-600 text-white py-16">
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
