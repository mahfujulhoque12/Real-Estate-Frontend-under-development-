/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Controller, Control, FieldError } from "react-hook-form";

interface CheckboxProps {
  name: string;
  label: string;
  control: Control<any>;
  error?: FieldError;
  icon?: React.ReactNode;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  name,
  label,
  control,
  error,
  icon,
  className = "",
}) => {
  return (
    <div className={className}>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange, onBlur, ref } }) => (
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={value}
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700 flex items-center">
              {icon && <span className="mr-1">{icon}</span>}
              {label}
            </span>
          </label>
        )}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};

export default Checkbox;
