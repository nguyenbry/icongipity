import React, { forwardRef } from "react";

type BaseButtonProperties = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>; // got this type by hovering over a <button> element and this is what it said

const COLORS = {
  blue: "bg-blue-900 text-blue-200",
  cyan: "bg-cyan-600 hover:bg-cyan-500",
  red: "bg-red-600 hover:bg-red-500",
};

export const IconButton = forwardRef<
  HTMLButtonElement,
  BaseButtonProperties & {
    color?: keyof typeof COLORS;
  }
>(function IconButton(properties, reference) {
  const { children, color, ...rest } = properties;
  return (
    <button
      ref={reference}
      {...rest}
      className={`aspect-square max-w-min whitespace-nowrap rounded-md text-sm font-semibold text-white shadow-sm transition-all  hover:shadow-lg active:px-[1.35rem] active:opacity-50 ${
        COLORS[color ?? "blue"]
      }`}
    >
      {children}
    </button>
  );
});
