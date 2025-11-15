import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/gallery", label: "Gallery" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-purple-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-serif font-bold text-purple-600">
              E & G
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isActive(link.href)
                    ? "bg-purple-100 text-purple-700 font-medium"
                    : "text-gray-700 hover:bg-purple-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="ml-4 pl-4 border-l border-purple-200">
              <Link
                to="/admin/login"
                className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors font-medium"
              >
                Admin
              </Link>
            </div>
          </div>

          {/* Mobile Navigation Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-purple-50"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-lg transition-colors ${
                  isActive(link.href)
                    ? "bg-purple-100 text-purple-700 font-medium"
                    : "text-gray-700 hover:bg-purple-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin/login"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors font-medium"
            >
              Admin Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
