import { Navigation } from "../components/Navigation";
import { coupleInfo } from "../data/images";
import { Calendar, Clock, MapPin, Utensils } from "lucide-react";

export default function EventDetails() {
  return (
    <div className="bg-gradient-to-br from-white via-gold-50 to-white min-h-screen">
      <Navigation />

      {/* Header */}
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-200/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-serif font-bold text-gray-900 mb-4">
            Event Details
          </h1>
          <p className="text-xl text-gray-600 font-light">
            Join us for a day of love and celebration
          </p>
        </div>
      </section>

      {/* Main Details */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Date & Location Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Date Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <Calendar className="text-gold-600" size={32} />
              <h2 className="text-2xl font-serif font-bold text-gray-900">
                Wedding Date
              </h2>
            </div>
            <p className="text-4xl font-serif font-bold text-gold-600 mb-2">
              {coupleInfo.wedding_date}
            </p>
            <p className="text-gray-600">Saturday, June 15, 2024</p>
          </div>

          {/* Location Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <MapPin className="text-rose-500" size={32} />
              <h2 className="text-2xl font-serif font-bold text-gray-900">
                Venue
              </h2>
            </div>
            <p className="text-2xl font-serif font-bold text-gray-900 mb-2">
              {coupleInfo.venue}
            </p>
            <p className="text-gray-600">123 Wedding Lane, City, State</p>
          </div>
        </div>

        {/* Schedule */}
        <div className="bg-gradient-to-br from-gold-50 to-rose-50 rounded-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">
            Day of Schedule
          </h2>

          <div className="space-y-6">
            {/* Ceremony */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gold-600 text-white">
                  <Clock size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">
                  Ceremony
                </h3>
                <p className="text-gray-600 mb-1">
                  Time: {coupleInfo.ceremony_time}
                </p>
                <p className="text-gray-600">
                  Location: Main Hall, {coupleInfo.venue}
                </p>
              </div>
            </div>

            {/* Reception */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-rose-500 text-white">
                  <Utensils size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">
                  Reception & Dinner
                </h3>
                <p className="text-gray-600 mb-1">
                  Time: {coupleInfo.reception_time}
                </p>
                <p className="text-gray-600">
                  Location: Ballroom, {coupleInfo.venue}
                </p>
              </div>
            </div>

            {/* Cocktail Hour */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gold-500 text-white">
                  <Clock size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">
                  Cocktail Hour & Photos
                </h3>
                <p className="text-gray-600 mb-1">Time: 4:00 PM - 5:00 PM</p>
                <p className="text-gray-600">
                  Enjoy drinks and appetizers while we capture more memories
                </p>
              </div>
            </div>

            {/* Dancing */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-rose-500 text-white">
                  <Clock size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">
                  Dancing & Celebration
                </h3>
                <p className="text-gray-600 mb-1">Time: 8:00 PM onwards</p>
                <p className="text-gray-600">
                  Dance the night away with us and our loved ones
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
            Important Information
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Dress Code
              </h3>
              <p className="text-gray-600">
                Black-tie optional. We request that guests wear formal attire.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Parking
              </h3>
              <p className="text-gray-600">
                Complimentary valet parking is available for all guests. Please
                allow extra time for parking.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Accommodations
              </h3>
              <p className="text-gray-600">
                A block of rooms has been reserved at the Grand Hotel nearby at
                a special rate for our guests. Use code: SARAHAMES
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Dietary Restrictions
              </h3>
              <p className="text-gray-600">
                Please let us know of any dietary restrictions or allergies on
                your RSVP card.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Photography
              </h3>
              <p className="text-gray-600">
                Professional photography will take place throughout the day.
                Share your photos with us using #SarahAndJames2024
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="my-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">
            Find Us
          </h2>
          <div className="rounded-xl overflow-hidden shadow-lg h-96 bg-gray-200">
            <iframe
              title="Wedding Venue Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1234567891234!2d-74.0060!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s123%20Wedding%20Lane!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <p>&copy; 2024 Sarah & James. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
