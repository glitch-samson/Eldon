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
    <div className="bg-white">
      <Navigation />

      {/* Hero Section - Asymmetrical Modern Design */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-gradient-to-br from-white via-amber-50/20 to-blue-50/10">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-300/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-blue-900/5 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-64 h-64 border border-blue-200/20 rounded-full blur-2xl" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="flex flex-col justify-center space-y-8 lg:pr-8">
              <div className="space-y-2">
                <div className="inline-block">
                  <span className="text-blue-900 font-serif text-xs sm:text-sm tracking-widest uppercase font-semibold">
                    ✦ Our Love Story
                  </span>
                </div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-gray-900 leading-tight">
                  <span className="block">Eldon</span>
                  <span className="block">
                    <span className="text-transparent bg-gradient-to-r from-blue-900 via-amber-500 to-amber-300 bg-clip-text">
                      &
                    </span>
                  </span>
                  <span className="block">Geraldine</span>
                </h1>
              </div>

              <div className="space-y-6">
                <p className="text-lg sm:text-xl text-gray-600 font-light leading-relaxed max-w-md">
                  A celebration of love, joy, and new beginnings. Join us as we
                  share our most precious moments.
                </p>

                <div className="pt-4 border-t border-blue-200/30">
                  <p className="text-sm text-blue-900 font-medium tracking-wide mb-4">
                    EXPLORE OUR JOURNEY
                  </p>
                  <Link
                    to="/gallery"
                    className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-900 to-amber-500 hover:from-blue-800 hover:to-amber-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group text-base"
                  >
                    View Gallery
                    <ChevronRight
                      size={20}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-blue-200/30">
                <div>
                  <p className="text-2xl sm:text-3xl font-serif font-bold text-blue-900">
                    {allMedia.length}+
                  </p>
                  <p className="text-xs text-gray-600 mt-1">Moments Captured</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-serif font-bold text-amber-600">
                    2
                  </p>
                  <p className="text-xs text-gray-600 mt-1">Hearts United</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-serif font-bold text-blue-900">
                    ∞
                  </p>
                  <p className="text-xs text-gray-600 mt-1">Forever</p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative lg:h-screen lg:-mr-8 lg:-my-20">
              {isLoading ? (
                <div className="rounded-3xl shadow-2xl overflow-hidden">
                  <div className="w-full aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse rounded-3xl" />
                </div>
              ) : (
                <div className="relative h-full min-h-96 lg:min-h-full">
                  <img
                    src={allMedia[0]?.url}
                    alt="Wedding hero"
                    className="w-full h-full rounded-3xl shadow-2xl object-cover hover:shadow-3xl transition-all duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-900 to-amber-400 rounded-full opacity-20 blur-2xl" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="relative bg-gradient-to-br from-blue-50/20 via-white to-amber-50/20 py-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 -right-64 w-96 h-96 bg-blue-900/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-64 w-80 h-80 bg-amber-300/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900">
              Thank You for Being Part of Our Story
            </h2>
            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
              Every photograph tells a story of love, laughter, and cherished
              memories. We're grateful to have shared this beautiful journey
              with you.
            </p>
            <div className="pt-8">
              <div className="inline-block px-8 py-1 border-2 border-blue-900/40 rounded-full">
                <p className="text-blue-900 font-serif text-lg">
                  Eldon & Geraldine
                </p>
              </div>
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
