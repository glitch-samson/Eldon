import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Upload, Eye, LogOut, Image as ImageIcon } from "lucide-react";
import { adminImages, AdminImage } from "../../data/images";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [images, setImages] = useState<AdminImage[]>(adminImages);
  const [caption, setCaption] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (!isLoggedIn) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin/login");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        setPreviewUrl(url);
        setUploadedFileName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewUrl) {
      alert("Please select an image first");
      return;
    }

    // Add new image to the list
    const newImage: AdminImage = {
      id: String(Math.max(...images.map((img) => parseInt(img.id)), 0) + 1),
      src: previewUrl,
      caption: caption || undefined,
      alt: `Wedding photo - ${uploadedFileName}`,
      uploadDate: new Date().toLocaleDateString(),
    };

    setImages([newImage, ...images]);

    // Reset form
    setPreviewUrl(null);
    setCaption("");
    setUploadedFileName("");
    const fileInput = document.getElementById("imageInput") as HTMLInputElement;
    if (fileInput) fileInput.value = "";

    // Show success message
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleDelete = (id: string) => {
    setImages(images.filter((img) => img.id !== id));
    setDeleteConfirm(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gold-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-md border-b border-gold-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Manage {images.length} wedding photo
              {images.length !== 1 ? "s" : ""}
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
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-gold-100 rounded-lg">
                  <Upload className="text-gold-600" size={24} />
                </div>
                <h2 className="text-2xl font-serif font-bold text-gray-900">
                  Upload
                </h2>
              </div>

              {showSuccessMessage && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm font-medium animate-in">
                  ✓ Image uploaded successfully!
                </div>
              )}

              <form onSubmit={handleUpload} className="space-y-5">
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
                    <div className="w-full px-4 py-3 border-2 border-dashed border-gold-300 rounded-lg text-center bg-gold-50/50 hover:bg-gold-50 transition-colors">
                      <ImageIcon
                        className="mx-auto text-gold-600 mb-2"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-600 focus:border-transparent resize-none"
                    placeholder="Add a caption for this photo..."
                    rows={3}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!previewUrl}
                  className="w-full bg-gradient-to-r from-gold-600 to-gold-700 hover:from-gold-700 hover:to-gold-800 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                >
                  <Upload size={20} />
                  Upload Photo
                </button>
              </form>

              {/* Stats */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="bg-gradient-to-br from-gold-50 to-rose-50 rounded-lg p-4 text-center">
                  <p className="text-4xl font-serif font-bold text-gold-600 mb-1">
                    {images.length}
                  </p>
                  <p className="text-sm text-gray-600">
                    Photo{images.length !== 1 ? "s" : ""} in gallery
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Photos Grid */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-2">
              <ImageIcon className="text-gold-600" size={28} />
              Gallery
            </h2>

            {images.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-16 text-center">
                <ImageIcon className="mx-auto text-gray-400 mb-4" size={48} />
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
                    key={image.id}
                    className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-full aspect-square bg-gray-200 overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex gap-2">
                          {deleteConfirm === image.id ? (
                            <>
                              <button
                                onClick={() => handleDelete(image.id)}
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
                              onClick={() => setDeleteConfirm(image.id)}
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
                      <p className="text-xs text-gray-500">ID: {image.id}</p>
                      <p
                        className="text-xs text-gray-700 line-clamp-2 mt-1"
                        title={image.caption}
                      >
                        {image.caption || "No caption"}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {image.uploadDate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
