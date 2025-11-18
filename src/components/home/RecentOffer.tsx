// components/home/RecentOffer.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBed, FaBath, FaMapMarkerAlt, FaTag, FaHeart } from "react-icons/fa";

interface Listing {
  _id: string;
  name: string;
  address: string;
  regularPrice: number;
  discountPrice?: number;
  bathroom: number;
  bedroom: number;
  offer: boolean;
  imageUrls: string[];
}

interface RecentOfferProps {
  listings: Listing[];
}

const RecentOffer: React.FC<RecentOfferProps> = ({ listings }) => {
  // Always show exactly 8 items - fill with placeholders if needed
  const displayListings = [...listings];
  while (displayListings.length < 8) {
    displayListings.push({} as Listing);
  }
  const finalListings = displayListings.slice(0, 8);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#c5eee1] px-6 py-3 rounded-full border border-[#68d8ca] mb-6">
            <FaTag className="text-[#68d8ca] text-lg" />
            <span className="text-gray-700 font-semibold">Hot Deals</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Premium{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#68d8ca] to-[#c5eee1]">
              Properties
            </span>
          </h2>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {finalListings.map((listing, index) => (
            <div
              key={listing._id || `placeholder-${index}`}
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
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <FaTag className="text-gray-400 text-3xl" />
                  </div>
                )}

                {/* Offer Badge */}
                {listing._id && listing.offer && (
                  <div className="absolute top-3 left-3">
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      OFFER
                    </div>
                  </div>
                )}

                {/* Favorite Button */}
                {listing._id && (
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-500 hover:text-white">
                    <FaHeart className="text-sm" />
                  </button>
                )}

                {/* Price Overlay */}
                {listing._id && (
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                      <div className="flex items-baseline justify-between">
                        <span className="text-lg font-bold text-[#68d8ca]">
                          $
                          {listing.discountPrice?.toLocaleString() ||
                            listing.regularPrice.toLocaleString()}
                        </span>
                        {listing.discountPrice && (
                          <span className="text-xs text-gray-500 line-through">
                            ${listing.regularPrice.toLocaleString()}
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
                    <Link
                      href={`/show-listing/${listing._id}`}
                      className="font-bold text-gray-900 text-base mb-2 line-clamp-1 hover:text-primary transition-all duration-300"
                    >
                      {listing.name}
                    </Link>

                    {/* Address */}
                    <div className="flex items-center gap-2 mb-3">
                      <FaMapMarkerAlt className="text-red-500 flex-shrink-0 text-xs" />
                      <p className="text-gray-600 text-xs line-clamp-1">
                        {listing.address}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-1 text-gray-600">
                        <FaBed className="text-blue-500 text-xs" />
                        <span className="text-xs">{listing.bedroom} Bed</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <FaBath className="text-green-500 text-xs" />
                        <span className="text-xs">{listing.bathroom} Bath</span>
                      </div>
                    </div>
                  </>
                ) : (
                  /* Placeholder Content */
                  <div className="text-center py-6">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaTag className="text-gray-400" />
                    </div>
                    <p className="text-gray-400 text-sm">New Property Coming</p>
                  </div>
                )}
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#68d8ca] transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentOffer;
