/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Controller, Control, FieldError } from "react-hook-form";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  name: string;
  label?: string;
  required?: boolean;
  control: Control<any>;
  error?: FieldError;
  options: SelectOption[];
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  name,
  label,
  required = false,
  control,
  error,
  options,
  className = "",
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && "*"}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <select
            {...field}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              error ? "border-red-500" : ""
            }`}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};

export default Select;
