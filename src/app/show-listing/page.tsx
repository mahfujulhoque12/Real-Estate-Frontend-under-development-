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
      <div className="text-center mt-10 text-gray-600">Loading listings...</div>
    );

  if (error)
    return <div className="text-red-500 text-center mt-10">{error}</div>;

  if (listings.length === 0)
    return (
      <div className="text-center mt-10 text-gray-600">No listings found</div>
    );

  return (
    <div>
      <ShowListing
        listings={listings}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Page;
