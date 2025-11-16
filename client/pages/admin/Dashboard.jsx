import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Trash2,
  Upload,
  Eye,
  LogOut,
  Image as ImageIcon,
  Film,
} from "lucide-react";
import { VideoCard } from "../../components/VideoCard";
import { authApi, mediaApi } from "../../lib/api";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [activeTab, setActiveTab] = useState("images");
  const [caption, setCaption] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

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
      navigate("/admin/login");
    } catch (err) {
      console.error("Logout error:", err);
      localStorage.removeItem("isAdminLoggedIn");
      navigate("/admin/login");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setUploadedFileName(file.name);

      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result;
        setPreviewUrl(url);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!uploadedFile) {
      alert("Please select an image first");
      return;
    }

    try {
      setIsUploading(true);
      const response = await mediaApi.upload(uploadedFile, caption);

      if (response.media && response.media.length > 0) {
        setImages([...response.media, ...images]);
        setPreviewUrl(null);
        setCaption("");
        setUploadedFileName("");
        setUploadedFile(null);
        const fileInput = document.getElementById("imageInput");
        if (fileInput) fileInput.value = "";

        setSuccessMessage("Image uploaded successfully!");
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.message || "Failed to upload image");
      setShowSuccessMessage(false);
    } finally {
      setIsUploading(false);
    }
  };

  const handleVideoUpload = async (e) => {
    e.preventDefault();
    if (!uploadedFile) {
      alert("Please select a video first");
      return;
    }

    try {
      setIsUploading(true);
      const response = await mediaApi.upload(uploadedFile, caption);

      if (response.media && response.media.length > 0) {
        setVideos([...response.media, ...videos]);
        setPreviewUrl(null);
        setCaption("");
        setUploadedFileName("");
        setUploadedFile(null);
        const fileInput = document.getElementById("videoInput");
        if (fileInput) fileInput.value = "";

        setSuccessMessage("Video uploaded successfully!");
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.message || "Failed to upload video");
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
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
          >
            <LogOut size={20} />
            Logout
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
                    setPreviewUrl(null);
                    setCaption("");
                  }}
                  className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors border-b-2 -mb-[1px] ${
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
                    setPreviewUrl(null);
                    setCaption("");
                  }}
                  className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors border-b-2 -mb-[1px] ${
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
                  {/* Image Preview */}
                  {previewUrl && (
                    <div className="relative rounded-lg overflow-hidden bg-gray-100 aspect-square">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Eye className="text-white" size={32} />
                      </div>
                    </div>
                  )}

                  {/* File Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Photo
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id="imageInput"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="w-full px-4 py-3 border-2 border-dashed border-purple-300 rounded-lg text-center bg-purple-50/50 hover:bg-purple-50 transition-colors">
                        <ImageIcon
                          className="mx-auto text-purple-600 mb-2"
                          size={24}
                        />
                        <p className="text-sm text-gray-700 font-medium">
                          Click to select photo
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {uploadedFileName || "PNG, JPG, GIF up to 10MB"}
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-none"
                      placeholder="Add a caption for this photo..."
                      rows={3}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!previewUrl || isUploading}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                  >
                    <Upload size={20} />
                    {isUploading ? "Uploading..." : "Upload Photo"}
                  </button>
                </form>
              )}

              {/* Video Upload Form */}
              {activeTab === "videos" && (
                <form onSubmit={handleVideoUpload} className="space-y-5">
                  {/* Video Preview */}
                  {previewUrl && (
                    <div className="relative rounded-lg overflow-hidden bg-gray-900 aspect-square">
                      <video
                        src={previewUrl}
                        className="w-full h-full object-cover"
                        controls
                      />
                    </div>
                  )}

                  {/* File Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Video
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id="videoInput"
                        accept="video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="w-full px-4 py-3 border-2 border-dashed border-purple-300 rounded-lg text-center bg-purple-50/50 hover:bg-purple-50 transition-colors">
                        <Film
                          className="mx-auto text-purple-600 mb-2"
                          size={24}
                        />
                        <p className="text-sm text-gray-700 font-medium">
                          Click to select video
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {uploadedFileName || "MP4, WebM up to 100MB"}
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-none"
                      placeholder="Add a caption for this video..."
                      rows={3}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!previewUrl || isUploading}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                  >
                    <Upload size={20} />
                    {isUploading ? "Uploading..." : "Upload Video"}
                  </button>
                </form>
              )}

              {/* Stats */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="bg-gradient-to-br from-purple-50 to-rose-50 rounded-lg p-4 text-center">
                  <p className="text-4xl font-serif font-bold text-purple-600 mb-1">
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
                  <ImageIcon className="text-purple-600" size={28} />
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
                                    className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                                    title="Confirm delete"
                                  >
                                    <Trash2 size={18} />
                                  </button>
                                  <button
                                    onClick={() => setDeleteConfirm(null)}
                                    className="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded-lg transition-colors"
                                  >
                                    Cancel
                                  </button>
                                </>
                              ) : (
                                <button
                                  onClick={() => setDeleteConfirm(image._id)}
                                  className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
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
                  <Film className="text-purple-600" size={28} />
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
      </div>
    </div>
  );
}
