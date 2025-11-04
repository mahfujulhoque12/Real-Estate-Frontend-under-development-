/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { UseFormRegister, FieldError } from "react-hook-form";

interface InputProps {
  type?: "text" | "number" | "email" | "password" | "tel" | "url";
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  register: UseFormRegister<any>;
  error?: FieldError;
  min?: number;
  max?: number;
  step?: number;
  icon?: React.ReactNode;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  name,
  label,
  placeholder,
  required = false,
  register,
  error,
  min,
  max,
  step,
  icon,
  className = "",
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && "*"}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          {...register(name, {
            required: required ? `${label || name} is required` : false,
            min:
              min !== undefined
                ? { value: min, message: `Minimum value is ${min}` }
                : undefined,
            max:
              max !== undefined
                ? { value: max, message: `Maximum value is ${max}` }
                : undefined,
          })}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            icon ? "pl-10" : ""
          } ${error ? "border-red-500" : ""}`}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};

export default Input;
