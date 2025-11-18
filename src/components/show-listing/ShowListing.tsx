/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaTrash,
  FaEdit,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaTag,
} from "react-icons/fa";

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

interface ShowListingProps {
  listings: Listing[];
  handleEdit: (listing: Listing) => void;
  handleDelete: (id: string) => void;
}

const ShowListing: React.FC<ShowListingProps> = ({
  listings,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {listings.map((listing) => {
        const displayPrice = listing.discountPrice || listing.regularPrice;
        const hasDiscount = listing.offer && listing.discountPrice;

        return (
          <div
            key={listing._id}
            className="bg-white flex flex-col justify-between rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 group hover:border-emerald-200"
          >
            {/* Image Section */}
            <div className="relative w-full h-48">
              {listing.imageUrls?.length > 0 ? (
                <Link
                  href={`/show-listing/${listing._id}`}
                  className="block w-full h-full"
                >
                  <Image
                    src={listing.imageUrls[0]}
                    alt={listing.name}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    priority={listings.indexOf(listing) < 4}
                  />
                </Link>
              ) : (
                <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400 font-medium">
                  <div className="text-center p-4">
                    <div className="text-2xl mb-2">🏠</div>
                    <p className="text-sm">No images</p>
                  </div>
                </div>
              )}

              {/* Offer Badge */}
              {listing.offer && (
                <div className="absolute top-3 left-3">
                  <span className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
                    <FaTag className="text-xs" />
                    OFFER
                  </span>
                </div>
              )}

              {/* Price Overlay */}
              <div className="absolute bottom-3 left-3">
                <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-emerald-700">
                      ${displayPrice.toLocaleString()}
                    </span>
                    {hasDiscount && (
                      <span className="text-xs text-gray-500 line-through">
                        ${listing.regularPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  {hasDiscount && (
                    <div className="text-xs text-green-600 font-semibold mt-1">
                      Save $
                      {(
                        listing.regularPrice - listing.discountPrice!
                      ).toLocaleString()}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-1">
              {/* Title */}
              <Link
                href={`/show-listing/${listing._id}`}
                className="group/title mb-3"
              >
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 group-hover/title:text-emerald-600 transition-colors duration-200">
                  {listing.name}
                </h3>
              </Link>

              {/* Address */}
              <div className="flex items-start gap-2 mb-4">
                <FaMapMarkerAlt className="text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                  {listing.address}
                </p>
              </div>

              {/* Features */}
              <div className="flex items-center gap-4 mb-4 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <FaBed className="text-blue-600" />
                  <span className="font-medium">{listing.bedroom}</span>
                  <span className="text-gray-500">Beds</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <FaBath className="text-green-600" />
                  <span className="font-medium">{listing.bathroom}</span>
                  <span className="text-gray-500">Baths</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-200">
                <Link
                  href={`/show-listing/${listing._id}`}
                  className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors px-3 py-1.5 rounded-lg hover:bg-emerald-50"
                >
                  View Details
                </Link>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(listing)}
                    className="flex cursor-pointer items-center justify-center w-9 h-9 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm border border-blue-100"
                    aria-label="Edit Listing"
                    title="Edit Listing"
                  >
                    <FaEdit className="text-sm" />
                  </button>

                  <button
                    onClick={() => handleDelete(listing._id)}
                    className="flex cursor-pointer items-center justify-center w-9 h-9 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm border border-red-100"
                    aria-label="Delete Listing"
                    title="Delete Listing"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ShowListing;
