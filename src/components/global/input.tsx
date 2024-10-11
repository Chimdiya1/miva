import React, { ChangeEvent, FocusEvent } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { cn } from "@/utils/cn";

type inputProps = {
  type?: "password" | "text" | "email" | "number" | "date";
  name: string;
  title: string;
  placeholder: string;
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  autocomplete?: string;
  register?: UseFormRegisterReturn;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlurHandler?: (e: FocusEvent<HTMLInputElement>) => void;
};

const Input = ({
  type = "text",
  name,
  title,
  placeholder,
  error,
  register,
  className,
  onChange,
  onBlurHandler,
  readOnly = false,
  required = false,
  autocomplete,
  disabled = false,
}: inputProps) => {
  return (
    <div className="w-full font-medium">
      <label className="text-sm text-primary ">
        {title} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          autoComplete={autocomplete}
          readOnly={readOnly}
          className={cn(
            "border border-primary-100 focus-within:outline-black text-gray-800 placeholder:text-gray-400 placeholder:font-light w-full rounded-md mt-2 px-[14px] py-[10px]",
            {
              [`${className}`]: !!className,
            }
          )}
          name={name}
          type={type}
          id={name}
          placeholder={placeholder}
          onChange={
            onChange
              ? (e: ChangeEvent<HTMLInputElement>) => onChange(e)
              : undefined
          }
          onBlur={
            onBlurHandler
              ? (e: FocusEvent<HTMLInputElement>) => onBlurHandler(e)
              : undefined
          }
          {...register}
          disabled={disabled}
        />
      </div>
      {error && (
        <p className="text-yellow-600 mt-1 text-xs font-light">{error}</p>
      )}
    </div>
  );
};

export default Input;
