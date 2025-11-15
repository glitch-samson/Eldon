import { Navigation } from "../components/Navigation";
import { coupleInfo, images } from "../data/images";
import { Heart } from "lucide-react";

export default function About() {
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
            About the Couple
          </h1>
          <p className="text-xl text-gray-600 font-light">
            The story of how we found each other
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <div className="relative">
            <img
              src={
                images[8]?.src ||
                "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=700&fit=crop"
              }
              alt="Eldon and Geraldine"
              className="w-full rounded-xl shadow-2xl object-cover aspect-[3/4]"
            />
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <Heart size={48} className="text-white" />
            </div>
          </div>

          {/* Story Text */}
          <div>
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">
              Our Love Story
            </h2>
            <p className="text-lg text-gray-700 font-light leading-relaxed mb-6">
              {coupleInfo.story}
            </p>
            <p className="text-lg text-purple-600 font-serif font-semibold">
              Forever starts now ✨
            </p>
          </div>
        </div>

        {/* Couple Info */}
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Bride */}
            <div className="text-center">
              <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                {coupleInfo.brideName}
              </h3>
              <p className="text-gray-600 text-lg mb-4">The Bride</p>
              <img
                src={
                  images[0]?.src ||
                  "https://images.unsplash.com/photo-1519741497674-611481863552?w=300&h=300&fit=crop"
                }
                alt={coupleInfo.brideName}
                className="w-48 h-48 mx-auto rounded-full object-cover shadow-lg mb-4"
              />
              <p className="text-gray-600 italic">
                "He stole my heart the moment we met."
              </p>
            </div>

            {/* Groom */}
            <div className="text-center">
              <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                {coupleInfo.groomName}
              </h3>
              <p className="text-gray-600 text-lg mb-4">The Groom</p>
              <img
                src={
                  images[1]?.src ||
                  "https://images.unsplash.com/photo-1506748686214-e9b7d7490020?w=300&h=300&fit=crop"
                }
                alt={coupleInfo.groomName}
                className="w-48 h-48 mx-auto rounded-full object-cover shadow-lg mb-4"
              />
              <p className="text-gray-600 italic">
                "She makes every day an adventure."
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-12 text-center">
            Our Timeline
          </h2>

          <div className="space-y-8 relative">
            {/* Vertical line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-purple-200" />

            {/* Timeline Item 1 */}
            <div className="flex gap-8 items-center">
              <div className="flex-1 text-right">
                <h3 className="text-2xl font-serif font-bold text-gray-900">
                  The Meeting
                </h3>
                <p className="text-gray-600 mt-2">College days</p>
              </div>
              <div className="w-6 h-6 bg-purple-600 rounded-full shadow-lg flex-shrink-0 border-4 border-white" />
              <div className="flex-1"></div>
            </div>

            {/* Timeline Item 2 */}
            <div className="flex gap-8 items-center flex-row-reverse">
              <div className="flex-1 text-left">
                <h3 className="text-2xl font-serif font-bold text-gray-900">
                  Growing Together
                </h3>
                <p className="text-gray-600 mt-2">Years of adventures</p>
              </div>
              <div className="w-6 h-6 bg-purple-600 rounded-full shadow-lg flex-shrink-0 border-4 border-white" />
              <div className="flex-1"></div>
            </div>

            {/* Timeline Item 3 */}
            <div className="flex gap-8 items-center">
              <div className="flex-1 text-right">
                <h3 className="text-2xl font-serif font-bold text-gray-900">
                  The Proposal
                </h3>
                <p className="text-gray-600 mt-2">Under the stars</p>
              </div>
              <div className="w-6 h-6 bg-rose-500 rounded-full shadow-lg flex-shrink-0 border-4 border-white" />
              <div className="flex-1"></div>
            </div>

            {/* Timeline Item 4 */}
            <div className="flex gap-8 items-center flex-row-reverse">
              <div className="flex-1 text-left">
                <h3 className="text-2xl font-serif font-bold text-gray-900">
                  Forever Begins
                </h3>
                <p className="text-gray-600 mt-2">{coupleInfo.wedding_date}</p>
              </div>
              <div className="w-6 h-6 bg-rose-500 rounded-full shadow-lg flex-shrink-0 border-4 border-white" />
              <div className="flex-1"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <p>&copy; 2024 Eldon and Geraldine. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
