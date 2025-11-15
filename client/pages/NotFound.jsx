import { Link } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import { ChevronLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-gradient-to-br from-white via-gold-50 to-white min-h-screen">
      <Navigation />

      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <h1 className="text-9xl font-serif font-bold text-gold-600 mb-4">
            404
          </h1>
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
            Oops! It seems like this page doesn't exist. Let's get you back to
            the main event.
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gold-600 hover:bg-gold-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            <ChevronLeft size={20} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
