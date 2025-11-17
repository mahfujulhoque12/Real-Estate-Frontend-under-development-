/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";

import React from "react";

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
    <div className="p-6 grid gap-10 md:grid-cols-2 lg:grid-cols-3 bg-gray-50 min-h-screen">
      {listings.map((listing) => (
        <div
          key={listing._id}
          className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border group"
        >
          <div className="relative">
            {listing.imageUrls?.length > 0 ? (
              <div className="grid grid-cols-4 gap-1 h-64">
                {listing.imageUrls.map((img, i) => (
                  <Image
                    width={500}
                    height={400}
                    key={i}
                    src={img}
                    alt={`${listing.name}-${i}`}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 bg-gray-100 text-gray-400">
                No images
              </div>
            )}

            {listing.offer && (
              <span className="absolute top-3 left-3 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                OFFER
              </span>
            )}
          </div>

          <div className="p-5">
            <h2 className="text-xl font-semibold text-gray-800 mb-1 group-hover:text-emerald-600 transition-colors">
              {listing.name}
            </h2>
            <p className="text-gray-600 text-sm mb-3 line-clamp-3">
              {listing.description}
            </p>

            <div className="flex justify-between items-center mb-3">
              <span className="text-xl font-bold text-emerald-600">
                ${listing.discountPrice || listing.regularPrice}
              </span>
              <span className="text-sm text-gray-500 font-medium">
                {listing.type.charAt(0).toUpperCase() + listing.type.slice(1)}
              </span>
            </div>

            <p className="text-sm text-gray-500 mb-4 flex items-center gap-1">
              <span className="text-lg">📍</span> {listing.address}
            </p>

            <div className="flex flex-wrap gap-2 text-xs text-gray-700">
              <span className="bg-gray-100 px-2.5 py-1 rounded-md shadow-sm">
                🛏️ {listing.bedroom} Beds
              </span>
              <span className="bg-gray-100 px-2.5 py-1 rounded-md shadow-sm">
                🛁 {listing.bathroom} Baths
              </span>
              {listing.parking && (
                <span className="bg-gray-100 px-2.5 py-1 rounded-md shadow-sm">
                  🚗 Parking
                </span>
              )}
              {listing.furnished && (
                <span className="bg-gray-100 px-2.5 py-1 rounded-md shadow-sm">
                  🪑 Furnished
                </span>
              )}
            </div>

            <div className="flex justify-between items-center p-4 border-t mt-3">
              <button
                onClick={() => handleEdit(listing)}
                className="px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 transition"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(listing._id)}
                className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowListing;
