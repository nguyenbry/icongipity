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
      className={`h-12 w-full rounded-xl border border-black bg-transparent px-5 text-sm ring-black ring-offset-8 ring-offset-sand focus:outline-none focus:ring-2 dark:border-neutral-300 dark:ring-sand dark:ring-offset-neutral-900 ${
        className ?? ""
      }`}
    />
  );
});
