"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaTrash, FaUpload } from "react-icons/fa";

type ImageType = File | string; // Can be a File object (new upload) or string URL (existing image)

interface ImagesUploadProps {
  images: ImageType[]; // File[] | string[]
  onImagesChange: (images: ImageType[]) => void;
  maxImages?: number;
  required?: boolean;
  error?: string;
  label?: string;
  previewLabel?: string;
}

const ImagesUpload: React.FC<ImagesUploadProps> = ({
  images = [],
  onImagesChange,
  maxImages = 10,
  required = false,
  error,
  label = "Upload Images",
  previewLabel = "Image Previews",
}) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // Initialize previewUrls whenever images change
  useEffect(() => {
    const urls = images.map((img) =>
      typeof img === "string" ? img : URL.createObjectURL(img)
    );
    setPreviewUrls(urls);

    // Cleanup old URLs when component unmounts or images change
    return () => {
      urls.forEach((url, i) => {
        if (typeof images[i] !== "string") URL.revokeObjectURL(url);
      });
    };
  }, [images]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const remainingSlots = maxImages - images.length;

    if (fileArray.length > remainingSlots) {
      alert(
        `You can only upload up to ${maxImages} images. ${remainingSlots} slots remaining.`
      );
      return;
    }

    const filesToAdd = fileArray.slice(0, remainingSlots);
    const updatedImages = [...images, ...filesToAdd];
    onImagesChange(updatedImages);
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);

    // Revoke preview URL if it's a File object
    if (typeof images[index] !== "string") {
      URL.revokeObjectURL(previewUrls[index]);
    }

    onImagesChange(updatedImages);
  };

  const clearAllImages = () => {
    images.forEach((img, i) => {
      if (typeof img !== "string") URL.revokeObjectURL(previewUrls[i]);
    });
    onImagesChange([]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) =>
    e.preventDefault();
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const inputEvent = {
        target: { files },
      } as React.ChangeEvent<HTMLInputElement>;
      handleImageUpload(inputEvent);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{label}</h2>

      <div className="space-y-4">
        {/* Upload Area */}
        <div>
          <div className="flex items-center justify-between mb-2">
            {required && <span className="text-red-500">*</span>}
            {images.length > 0 && (
              <button
                type="button"
                onClick={clearAllImages}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Clear All
              </button>
            )}
          </div>

          {maxImages && (
            <p className="text-sm text-gray-500 mb-2">
              Maximum {maxImages} images allowed
            </p>
          )}

          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:border-primary transition-colors cursor-pointer"
            onClick={() => document.getElementById("image-upload")?.click()}
          >
            <FaUpload className="mx-auto h-8 w-8 text-primary" />
            <div className="mt-4">
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Drag and drop images or{" "}
                <span className="text-blue-600 hover:text-blue-500">
                  browse files
                </span>
              </span>
            </div>
            <input
              id="image-upload"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              name="imageUrls[]"
              className="hidden"
              disabled={images.length >= maxImages}
            />
            <p className="text-xs text-gray-500 mt-2">
              PNG, JPG, GIF up to 10MB each
            </p>
          </div>

          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>

        {/* Image Preview */}
        {images.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {previewLabel} ({images.length} images)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((img, index) => {
                const src = typeof img === "string" ? img : previewUrls[index];
                if (!src) return null;

                return (
                  <div key={index} className="relative group">
                    <div className="aspect-square overflow-hidden rounded-md border border-gray-200">
                      <Image
                        height={200}
                        width={200}
                        src={src}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(index);
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                    >
                      <FaTrash className="w-3 h-3" />
                    </button>

                    {/* Show file name only for File objects */}
                    {typeof img !== "string" && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center">
                        {img.name}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {maxImages && (
          <div className="text-sm text-gray-500">
            {images.length} of {maxImages} images uploaded
            {images.length >= maxImages && (
              <span className="text-red-500 ml-2">Maximum reached</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagesUpload;
