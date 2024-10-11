import React from "react";
import { ReactNode } from "react";
import { cn } from "@/utils/cn";

const BTN_VARIANTS = {
  filled:
    "bg-blue-500 hover:bg-gray-700 text-white focus:ring-4 focus:ring-gray-200",
  outlined: `border border-blue-100 text-primary hover:bg-gray-100 focus:ring-4 focus:ring-gray-200`,
  outlinedRed: `border border-[#E04C38] text-[#E04C38] hover:bg-red-100 focus:ring-4 focus:ring-gray-200`,
  text: "bg-gray-600 bg-opacity-0 text-primary hover:bg-opacity-10",
};
const LOADER_VARIANTS = {
  filled: "text-white animate-spin",
  outlined: "text-gray-600 animate-spin",
  outlinedRed: "text-[#E04C38] animate-spin",
  text: "text-gray-600 animate-spin",
};

type buttonProps = {
  variant?: "filled" | "outlined" | "text" | "outlinedRed";
  full?: boolean;
  onClick?: () => void;
  className?: string;
  loading?: boolean;
  small?: boolean;
  disabled?: boolean;
  type?: "button" | "submit";
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  children: ReactNode;
};
export default function Button({
  variant = "filled",
  full = false,
  onClick,
  className,
  loading,
  small,
  disabled,
  type = "button",
  rightIcon,
  leftIcon,
  children,
}: buttonProps) {
  const _className = cn(
    "py-[10px] rounded-md transition duration-100 inline-flex items-center whitespace-nowrap",
    {
      "opacity-50 pointer-events-none cursor-not-allowed": disabled,
      "opacity-80 pointer-events-none cursor-default": loading,
      "flex w-full justify-center": full,
      "px-[14px] text-sm": small,
      "px-[18px] ": !small,
    },
    BTN_VARIANTS[variant],
    className
  );
  return (
    <button
      onClick={!disabled && !loading ? onClick : undefined}
      type={type}
      className={_className}
      disabled={disabled || loading}
    >
      {loading ? (
        <span className="mx-auto">
          <span className={LOADER_VARIANTS[variant]}>loading...</span>
        </span>
      ) : (
        <>
          {!!leftIcon && <>{leftIcon}</>}
          <span>{children}</span>
          {!!rightIcon && <>{rightIcon}</>}
        </>
      )}
    </button>
  );
}
