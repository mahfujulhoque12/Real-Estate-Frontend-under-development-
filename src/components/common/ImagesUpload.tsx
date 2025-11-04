import React, { useState } from "react";
import Image from "next/image";
import { FaTrash, FaUpload } from "react-icons/fa";

interface ImagesUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
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
  const [internalImages, setInternalImages] = useState<string[]>(images);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: string[] = [];
    const remainingSlots = maxImages - internalImages.length;

    if (files.length > remainingSlots) {
      alert(
        `You can only upload up to ${maxImages} images. ${remainingSlots} slots remaining.`
      );
      return;
    }

    const uploadPromises: Promise<string>[] = [];

    for (let i = 0; i < Math.min(files.length, remainingSlots); i++) {
      const file = files[i];

      const uploadPromise = new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          resolve(result);
        };
        reader.readAsDataURL(file);
      });

      uploadPromises.push(uploadPromise);
    }

    Promise.all(uploadPromises).then((uploadedImages) => {
      const updatedImages = [...internalImages, ...uploadedImages];
      setInternalImages(updatedImages);
      onImagesChange(updatedImages);
    });
  };

  const removeImage = (index: number) => {
    const updatedImages = internalImages.filter((_, i) => i !== index);
    setInternalImages(updatedImages);
    onImagesChange(updatedImages);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

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

  const clearAllImages = () => {
    setInternalImages([]);
    onImagesChange([]);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Images</h2>

      <div className="space-y-4">
        {/* Upload Area */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              {label} {required && "*"}
            </label>
            {internalImages.length > 0 && (
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
              className="hidden"
              disabled={internalImages.length >= maxImages}
            />
            <p className="text-xs text-gray-500 mt-2">
              PNG, JPG, GIF up to 10MB each
            </p>
          </div>

          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>

        {/* Image Preview */}
        {internalImages.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {previewLabel} ({internalImages.length} images)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {internalImages.map((url, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square overflow-hidden rounded-md border border-gray-200">
                    <Image
                      height={200}
                      width={200}
                      src={url}
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
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                    Image {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Image Count */}
        {maxImages && (
          <div className="text-sm text-gray-500">
            {internalImages.length} of {maxImages} images uploaded
            {internalImages.length >= maxImages && (
              <span className="text-red-500 ml-2">Maximum reached</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagesUpload;
