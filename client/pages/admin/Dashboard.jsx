import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Trash2,
  Upload,
  Eye,
  LogOut,
  Image as ImageIcon,
  Film,
  X,
} from "lucide-react";
import { VideoCard } from "../../components/VideoCard";
import { authApi, mediaApi } from "../../lib/api";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [activeTab, setActiveTab] = useState("images");
  const [caption, setCaption] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (!isLoggedIn) {
      navigate("/admin/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setIsLoading(true);
        const response = await mediaApi.getAll({ limit: 100 });
        const allMedia = response.media || [];
        setImages(allMedia.filter((m) => m.type === "image"));
        setVideos(allMedia.filter((m) => m.type === "video"));
        setError(null);
      } catch (err) {
        console.error("Failed to fetch media:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (authApi.isLoggedIn()) {
      fetchMedia();
    }
  }, []);

  const handleLogout = async () => {
    try {
      await authApi.logout();
      localStorage.removeItem("isAdminLoggedIn");
      navigate("/gallery");
    } catch (err) {
      console.error("Logout error:", err);
      localStorage.removeItem("isAdminLoggedIn");
      navigate("/gallery");
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newFiles = files.map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        name: file.name,
        preview: null,
      }));

      Promise.all(
        newFiles.map(
          (fileObj) =>
            new Promise((resolve) => {
              const reader = new FileReader();
              reader.onload = (event) => {
                fileObj.preview = event.target?.result;
                resolve();
              };
              reader.readAsDataURL(fileObj.file);
            }),
        ),
      ).then(() => {
        setSelectedFiles((prev) => [...prev, ...newFiles]);
      });
    }
  };

  const removeSelectedFile = (fileId) => {
    setSelectedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      alert("Please select at least one image");
      return;
    }
    setShowPreviewModal(true);
  };

  const confirmImageUpload = async () => {
    try {
      setIsUploading(true);
      setShowPreviewModal(false);
      const files = selectedFiles.map((f) => f.file);
      const response = await mediaApi.upload(files, caption);

      if (response.media && response.media.length > 0) {
        setImages([...response.media, ...images]);
        setCaption("");
        setSelectedFiles([]);
        const fileInput = document.getElementById("imageInput");
        if (fileInput) fileInput.value = "";

        const count = response.media.length;
        setSuccessMessage(
          `${count} image${count !== 1 ? "s" : ""} uploaded successfully!`,
        );
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.message || "Failed to upload images");
      setShowSuccessMessage(false);
    } finally {
      setIsUploading(false);
    }
  };

  const handleVideoUpload = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      alert("Please select at least one video");
      return;
    }
    setShowPreviewModal(true);
  };

  const confirmVideoUpload = async () => {
    try {
      setIsUploading(true);
      setShowPreviewModal(false);
      const files = selectedFiles.map((f) => f.file);
      const response = await mediaApi.upload(files, caption);

      if (response.media && response.media.length > 0) {
        setVideos([...response.media, ...videos]);
        setCaption("");
        setSelectedFiles([]);
        const fileInput = document.getElementById("videoInput");
        if (fileInput) fileInput.value = "";

        const count = response.media.length;
        setSuccessMessage(
          `${count} video${count !== 1 ? "s" : ""} uploaded successfully!`,
        );
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.message || "Failed to upload videos");
      setShowSuccessMessage(false);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteImage = async (id) => {
    try {
      await mediaApi.delete(id);
      setImages(images.filter((img) => img._id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.message || "Failed to delete image");
    }
  };

  const handleDeleteVideo = async (id) => {
    try {
      await mediaApi.delete(id);
      setVideos(videos.filter((vid) => vid._id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.message || "Failed to delete video");
    }
  };

  const totalMedia = images.length + videos.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-md border-b border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Manage {totalMedia} wedding media
              {totalMedia !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2.5 sm:py-2 rounded-lg transition-colors font-medium h-11 sm:h-auto"
          >
            <LogOut size={20} />
            <span className="hidden sm:inline">Logout</span>
            <span className="sm:hidden">Log out</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              {/* Tabs */}
              <div className="flex gap-2 mb-6 border-b border-gray-200">
                <button
                  onClick={() => {
                    setActiveTab("images");
                    setCaption("");
                    setSelectedFiles([]);
                    const fileInput = document.getElementById("imageInput");
                    if (fileInput) fileInput.value = "";
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 sm:py-2 font-medium transition-colors border-b-2 -mb-[1px] h-11 sm:h-auto ${
                    activeTab === "images"
                      ? "border-blue-900 text-blue-900"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <ImageIcon size={18} />
                  Photos
                </button>
                <button
                  onClick={() => {
                    setActiveTab("videos");
                    setCaption("");
                    setSelectedFiles([]);
                    const fileInput = document.getElementById("videoInput");
                    if (fileInput) fileInput.value = "";
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 sm:py-2 font-medium transition-colors border-b-2 -mb-[1px] h-11 sm:h-auto ${
                    activeTab === "videos"
                      ? "border-blue-900 text-blue-900"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Film size={18} />
                  Videos
                </button>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Upload className="text-blue-900" size={24} />
                </div>
                <h2 className="text-2xl font-serif font-bold text-gray-900">
                  Upload
                </h2>
              </div>

              {showSuccessMessage && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm font-medium animate-in">
                  ✓ {successMessage}
                </div>
              )}

              {/* Image Upload Form */}
              {activeTab === "images" && (
                <form onSubmit={handleImageUpload} className="space-y-5">
                  {/* Selected Files Preview Grid */}
                  {selectedFiles.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Selected Photos ({selectedFiles.length})
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {selectedFiles.map((fileObj) => (
                          <div
                            key={fileObj.id}
                            className="relative rounded-lg overflow-hidden bg-gray-200 aspect-square group"
                          >
                            <img
                              src={fileObj.preview}
                              alt={fileObj.name}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeSelectedFile(fileObj.id)}
                              className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                            >
                              <X className="text-white" size={24} />
                            </button>
                            <p className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 truncate">
                              {fileObj.name}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* File Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {selectedFiles.length > 0
                        ? "Add More Photos"
                        : "Select Photos"}
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id="imageInput"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="w-full px-4 py-3 border-2 border-dashed border-blue-300 rounded-lg text-center bg-blue-50/50 hover:bg-blue-50 transition-colors">
                        <ImageIcon
                          className="mx-auto text-blue-900 mb-2"
                          size={24}
                        />
                        <p className="text-sm text-gray-700 font-medium">
                          Click to select photos
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {selectedFiles.length > 0
                            ? `${selectedFiles.length} photo${selectedFiles.length !== 1 ? "s" : ""} selected`
                            : "PNG, JPG, GIF up to 10MB • Multiple files supported"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Caption */}
                  <div>
                    <label
                      htmlFor="caption"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Caption (Optional)
                    </label>
                    <textarea
                      id="caption"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent resize-none"
                      placeholder="Add a caption for all selected photos..."
                      rows={3}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={selectedFiles.length === 0 || isUploading}
                    className="w-full h-12 bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                  >
                    <Upload size={20} />
                    {isUploading
                      ? "Uploading..."
                      : `Upload ${selectedFiles.length} Photo${selectedFiles.length !== 1 ? "s" : ""}`}
                  </button>
                </form>
              )}

              {/* Video Upload Form */}
              {activeTab === "videos" && (
                <form onSubmit={handleVideoUpload} className="space-y-5">
                  {/* Selected Files Preview Grid */}
                  {selectedFiles.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Selected Videos ({selectedFiles.length})
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {selectedFiles.map((fileObj) => (
                          <div
                            key={fileObj.id}
                            className="relative rounded-lg overflow-hidden bg-gray-900 aspect-square group"
                          >
                            <video
                              src={fileObj.preview}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeSelectedFile(fileObj.id)}
                              className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                            >
                              <X className="text-white" size={24} />
                            </button>
                            <p className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 truncate">
                              {fileObj.name}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* File Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {selectedFiles.length > 0
                        ? "Add More Videos"
                        : "Select Videos"}
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id="videoInput"
                        accept="video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov"
                        multiple
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="w-full px-4 py-3 border-2 border-dashed border-blue-300 rounded-lg text-center bg-blue-50/50 hover:bg-blue-50 transition-colors">
                        <Film
                          className="mx-auto text-blue-900 mb-2"
                          size={24}
                        />
                        <p className="text-sm text-gray-700 font-medium">
                          Click to select videos
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {selectedFiles.length > 0
                            ? `${selectedFiles.length} video${selectedFiles.length !== 1 ? "s" : ""} selected`
                            : "MP4, WebM up to 100MB • Multiple files supported"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Caption */}
                  <div>
                    <label
                      htmlFor="videoCaption"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Caption (Optional)
                    </label>
                    <textarea
                      id="videoCaption"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent resize-none"
                      placeholder="Add a caption for all selected videos..."
                      rows={3}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={selectedFiles.length === 0 || isUploading}
                    className="w-full h-12 bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                  >
                    <Upload size={20} />
                    {isUploading
                      ? "Uploading..."
                      : `Upload ${selectedFiles.length} Video${selectedFiles.length !== 1 ? "s" : ""}`}
                  </button>
                </form>
              )}

              {/* Stats */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="bg-gradient-to-br from-blue-50 to-amber-50 rounded-lg p-4 text-center">
                  <p className="text-4xl font-serif font-bold text-blue-900 mb-1">
                    {activeTab === "images" ? images.length : videos.length}
                  </p>
                  <p className="text-sm text-gray-600">
                    {activeTab === "images"
                      ? `Photo${images.length !== 1 ? "s" : ""} in gallery`
                      : `Video${videos.length !== 1 ? "s" : ""} in gallery`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Media Grid */}
          <div className="lg:col-span-2">
            {activeTab === "images" && (
              <>
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <ImageIcon className="text-blue-900" size={28} />
                  Photos
                </h2>

                {images.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-lg p-16 text-center">
                    <ImageIcon
                      className="mx-auto text-gray-400 mb-4"
                      size={48}
                    />
                    <p className="text-gray-600 text-lg font-medium">
                      No photos yet
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                      Upload photos using the form to get started
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {images.map((image) => (
                      <div
                        key={image._id}
                        className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all"
                      >
                        {/* Thumbnail */}
                        <div className="relative w-full aspect-square bg-gray-200 overflow-hidden">
                          <img
                            src={image.url}
                            alt={image.caption || "Wedding photo"}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <div className="flex gap-2">
                              {deleteConfirm === image._id ? (
                                <>
                                  <button
                                    onClick={() => handleDeleteImage(image._id)}
                                    className="h-10 w-10 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                                    title="Confirm delete"
                                  >
                                    <Trash2 size={18} />
                                  </button>
                                  <button
                                    onClick={() => setDeleteConfirm(null)}
                                    className="px-3 py-2.5 h-10 flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white text-sm rounded-lg transition-colors"
                                  >
                                    Cancel
                                  </button>
                                </>
                              ) : (
                                <button
                                  onClick={() => setDeleteConfirm(image._id)}
                                  className="h-10 w-10 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                                  title="Delete image"
                                >
                                  <Trash2 size={18} />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Info */}
                        <div className="p-3">
                          <p className="text-xs text-gray-500">
                            ID: {image._id.slice(0, 8)}...
                          </p>
                          <p
                            className="text-xs text-gray-700 line-clamp-2 mt-1"
                            title={image.caption}
                          >
                            {image.caption || "No caption"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {activeTab === "videos" && (
              <>
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Film className="text-blue-900" size={28} />
                  Videos
                </h2>

                {videos.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-lg p-16 text-center">
                    <Film className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-600 text-lg font-medium">
                      No videos yet
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                      Upload videos using the form to get started
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {videos.map((video) => (
                      <VideoCard
                        key={video._id}
                        video={video}
                        onDelete={(id) => {
                          if (deleteConfirm === id) {
                            handleDeleteVideo(id);
                          } else {
                            setDeleteConfirm(id);
                          }
                        }}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Preview Modal */}
        {showPreviewModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-2xl font-serif font-bold text-gray-900">
                  Preview Before Upload
                </h2>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="h-10 w-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
                {/* Preview Grid */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-4">
                    {selectedFiles.length} file
                    {selectedFiles.length !== 1 ? "s" : ""} selected for upload
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {selectedFiles.map((fileObj) => (
                      <div
                        key={fileObj.id}
                        className="relative rounded-lg overflow-hidden bg-gray-200 aspect-square"
                      >
                        {activeTab === "images" ? (
                          <img
                            src={fileObj.preview}
                            alt={fileObj.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <video
                            src={fileObj.preview}
                            className="w-full h-full object-cover"
                          />
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-2 truncate">
                          {fileObj.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Caption Preview */}
                {caption && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-xs font-medium text-blue-900 mb-2">
                      Caption:
                    </p>
                    <p className="text-sm text-blue-800 whitespace-pre-wrap">
                      {caption}
                    </p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50">
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={
                    activeTab === "images"
                      ? confirmImageUpload
                      : confirmVideoUpload
                  }
                  disabled={isUploading}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                >
                  <Upload size={18} />
                  {isUploading ? "Uploading..." : "Confirm & Upload"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
