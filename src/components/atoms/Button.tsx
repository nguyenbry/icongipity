import React, { forwardRef } from "react";
import { COLORS, type Color } from "./types";

type BaseButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>; // got this type by hovering over a <button> element and this is what it said

export const Button = forwardRef<
  HTMLButtonElement,
  BaseButtonProps & {
    color?: Color;
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
