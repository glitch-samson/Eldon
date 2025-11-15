import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Upload, Eye, EyeOff, LogOut } from "lucide-react";
import { adminImages, AdminImage, categories } from "../../data/images";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [images, setImages] = useState<AdminImage[]>(adminImages);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState<
    "bride" | "groom" | "reception" | "ceremony" | "details"
  >("bride");
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
      category: category,
      alt: `Wedding photo - ${uploadedFileName}`,
      uploadDate: new Date().toLocaleDateString(),
    };

    setImages([newImage, ...images]);

    // Reset form
    setPreviewUrl(null);
    setCaption("");
    setCategory("bride");
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

  const categoryName = (value: string) => {
    return categories.find((cat) => cat.value === value)?.name || value;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gold-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-serif font-bold text-gray-900">
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
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
            <div className="bg-white rounded-xl shadow-lg p-8 sticky top-8">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                Upload Photo
              </h2>

              {showSuccessMessage && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
                  Image uploaded successfully!
                </div>
              )}

              <form onSubmit={handleUpload} className="space-y-6">
                {/* Image Preview */}
                {previewUrl && (
                  <div className="relative rounded-lg overflow-hidden">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Eye className="text-white" size={32} />
                    </div>
                  </div>
                )}

                {/* File Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Image
                  </label>
                  <input
                    type="file"
                    id="imageInput"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 border-2 border-dashed border-gold-300 rounded-lg focus:outline-none focus:border-gold-600"
                  />
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-600"
                    placeholder="Add a caption..."
                    rows={3}
                  />
                </div>

                {/* Category */}
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) =>
                      setCategory(
                        e.target.value as
                          | "bride"
                          | "groom"
                          | "reception"
                          | "ceremony"
                          | "details"
                      )
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-600"
                  >
                    <option value="bride">Bride</option>
                    <option value="groom">Groom</option>
                    <option value="ceremony">Ceremony</option>
                    <option value="reception">Reception</option>
                    <option value="details">Details</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gold-600 hover:bg-gold-700 text-white font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Upload size={20} />
                  Upload Photo
                </button>
              </form>

              {/* Stats */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-4xl font-serif font-bold text-gold-600 mb-2">
                    {images.length}
                  </p>
                  <p className="text-gray-600">Photos in gallery</p>
                </div>
              </div>
            </div>
          </div>

          {/* Images List */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
              Manage Photos
            </h2>

            {images.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <p className="text-gray-600 text-lg">
                  No photos uploaded yet. Start uploading to build your gallery!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="bg-white rounded-xl shadow-lg p-4 flex gap-4 items-start hover:shadow-xl transition-shadow"
                  >
                    {/* Thumbnail */}
                    <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-200">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-500">
                        ID: {image.id}
                      </p>
                      <p className="font-medium text-gray-900 truncate mb-1">
                        {image.caption || "No caption"}
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        <span className="px-2 py-1 bg-gold-100 text-gold-700 text-xs rounded font-medium">
                          {categoryName(image.category)}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {image.uploadDate}
                        </span>
                      </div>
                    </div>

                    {/* Delete Button */}
                    <div>
                      {deleteConfirm === image.id ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDelete(image.id)}
                            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="px-3 py-1 bg-gray-300 hover:bg-gray-400 text-gray-900 text-sm rounded transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(image.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete image"
                        >
                          <Trash2 size={20} />
                        </button>
                      )}
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
