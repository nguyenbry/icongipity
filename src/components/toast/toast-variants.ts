import { cva, type VariantProps } from "class-variance-authority";

export const toastVariant = cva("rounded-md border px-4 py-3 w-full md:w-96", {
  variants: {
    variant: {
      success: "border-xmint-8 bg-xmint-3 text-xmint-11",
      primary: "border-xindigo-8 bg-xindigo-3 text-xindigo-11",
      danger: "border-xred-8 bg-xred-3 text-xred-11",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export type ToastVariantOptions = VariantProps<typeof toastVariant>;
