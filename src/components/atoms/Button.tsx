import React, { forwardRef } from "react";

type BaseButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>; // got this type by hovering over a <button> element and this is what it said

const COLORS = {
  blue: "bg-blue-600 hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 text-white",
  cyan: "bg-cyan-600 hover:bg-cyan-500 dark:bg-cyan-700 dark:hover:bg-cyan-600 text-white",
  red: "bg-red-600 hover:bg-red-500 dark:bg-red-700 dark:hover:bg-red-600 text-white",
  transparent:
    "bg-transparent dark:hover:bg-neutral-800 hover:bg-gray-200 text-black dark:text-white !shadow-none",
};

export const Button = forwardRef<
  HTMLButtonElement,
  BaseButtonProps & {
    color?: keyof typeof COLORS;
  }
>(function Button(props, ref) {
  const { children, color, className, ...rest } = props;
  return (
    <button
      ref={ref}
      {...rest}
      className={`max-w-min whitespace-nowrap rounded-lg px-[1.4rem] py-2 text-sm font-semibold shadow-sm transition-all hover:shadow-lg active:scale-95 active:opacity-50 ${
        COLORS[color ?? "blue"]
      } ${className ?? ""}`}
    >
      {children}
    </button>
  );
});
