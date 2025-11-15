import { useState } from "react";
import { Navigation } from "../components/Navigation";
import { Mail, Phone, Heart } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="bg-gradient-to-br from-white via-purple-50 to-white min-h-screen">
      <Navigation />

      {/* Header */}
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-serif font-bold text-gray-900 mb-4">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-600 font-light">
            We'd love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
              Contact Information
            </h2>

            <div className="space-y-8">
              {/* Email */}
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-purple-600 text-white">
                    <Mail size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    Email
                  </h3>
                  <p className="text-gray-600 hover:text-purple-600">
                    <a href="mailto:hello@eldonandgeraldine.com">
                      hello@eldonandgeraldine.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-rose-500 text-white">
                    <Phone size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    Phone
                  </h3>
                  <p className="text-gray-600 hover:text-purple-600">
                    <a href="tel:+15551234567">(555) 123-4567</a>
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-purple-500 text-white">
                    <Heart size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    Response Time
                  </h3>
                  <p className="text-gray-600">
                    We'll get back to you within 24 hours
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Follow Us
              </h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center justify-center text-white transition-colors"
                  aria-label="Instagram"
                >
                  f
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center justify-center text-white transition-colors"
                  aria-label="Facebook"
                >
                  i
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center justify-center text-white transition-colors"
                  aria-label="Twitter"
                >
                  t
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
              Send us a Message
            </h2>

            {submitted && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                Thank you! We've received your message and will get back to you
                soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="What's this about?"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-none"
                  placeholder="Your message here..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <p>&copy; 2024 Eldon and Geraldine. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
