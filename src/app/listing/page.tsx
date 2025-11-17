/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BASE_URL } from "@/constant/Constant";
import axios from "axios";
import { toast } from "sonner";
import PrivateRoute from "@/components/private-route/PrivateRoute";
import { useRouter } from "next/navigation";
import { RootState } from "../redux/store";
import { clearEdit } from "../redux/feature/listingEditSlice";
import CreateListingForm from "@/components/listing/Listing";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { editId, editData } = useSelector(
    (state: RootState) => state.listingEdit
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: any) => {
    try {
      setLoading(true);

      if (editId) {
        await axios.put(`${BASE_URL}/api/listing/update/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        toast.success("Listing updated!");
      } else {
        await axios.post(`${BASE_URL}/api/listing/create`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        toast.success("Listing created!");
      }

      dispatch(clearEdit()); // clear Redux edit state
      router.push("/show-listing"); // go to show-listing page
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PrivateRoute>
      <CreateListingForm
        onSubmit={handleSubmit}
        loading={loading}
        initialData={editData || null}
      />
    </PrivateRoute>
  );
};

export default Page;
