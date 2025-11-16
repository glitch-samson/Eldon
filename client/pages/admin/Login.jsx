import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, LogIn } from "lucide-react";
import { authApi } from "../../lib/api";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await authApi.login(password);
      if (response.success) {
        localStorage.setItem("isAdminLoggedIn", "true");
        navigate("/admin/dashboard");
      }
    } catch (err) {
      setError(err.message || "Invalid password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-white flex items-center justify-center px-4 py-12">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-200/20 rounded-full blur-3xl" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-600 to-rose-500 rounded-xl mx-auto mb-4">
              <LogIn className="text-white" size={28} />
            </div>
            <h1 className="text-3xl font-serif font-bold text-gray-900 text-center mb-2">
              Admin Access
            </h1>
            <p className="text-gray-600 text-center">Manage wedding photos</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-3 text-purple-600"
                  size={20}
                />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                  placeholder="Enter admin password"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-purple-400 disabled:to-purple-400 text-white font-semibold py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Backend Info */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs font-semibold text-blue-900 mb-2 uppercase tracking-wide">
              Backend Authentication
            </p>
            <p className="text-sm text-blue-800">
              Enter the admin password configured on the backend server.
            </p>
          </div>

          {/* Divider */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600">
              Not an admin?{" "}
              <a
                href="/"
                className="text-purple-600 hover:text-purple-700 font-semibold"
              >
                Back to home
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
