"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import Listing from "@/components/listing/Listing";
import PrivateRoute from "@/components/private-route/PrivateRoute";
import { BASE_URL } from "@/constant/Constant";
import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Page = () => {
  const router = useRouter();

  const handleSubmit = async (listingData: any) => {
    try {
      console.log("Submitting listing data:", listingData);

      const response = await axios.post(
        `${BASE_URL}/api/listing/create`,
        listingData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Listing created successfully!");
        // router.push("/listings");
      }
    } catch (error: any) {
      console.error("Error creating listing:", error);
      toast.error(error.response?.data?.message || "Failed to create listing");
    }
  };

  return (
    <PrivateRoute>
      <Listing onSubmit={handleSubmit} />
    </PrivateRoute>
  );
};

export default Page;
