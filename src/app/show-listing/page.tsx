"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import ShowListing from "@/components/show-listing/ShowListing";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEditData, setEditId } from "../redux/feature/listingEditSlice";
import { toast } from "sonner";
import { BASE_URL } from "@/constant/Constant";
import axios from "axios";
import {
  FaSignInAlt,
  FaHome,
  FaLock,
  FaExclamationTriangle,
} from "react-icons/fa";
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

const Page = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const handleEdit = (listing: any) => {
    dispatch(setEditId(listing._id));
    dispatch(setEditData(listing));
    toast.info("Editing listing...");
    router.push("/listing");
  };

  const handleDelete = async (id: string) => {
    toast.warning("Are you sure you want to delete this listing?", {
      action: {
        label: "Yes",
        onClick: async () => {
          try {
            await axios.delete(`${BASE_URL}/api/listing/delete/${id}`, {
              withCredentials: true,
            });
            toast.success("Listing deleted successfully!");
            setListings((prev) => prev.filter((l) => l._id !== id));
          } catch (error: any) {
            toast.error(error?.response?.data?.message || "Delete failed");
          }
        },
      },
    });
  };

  useEffect(() => {
    const fetchListings = async () => {
      try {
        if (!currentUser?._id && !currentUser?.id) {
          setError("User not logged in");
          setLoading(false);
          return;
        }

        const userId = currentUser._id || currentUser.id;
        const res = await axios.get(`${BASE_URL}/api/user/listings/${userId}`, {
          withCredentials: true,
        });

        setListings(res.data);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to fetch listings");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [currentUser]);

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-6">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-[#68d8ca] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <FaHome className="text-[#68d8ca] text-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-800">
              Loading Your Listings
            </h3>
            <p className="text-gray-600">
              We&lsquo;re gathering your property information...
            </p>
          </div>
        </div>
      </div>
    );

  if (error && error === "User not logged in")
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center border border-gray-100">
            {/* Icon */}
            <div className="relative mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto">
                <div className="relative">
                  <FaLock className="text-red-500 text-4xl" />
                  <FaExclamationTriangle className="text-yellow-500 text-xl absolute -top-2 -right-2" />
                </div>
              </div>
            </div>

            {/* Message */}
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Access Required
            </h2>
            <p className="text-gray-600 mb-2 leading-relaxed">
              You need to be logged in to view your property listings.
            </p>
            <p className="text-gray-500 text-sm mb-8">
              Sign in to manage your listings and access exclusive features.
            </p>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Link
                href={"/sign-in"}
                className="w-full bg-gradient-to-r from-[#68d8ca] to-[#c5eee1] text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
              >
                <FaSignInAlt className="text-lg" />
                Sign In to Continue
              </Link>

              <Link
                href={"/"}
                className="w-full border-2 border-[#68d8ca] text-[#68d8ca] py-4 rounded-xl font-semibold hover:bg-[#c5eee1] hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <FaHome className="text-lg" />
                Back to Home
              </Link>
            </div>

            {/* Additional Info */}
            <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-blue-700 text-sm flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                New user? Create an account to start listing properties
              </p>
            </div>
          </div>
        </div>
      </div>
    );

  if (error && error !== "User not logged in")
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center border border-gray-100">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaExclamationTriangle className="text-red-500 text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Oops! Something Went Wrong
            </h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#68d8ca] text-white px-6 py-3 rounded-lg hover:bg-[#5bc4b7] transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );

  if (listings.length === 0)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <div className="w-24 h-24 bg-gradient-to-br from-[#68d8ca] to-[#c5eee1] rounded-full flex items-center justify-center mx-auto mb-6">
              <FaHome className="text-white text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              No Listings Yet
            </h3>
            <p className="text-gray-600 mb-2">
              You haven&lsquo;t created any property listings yet.
            </p>
            <p className="text-gray-500 text-sm mb-8">
              Start by creating your first listing!
            </p>
            <button
              onClick={() => router.push("/listing")}
              className="w-full bg-gradient-to-r from-[#68d8ca] to-[#c5eee1] text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Create Your First Listing
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            My Properties
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Manage your property listings and track their performance
          </p>
        </div>

        {/* Listings */}
        <ShowListing
          listings={listings}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Page;
