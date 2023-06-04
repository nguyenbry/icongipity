import React, { forwardRef } from "react";
import { type VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex justify-center border whitespace-nowrap rounded-lg text-xs font-semibold transition-all active:scale-95 active:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-xindigo-3 border-xindigo-7 text-xindigo-11 shadow-sm hover:border-xindigo-8 hover:bg-xindigo-4",
        danger:
          "bg-xred-3 border-xred-7 text-xred-11 shadow-sm hover:border-xred-8 hover:bg-xred-4",
        success:
          "bg-xmint-3 border-xmint-7 text-xmint-11 shadow-sm hover:border-xmint-8 hover:bg-xmint-4",
        transparent: "bg-transparent border-transparent hover:bg-xindigo-3",
      },
      size: {
        small: "px-4 py-[0.4rem] md:px-[1.4rem] md:py-2 md:text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "small",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { variant, size, className, ...rest } = props;
    return (
      <button
        ref={ref}
        {...rest}
        className={buttonVariants({ variant, size, className })}
      />
    );
  }
);

Button.displayName = "Button";
