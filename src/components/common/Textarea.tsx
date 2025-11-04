/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { UseFormRegister, FieldError } from "react-hook-form";

interface TextareaProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  register: UseFormRegister<any>;
  error?: FieldError;
  rows?: number;
  className?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  name,
  label,
  placeholder,
  required = false,
  register,
  error,
  rows = 4,
  className = "",
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && "*"}
        </label>
      )}
      <textarea
        rows={rows}
        {...register(name, {
          required: required ? `${label || name} is required` : false,
        })}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};

export default Textarea;
