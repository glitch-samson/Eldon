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
    <nav className="fixed top-0 left-0 right-0 bg-white/98 backdrop-blur-sm border-b border-blue-200/20 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="text-4xl font-serif font-bold bg-gradient-to-r from-blue-900 via-amber-600 to-amber-400 bg-clip-text text-transparent group-hover:from-blue-800 group-hover:via-amber-500 group-hover:to-amber-300 transition-all duration-300">
              E & G
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-5 py-2.5 h-10 flex items-center rounded-full transition-all duration-300 text-sm font-medium ${
                  isActive(link.href)
                    ? "bg-blue-100/60 text-blue-900"
                    : "text-gray-600 hover:text-blue-700 hover:bg-blue-50/40"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="ml-6 pl-6 border-l border-blue-200">
              <Link
                to="/admin/login"
                className="px-5 py-2.5 h-10 flex items-center rounded-full bg-gradient-to-r from-blue-900 to-amber-500 text-white hover:from-blue-800 hover:to-amber-600 transition-all duration-300 font-medium text-sm shadow-md hover:shadow-lg"
              >
                Admin
              </Link>
            </div>
          </div>

          {/* Mobile Navigation Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden h-10 w-10 flex items-center justify-center rounded-full hover:bg-blue-50/60 transition-colors"
          >
            {isOpen ? <X size={24} className="text-blue-900" /> : <Menu size={24} className="text-blue-900" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-blue-200/30">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-5 py-3 rounded-full transition-all duration-300 text-sm font-medium ${
                  isActive(link.href)
                    ? "bg-blue-100/60 text-blue-900"
                    : "text-gray-600 hover:text-blue-700 hover:bg-blue-50/40"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin/login"
              onClick={() => setIsOpen(false)}
              className="block px-5 py-3 rounded-full bg-gradient-to-r from-blue-900 to-amber-500 text-white hover:from-blue-800 hover:to-amber-600 transition-all duration-300 font-medium text-sm"
            >
              Admin Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
