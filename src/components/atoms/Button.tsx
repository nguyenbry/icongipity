import classNames from "classnames";
import React, { forwardRef } from "react";

type BaseButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>; // got this type by hovering over a <button> element and this is what it said

const COLORS = {
  blue: "bg-blue-600 hover:bg-blue-500",
  cyan: "bg-cyan-600 hover:bg-cyan-500",
  red: "bg-red-600 hover:bg-red-500 dark:bg-red-800 dark:hover:bg-red-700",
};

export const Button = forwardRef<
  HTMLButtonElement,
  BaseButtonProps & {
    color?: keyof typeof COLORS;
  }
>(function Button(props, ref) {
  const { children, color, ...rest } = props;
  return (
    <button
      ref={ref}
      {...rest}
      className={`max-w-min whitespace-nowrap rounded-lg px-[1.4rem] py-2 text-sm font-semibold text-white shadow-sm transition-all  hover:shadow-lg active:px-[1.35rem] active:opacity-50 ${
        COLORS[color ?? "blue"]
      }`}
    >
      {children}
    </button>
  );
});
