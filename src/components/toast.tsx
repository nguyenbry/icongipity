import * as Toast from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";

const toastVariant = cva("rounded-md border px-4 py-3 w-full md:w-96", {
  variants: {
    variant: {
      success: "border-xmint-8 bg-xmint-3 text-xmint-11",
      primary: "border-xindigo-8 bg-xindigo-3 text-xindigo-11",
      danger: "border-red-8 bg-red-3 text-red-11",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export const MyToast: React.FC<
  {
    isOpen: boolean;
    setIsOpen: (v: boolean) => void;
  } & VariantProps<typeof toastVariant>
> = ({ isOpen, setIsOpen, variant }) => {
  return (
    <>
      <Toast.Root
        className={toastVariant({ variant })}
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <Toast.Title className="w- text-lg font-bold">Toast title</Toast.Title>
        <Toast.Description>Toast description</Toast.Description>
        {/* <Toast.Action
          className="ToastAction"
          asChild
          altText="Goto schedule to undo"
        >
          <Button>Toast Action</Button>
        </Toast.Action> */}
      </Toast.Root>

      <Toast.Viewport className="fixed left-0 right-0 top-4 z-[3] px-4 md:bottom-4 md:right-auto md:top-auto" />
      {/* unset top and right when we're on bigger screens */}
    </>
  );
};
