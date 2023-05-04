import React, { forwardRef } from "react";

export type InputProps = React.ComponentProps<"input">;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  props,
  ref
) {
  const { className, ...rest } = props;
  return (
    <input
      ref={ref}
      {...rest}
      className={`h-12 w-full rounded-xl border border-neutral-300 bg-transparent px-5 text-sm ring-teal-300 ring-offset-8 focus:outline-none focus:ring-2 dark:ring-offset-neutral-900 ${
        className ?? ""
      }`}
    />
  );
});
