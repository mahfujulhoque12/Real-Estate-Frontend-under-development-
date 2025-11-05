"use client";
import { Listing } from "@/respons-type/response.type";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  FaBed,
  FaBath,
  FaParking,
  FaChair,
  FaDollarSign,
  FaHome,
  FaTag,
} from "react-icons/fa";
import ImagesUpload from "../common/ImagesUpload";
import Input from "../common/Input";
import Textarea from "../common/Textarea";
import Select from "../common/Select";
import Checkbox from "../common/Checkbox";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

interface CreateListingFormProps {
  onSubmit: (
    listingData: Omit<Listing, "_id" | "createdAt" | "updatedAt">
  ) => void;
  loading?: boolean;
  initialData?: Partial<Listing>;
}

type FormData = Omit<Listing, "_id" | "createdAt" | "updatedAt">;

const CreateListingForm: React.FC<CreateListingFormProps> = ({
  onSubmit,
  loading = false,
  initialData,
}) => {
  const [imageUrls, setImageUrls] = useState<string[]>(
    initialData?.imageUrls || []
  );
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      address: initialData?.address || "",
      regularPrice: initialData?.regularPrice || 0,
      discountPrice: initialData?.discountPrice || 0,
      bathroom: initialData?.bathroom || 1,
      bedroom: initialData?.bedroom || 1,
      furnished: initialData?.furnished || false,
      parking: initialData?.parking || false,
      type: initialData?.type || "rent",
      offer: initialData?.offer || false,
      userRef: initialData?.userRef || "",
    },
  });

  const watchOffer = watch("offer");

  useEffect(() => {
    if (currentUser?._id) {
      setValue("userRef", currentUser._id);
    }
  }, [currentUser, setValue]);

  const onFormSubmit = (data: FormData) => {
    const submitData = {
      ...data,
      imageUrls: imageUrls,
    };
    onSubmit(submitData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create Listing</h1>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <FaHome className="mr-2 text-primary" />
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <Input
              type="text"
              name="name"
              label="Property Name"
              placeholder="Enter property name"
              required={true}
              register={register}
              error={errors.name}
              className="col-span-2"
            />

            {/* Description */}
            <Textarea
              name="description"
              label="Description"
              placeholder="Describe your property..."
              required={true}
              register={register}
              error={errors.description}
              className="col-span-2"
            />

            {/* Address */}
            <Input
              type="text"
              name="address"
              label="Address"
              placeholder="Enter full address"
              required={true}
              register={register}
              error={errors.address}
              className="col-span-2"
            />

            {/* Type */}
            <Select
              name="type"
              label="Listing Type"
              required={true}
              control={control}
              error={errors.type}
              options={[
                { value: "rent", label: "For Rent" },
                { value: "sale", label: "For Sale" },
              ]}
            />

            {/* Offer */}
            <Checkbox
              name="offer"
              label="Offer Available"
              control={control}
              error={errors.offer}
              icon={<FaTag className="text-primary" />}
              className="flex items-center"
            />
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <FaDollarSign className="mr-2 text-primary" />
            Pricing
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Regular Price */}
            <Input
              type="number"
              name="regularPrice"
              label="Regular Price"
              placeholder="0.00"
              required={true}
              register={register}
              error={errors.regularPrice}
              min={1}
              icon={<span className="text-gray-500">$</span>}
            />

            {/* Discount Price */}
            {watchOffer && (
              <Input
                type="number"
                name="discountPrice"
                label="Discount Price"
                placeholder="0.00"
                required={true}
                register={register}
                error={errors.discountPrice}
                min={1}
                icon={<span className="text-gray-500">$</span>}
              />
            )}
          </div>
        </div>

        {/* Property Details */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Property Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Bedrooms */}
            <Input
              type="number"
              name="bedroom"
              label="Bedrooms"
              required={true}
              register={register}
              error={errors.bedroom}
              min={1}
              icon={<FaBed className="text-primary" />}
            />

            {/* Bathrooms */}
            <Input
              type="number"
              name="bathroom"
              label="Bathrooms"
              required={true}
              register={register}
              error={errors.bathroom}
              min={1}
              icon={<FaBath className="text-primary" />}
            />

            {/* Features */}
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Features
              </label>
              <div className="flex flex-wrap gap-6">
                <Checkbox
                  name="parking"
                  label="Parking Spot"
                  control={control}
                  error={errors.parking}
                  icon={<FaParking className="text-primary" />}
                />

                <Checkbox
                  name="furnished"
                  label="Furnished"
                  control={control}
                  error={errors.furnished}
                  icon={<FaChair className="text-primary" />}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Images */}
        <ImagesUpload
          images={imageUrls}
          onImagesChange={(images) => setImageUrls(images)}
          maxImages={10}
          required={true}
          error={errors.imageUrls?.message}
        />

        {/* User Reference (Hidden) */}
        <input type="hidden" {...register("userRef")} />

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-primary text-white font-medium rounded-md cursor-pointer hover:bg-primary-dark focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading
              ? "Saving..."
              : initialData
              ? "Update Listing"
              : "Create Listing"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateListingForm;
