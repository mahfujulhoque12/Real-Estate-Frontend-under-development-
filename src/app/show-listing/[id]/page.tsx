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
  FaStar,
  FaShieldAlt,
  FaCalendarCheck,
} from "react-icons/fa";
import { IoIosImages } from "react-icons/io";
import Link from "next/link";

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
      <div className="min-h-screen bg-gradient-to-br from-white via-[#b8eadd] to-[#7edcce] p-6">
        <div className="max-w-6xl mx-auto">
          <div className="h-8 bg-white/50 rounded-xl w-3/4 mb-6 animate-pulse"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-96 bg-white/50 rounded-2xl animate-pulse"></div>
            <div className="space-y-4">
              <div className="h-6 bg-white/50 rounded-xl animate-pulse"></div>
              <div className="h-6 bg-white/50 rounded-xl w-4/5 animate-pulse"></div>
              <div className="h-6 bg-white/50 rounded-xl w-3/4 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-[#b8eadd] to-[#7edcce] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-white/30">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaShieldAlt className="text-red-500 text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Unable to Load Listing
          </h2>
          <p className="text-gray-600">{error || "Listing not found"}</p>
        </div>
      </div>
    );
  }

  const displayPrice = listing.discountPrice || listing.regularPrice;
  const hasDiscount = listing.offer && listing.discountPrice;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white   py-8">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-sm shadow-2xl p-8 border border-white/30">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#7edcce] rounded-full -translate-y-16 translate-x-16 opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#b8eadd] rounded-full translate-y-12 -translate-x-12 opacity-30"></div>

          <div className="relative space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                {listing.name}
              </h1>
              <div className="flex flex-wrap gap-3">
                {listing.offer && (
                  <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-semibold px-4 py-2 rounded-full flex items-center gap-2 shadow-lg transform hover:scale-105 transition-transform duration-200">
                    <FaTag className="text-xs" />
                    Special Offer
                  </span>
                )}
                <span className="bg-gradient-to-r from-[#7edcce] to-[#b8eadd] text-gray-800 text-sm font-semibold px-4 py-2 rounded-full capitalize flex items-center gap-2 shadow-lg">
                  <FaHome className="text-xs" />
                  {listing.type}
                </span>
              </div>
            </div>
            <p className="text-gray-700 text-xl flex items-center gap-3 font-medium">
              <FaMapMarkerAlt className="text-red-500 text-xl" />
              {listing.address}
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Carousel Section */}
          <div className="space-y-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/30">
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
                <CarouselPrevious className="left-4 bg-white/90 backdrop-blur-sm hover:bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-200 text-[#7edcce] hover:text-[#b8eadd]" />
                <CarouselNext className="right-4 bg-white/90 backdrop-blur-sm hover:bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-200 text-[#7edcce] hover:text-[#b8eadd]" />
              </Carousel>
            </div>

            {/* Image Counter */}
            {listing.imageUrls.length > 1 && (
              <div className="text-center text-sm text-gray-700 flex items-center justify-center gap-2 bg-white/80 backdrop-blur-sm py-3 rounded-xl shadow-lg border border-white/30">
                <IoIosImages className="text-lg text-[#7edcce]" />
                <span className="font-medium">
                  {listing.imageUrls.length} Professional Photos
                </span>
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            {/* Price Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-white to-[#b8eadd] rounded-2xl shadow-2xl p-8 border border-white/30">
              <div className="absolute top-4 right-4">
                <FaStar className="text-yellow-400 text-2xl" />
              </div>
              <div className="space-y-3">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-gray-900">
                    ${displayPrice.toLocaleString()}
                  </span>
                  {hasDiscount && (
                    <span className="text-xl text-gray-500 line-through">
                      ${listing.regularPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                {hasDiscount && (
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold px-4 py-2 rounded-xl inline-block shadow-lg">
                    Save $
                    {(
                      listing.regularPrice - listing.discountPrice!
                    ).toLocaleString()}
                    !
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-600">
                  <FaCalendarCheck className="text-[#7edcce]" />
                  <span>Available for immediate viewing</span>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/30">
              <div className="text-center p-6 bg-gradient-to-br from-white to-[#b8eadd] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/50">
                <div className="text-3xl mb-3 text-blue-600">
                  <FaBed />
                </div>
                <div className="font-bold text-2xl text-gray-900">
                  {listing.bedroom}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  Bedrooms
                </div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-white to-[#b8eadd] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/50">
                <div className="text-3xl mb-3 text-green-600">
                  <FaBath />
                </div>
                <div className="font-bold text-2xl text-gray-900">
                  {listing.bathroom}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  Bathrooms
                </div>
              </div>
              {listing.parking && (
                <div className="text-center p-6 bg-gradient-to-br from-white to-[#b8eadd] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/50">
                  <div className="text-3xl mb-3 text-purple-600">
                    <FaCar />
                  </div>
                  <div className="font-bold text-xl text-gray-900">Parking</div>
                  <div className="text-sm text-gray-600 font-medium">
                    Available
                  </div>
                </div>
              )}
              {listing.furnished && (
                <div className="text-center p-6 bg-gradient-to-br from-white to-[#b8eadd] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/50">
                  <div className="text-3xl mb-3 text-orange-600">
                    <FaCouch />
                  </div>
                  <div className="font-bold text-xl text-gray-900">
                    Furnished
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    Included
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Property Details */}
          <div className="space-y-6 p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/30">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-[#7edcce] to-[#b8eadd] rounded-lg">
                <FaHome className="text-white text-xl" />
              </div>
              Property Details
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 px-4 bg-white/50 rounded-xl hover:bg-white/70 transition-colors duration-200">
                <span className="text-gray-700 flex items-center gap-3 font-medium">
                  <FaHome className="text-[#7edcce]" />
                  Property Type
                </span>
                <span className="font-bold text-gray-900 capitalize bg-[#b8eadd] px-3 py-1 rounded-full text-sm">
                  {listing.type}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 px-4 bg-white/50 rounded-xl hover:bg-white/70 transition-colors duration-200">
                <span className="text-gray-700 flex items-center gap-3 font-medium">
                  <FaCouch className="text-[#7edcce]" />
                  Furnishing
                </span>
                <span className="font-bold text-gray-900 bg-[#b8eadd] px-3 py-1 rounded-full text-sm">
                  {listing.furnished ? "Furnished" : "Unfurnished"}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 px-4 bg-white/50 rounded-xl hover:bg-white/70 transition-colors duration-200">
                <span className="text-gray-700 flex items-center gap-3 font-medium">
                  <FaCar className="text-[#7edcce]" />
                  Parking
                </span>
                <span className="font-bold text-gray-900 bg-[#b8eadd] px-3 py-1 rounded-full text-sm">
                  {listing.parking ? "Available" : "Not Available"}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-6 p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/30">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-[#7edcce] to-[#b8eadd] rounded-lg">
                <FaShieldAlt className="text-white text-xl" />
              </div>
              Property Description
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg bg-white/50 p-6 rounded-xl border border-white/50">
              {listing.description}
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center p-8 bg-gradient-to-r from-[#7edcce] to-[#b8eadd] rounded-2xl shadow-2xl border border-white/30">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Interested in this property?
          </h3>
          <p className="text-gray-700 mb-6 text-lg">
            Schedule a viewing today and experience luxury living
          </p>
          <Link
            href={"/contact-us"}
            className="bg-white text-gray-900 font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-white/30"
          >
            Schedule a Viewing
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleListingPage;
