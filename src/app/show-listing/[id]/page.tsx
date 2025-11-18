"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { BASE_URL } from "@/constant/Constant";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  FaBed,
  FaBath,
  FaCar,
  FaCouch,
  FaTag,
  FaHome,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { IoIosImages } from "react-icons/io";

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

const SingleListingPage = () => {
  const params = useParams();
  const { id } = params;
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setError(null);
        const res = await axios.get(`${BASE_URL}/api/listing/${id}`);
        setListing(res.data);
      } catch (err) {
        console.error("Failed to fetch listing:", err);
        setError("Failed to load listing. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchListing();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-96 bg-gray-200 rounded-xl animate-pulse"></div>
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-4/5 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="bg-red-50 text-red-700 p-6 rounded-lg border border-red-200">
          <h2 className="text-xl font-semibold mb-2">Unable to Load Listing</h2>
          <p>{error || "Listing not found"}</p>
        </div>
      </div>
    );
  }

  const displayPrice = listing.discountPrice || listing.regularPrice;
  const hasDiscount = listing.offer && listing.discountPrice;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {listing.name}
          </h1>
          <div className="flex items-center gap-3">
            {listing.offer && (
              <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1">
                <FaTag className="text-xs" />
                Special Offer
              </span>
            )}
            <span className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full capitalize flex items-center gap-1">
              <FaHome className="text-xs" />
              {listing.type}
            </span>
          </div>
        </div>
        <p className="text-gray-600 text-lg flex items-center gap-2">
          <FaMapMarkerAlt className="text-red-500" />
          {listing.address}
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Carousel Section */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <Carousel className="w-full">
              <CarouselContent>
                {listing.imageUrls.map((img, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={img}
                        alt={`${listing.name} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                        priority={index === 0}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 bg-white/90 hover:bg-white border-0 shadow-md hover:shadow-lg transition-all duration-200" />
              <CarouselNext className="right-4 bg-white/90 hover:bg-white border-0 shadow-md hover:shadow-lg transition-all duration-200" />
            </Carousel>
          </div>

          {/* Image Counter */}
          {listing.imageUrls.length > 1 && (
            <div className="text-center text-sm text-gray-500 flex items-center justify-center gap-1">
              <IoIosImages className="text-lg" />
              {listing.imageUrls.length} photos
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          {/* Price Section */}
          <div className="space-y-2 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-gray-200">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900">
                ${displayPrice.toLocaleString()}
              </span>
              {hasDiscount && (
                <span className="text-lg text-gray-500 line-through">
                  ${listing.regularPrice.toLocaleString()}
                </span>
              )}
            </div>
            {hasDiscount && (
              <div className="text-green-600 font-semibold">
                Save $
                {(
                  listing.regularPrice - listing.discountPrice!
                ).toLocaleString()}
                !
              </div>
            )}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-2xl mb-2 text-blue-600">
                <FaBed />
              </div>
              <div className="font-semibold text-gray-900">
                {listing.bedroom}
              </div>
              <div className="text-sm text-gray-600">Bedrooms</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-2xl mb-2 text-green-600">
                <FaBath />
              </div>
              <div className="font-semibold text-gray-900">
                {listing.bathroom}
              </div>
              <div className="text-sm text-gray-600">Bathrooms</div>
            </div>
            {listing.parking && (
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl mb-2 text-purple-600">
                  <FaCar />
                </div>
                <div className="font-semibold text-gray-900">Parking</div>
                <div className="text-sm text-gray-600">Available</div>
              </div>
            )}
            {listing.furnished && (
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl mb-2 text-orange-600">
                  <FaCouch />
                </div>
                <div className="font-semibold text-gray-900">Furnished</div>
                <div className="text-sm text-gray-600">Included</div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* ---------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Additional Details */}
        <div className="space-y-3 p-6 bg-white border border-gray-200 rounded-xl">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FaHome className="text-blue-600" />
            Property Details
          </h3>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600 flex items-center gap-2">
              <FaHome className="text-gray-400" />
              Property Type
            </span>
            <span className="font-medium capitalize">{listing.type}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600 flex items-center gap-2">
              <FaCouch className="text-gray-400" />
              Furnishing
            </span>
            <span className="font-medium">
              {listing.furnished ? "Furnished" : "Unfurnished"}
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-600 flex items-center gap-2">
              <FaCar className="text-gray-400" />
              Parking
            </span>
            <span className="font-medium">
              {listing.parking ? "Available" : "Not Available"}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-4 border border-gray-200 bg-white p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-gray-900">Description</h3>
          <p className="text-gray-700 leading-relaxed">{listing.description}</p>
        </div>
        {/* Description  end*/}
      </div>
      {/* ---------------- */}
    </div>
  );
};

export default SingleListingPage;
