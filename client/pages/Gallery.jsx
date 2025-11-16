import { useState, useEffect } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Navigation } from "../components/Navigation";
import { Lightbox } from "../components/Lightbox";
import { VideoLightbox } from "../components/VideoLightbox";
import { MasonryGrid } from "../components/MasonryGrid";
import { SkeletonGrid } from "../components/SkeletonGrid";
import { VideoGalleryCard } from "../components/VideoGalleryCard";
import { Download, X } from "lucide-react";
import { mediaApi } from "../lib/api";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedImages, setSelectedImages] = useState(new Set());
  const [activeSection, setActiveSection] = useState("photos");
  const [allMedia, setAllMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setIsLoading(true);
        const response = await mediaApi.getAll({ limit: 100 });
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

  const images = allMedia.filter((m) => m.type === "image");
  const videos = allMedia.filter((m) => m.type === "video");
  const filteredImages = images;

  const handleSelectImage = (mediaId) => {
    const newSelected = new Set(selectedImages);
    if (newSelected.has(mediaId)) newSelected.delete(mediaId);
    else newSelected.add(mediaId);
    setSelectedImages(newSelected);
  };

  // Download single media file
  const handleDownload = async (media) => {
    try {
      const response = await fetch(media.url);
      const blob = await response.blob();
      const extension = media.url.split(".").pop().split("?")[0];
      const filename = `${media.caption || media._id || "media"}.${extension}`;
      saveAs(blob, filename);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  // Download selected files as ZIP
  const handleDownloadSelectedZip = async () => {
    if (selectedImages.size === 0) return;

    setIsDownloading(true);
    const zip = new JSZip();

    try {
      const selectedArray = Array.from(selectedImages);
      for (const mediaId of selectedArray) {
        const media = allMedia.find((m) => m._id === mediaId);
        if (!media) continue;

        const response = await fetch(media.url);
        const blob = await response.blob();
        const extension = media.url.split(".").pop().split("?")[0];
        const filename = `${media.caption || media._id || "media"}.${extension}`;
        zip.file(filename, blob);
      }

      const zipBlob = await zip.generateAsync({ type: "blob" });
      saveAs(zipBlob, `media-${new Date().toISOString().split("T")[0]}.zip`);
    } catch (err) {
      console.error("ZIP download failed:", err);
    } finally {
      setIsDownloading(false);
      setSelectedImages(new Set());
    }
  };

  const handleClearSelection = () => setSelectedImages(new Set());

  const handleNext = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(
      (img) => img._id === selectedImage._id,
    );
    if (currentIndex < filteredImages.length - 1)
      setSelectedImage(filteredImages[currentIndex + 1]);
  };

  const handlePrev = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(
      (img) => img._id === selectedImage._id,
    );
    if (currentIndex > 0) setSelectedImage(filteredImages[currentIndex - 1]);
  };

  const handleNextVideo = () => {
    if (!selectedVideo) return;
    const currentIndex = videos.findIndex(
      (vid) => vid._id === selectedVideo._id,
    );
    if (currentIndex < videos.length - 1)
      setSelectedVideo(videos[currentIndex + 1]);
  };

  const handlePrevVideo = () => {
    if (!selectedVideo) return;
    const currentIndex = videos.findIndex(
      (vid) => vid._id === selectedVideo._id,
    );
    if (currentIndex > 0) setSelectedVideo(videos[currentIndex - 1]);
  };

  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-white min-h-screen">
      <Navigation />

      {/* Header */}
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />
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

      {/* Section Navigation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col gap-4">
          <p className="text-gray-600">
            Showing {filteredImages.length} photo
            {filteredImages.length !== 1 ? "s" : ""} and {videos.length} video
            {videos.length !== 1 ? "s" : ""}
          </p>
          <div className="flex flex-wrap gap-4">
            {filteredImages.length > 0 && (
              <button
                onClick={() => setActiveSection("photos")}
                className={`inline-flex items-center px-4 sm:px-5 py-2.5 sm:py-2 rounded-lg font-medium transition-colors h-11 sm:h-auto ${
                  activeSection === "photos"
                    ? "bg-blue-900 text-white"
                    : "bg-blue-100 hover:bg-blue-200 text-blue-900"
                }`}
              >
                View Photos
              </button>
            )}
            {videos.length > 0 && (
              <button
                onClick={() => setActiveSection("videos")}
                className={`inline-flex items-center px-4 sm:px-5 py-2.5 sm:py-2 rounded-lg font-medium transition-colors h-11 sm:h-auto ${
                  activeSection === "videos"
                    ? "bg-blue-900 text-white"
                    : "bg-blue-100 hover:bg-blue-200 text-blue-900"
                }`}
              >
                View Videos
              </button>
            )}
          </div>
        </div>
      </section>



      {/* Photos Section */}
      {activeSection === "photos" && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 scroll-mt-20">
          {/* Selection Toolbar */}
          {selectedImages.size > 0 && (
            <div className="bg-white border-2 border-blue-900 shadow-lg rounded-lg p-3 sm:p-4 mb-8 animate-in slide-in-from-top-4 duration-300">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {selectedImages.size} media
                    {selectedImages.size !== 1 ? "s" : ""} selected
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleDownloadSelectedZip}
                    disabled={isDownloading}
                    className="flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-800 text-white px-4 sm:px-6 py-2.5 sm:py-2 rounded-lg transition-colors font-medium text-sm shadow-md hover:shadow-lg h-11 sm:h-auto"
                  >
                    <Download size={18} />
                    {isDownloading ? "Downloading..." : "Download All"}
                  </button>
                  <button
                    onClick={handleClearSelection}
                    className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 sm:px-6 py-2.5 sm:py-2 rounded-lg transition-colors font-medium text-sm h-11 sm:h-auto"
                  >
                    <X size={18} />
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
            Photos
          </h2>
          {isLoading ? (
            <SkeletonGrid count={12} />
          ) : filteredImages.length > 0 ? (
            <MasonryGrid
              images={filteredImages}
              onPreview={setSelectedImage}
              onDownload={handleDownload}
              selectedImages={selectedImages}
              onSelectImage={handleSelectImage}
            />
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">No photos available yet.</p>
            </div>
          )}
        </section>
      )}

      {/* Videos Section */}
      {activeSection === "videos" && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 scroll-mt-20">
          {/* Selection Toolbar */}
          {selectedImages.size > 0 && (
            <div className="bg-white border-2 border-blue-900 shadow-lg rounded-lg p-3 sm:p-4 mb-8 animate-in slide-in-from-top-4 duration-300">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {selectedImages.size} media
                    {selectedImages.size !== 1 ? "s" : ""} selected
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleDownloadSelectedZip}
                    disabled={isDownloading}
                    className="flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-800 text-white px-4 sm:px-6 py-2.5 sm:py-2 rounded-lg transition-colors font-medium text-sm shadow-md hover:shadow-lg h-11 sm:h-auto"
                  >
                    <Download size={18} />
                    {isDownloading ? "Downloading..." : "Download All"}
                  </button>
                  <button
                    onClick={handleClearSelection}
                    className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 sm:px-6 py-2.5 sm:py-2 rounded-lg transition-colors font-medium text-sm h-11 sm:h-auto"
                  >
                    <X size={18} />
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
            Videos
          </h2>
          {isLoading ? (
            <SkeletonGrid count={8} />
          ) : videos.length > 0 ? (
            <div
              className="w-full"
              style={{
                columnCount: "auto",
                columnWidth: "300px",
                columnGap: "1rem",
              }}
            >
              {videos.map((video) => (
                <div
                  key={video._id}
                  className="mb-4 break-inside-avoid"
                  style={{ breakInside: "avoid" }}
                >
                  <VideoGalleryCard
                    video={video}
                    onDownload={handleDownload}
                    onPreview={setSelectedVideo}
                    isSelected={selectedImages.has(video._id)}
                    onSelect={
                      selectedImages ? () => handleSelectImage(video._id) : undefined
                    }
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">No videos available yet.</p>
            </div>
          )}
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <p>&copy; 2024 Eldon and Geraldine. All rights reserved.</p>
        </div>
      </footer>

      <Lightbox
        image={selectedImage}
        images={filteredImages}
        onClose={() => setSelectedImage(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />

      <VideoLightbox
        video={selectedVideo}
        videos={videos}
        onClose={() => setSelectedVideo(null)}
        onNext={handleNextVideo}
        onPrev={handlePrevVideo}
        onDownload={handleDownload}
      />
    </div>
  );
}
