import React, { forwardRef } from "react";

type BaseButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>; // got this type by hovering over a <button> element and this is what it said

const COLORS = {
  blue: "bg-blue-900 text-blue-200 saturate-200",
  cyan: "bg-cyan-600 hover:bg-cyan-500",
  red: "bg-red-600 hover:bg-red-500",
};

export const IconButton = forwardRef<
  HTMLButtonElement,
  BaseButtonProps & {
    color?: keyof typeof COLORS;
  }
>(function IconButton(props, ref) {
  const { children, color, ...rest } = props;
  return (
    <button
      ref={ref}
      {...rest}
      className={`aspect-square max-w-min whitespace-nowrap rounded-md text-sm font-semibold text-white shadow-sm transition-all  hover:shadow-lg active:px-[1.35rem] active:opacity-50 ${
        COLORS[color ?? "blue"]
      }`}
    >
      {children}
    </button>
  );
});
