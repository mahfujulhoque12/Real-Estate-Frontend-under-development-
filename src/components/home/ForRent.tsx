// components/home/ForRent.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaBed,
  FaBath,
  FaMapMarkerAlt,
  FaKey,
  FaCar,
  FaCouch,
} from "react-icons/fa";

interface Listing {
  _id: string;
  name: string;
  description: string;
  address: string;
  regularPrice: number;
  discountPrice?: number;
  bathroom: number;
  bedroom: number;
  furnished: boolean;
  parking: boolean;
  type: string;
  offer: boolean;
  imageUrls: string[];
}

interface ForRentProps {
  listings: Listing[];
}

const ForRent: React.FC<ForRentProps> = ({ listings }) => {
  // Always show exactly 8 items - fill with placeholders if needed
  const displayListings = [...listings];
  while (displayListings.length < 8) {
    displayListings.push({} as Listing);
  }
  const finalListings = displayListings.slice(0, 8);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 px-6 py-3 rounded-full border border-blue-200 mb-6">
            <FaKey className="text-blue-600 text-lg" />
            <span className="text-gray-700 font-semibold">
              Available for Rent
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Premium{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600">
              Rental Properties
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover your perfect rental home from our curated collection of
            premium properties
          </p>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {finalListings.map((listing, index) => (
            <div
              key={listing._id || `rent-placeholder-${index}`}
              className={`group relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-500 ${
                !listing._id
                  ? "opacity-40"
                  : "hover:shadow-2xl hover:-translate-y-2"
              }`}
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                {listing.imageUrls && listing.imageUrls.length > 0 ? (
                  <Link href={`/show-listing/${listing._id}`}>
                    <Image
                      width={300}
                      height={200}
                      src={listing.imageUrls[0]}
                      alt={listing.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                  </Link>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <FaKey className="text-blue-400 text-3xl" />
                  </div>
                )}

                {/* Rent Badge */}
                {listing._id && (
                  <div className="absolute top-3 left-3">
                    <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      FOR RENT
                    </div>
                  </div>
                )}

                {/* Price Overlay */}
                {listing._id && (
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                      <div className="flex items-baseline justify-between">
                        <span className="text-lg font-bold text-blue-600">
                          ${listing.regularPrice.toLocaleString()}/mo
                        </span>
                        {listing.discountPrice && (
                          <span className="text-xs text-green-600 font-semibold">
                            Save $
                            {(
                              listing.regularPrice - listing.discountPrice
                            ).toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-4">
                {listing._id ? (
                  <>
                    {/* Property Name */}
                    <h3 className="font-bold text-gray-900 text-base mb-2 line-clamp-1">
                      {listing.name}
                    </h3>

                    {/* Address */}
                    <div className="flex items-center gap-2 mb-3">
                      <FaMapMarkerAlt className="text-red-500 flex-shrink-0 text-xs" />
                      <p className="text-gray-600 text-xs line-clamp-1">
                        {listing.address}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-gray-600">
                        <FaBed className="text-blue-500 text-xs" />
                        <span className="text-xs">{listing.bedroom} Bed</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <FaBath className="text-green-500 text-xs" />
                        <span className="text-xs">{listing.bathroom} Bath</span>
                      </div>
                    </div>

                    {/* Additional Features */}
                    <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                      {listing.parking && (
                        <div
                          className="flex items-center gap-1"
                          title="Parking Available"
                        >
                          <FaCar className="text-gray-400 text-xs" />
                        </div>
                      )}
                      {listing.furnished && (
                        <div
                          className="flex items-center gap-1"
                          title="Furnished"
                        >
                          <FaCouch className="text-gray-400 text-xs" />
                        </div>
                      )}
                      <div className="flex-1"></div>
                      <Link
                        href={`/show-listing/${listing._id}`}
                        className="text-blue-600 hover:text-blue-700 text-xs font-semibold transition-colors"
                      >
                        View Details →
                      </Link>
                    </div>
                  </>
                ) : (
                  /* Placeholder Content */
                  <div className="text-center py-6">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaKey className="text-blue-400" />
                    </div>
                    <p className="text-gray-400 text-sm">New Rental Coming</p>
                  </div>
                )}
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500 transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ForRent;
