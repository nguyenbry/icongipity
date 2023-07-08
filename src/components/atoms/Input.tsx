import React, { forwardRef } from "react";

export type InputProps = React.ComponentProps<"input">;

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <input
      ref={ref}
      {...rest}
      className={`h-12 w-full rounded-xl border border-xindigo-7 bg-transparent px-5 text-sm ring-xindigo-9 ring-offset-4 ring-offset-xindigo-2 hover:border-xindigo-8 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${
        className ?? ""
      }`}
    />
  );
});

Input.displayName = "Input";
