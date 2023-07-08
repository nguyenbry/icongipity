import * as Toast from "@radix-ui/react-toast";
import { toastVariant } from "./toastVariants";
import { removeToast, useToastStore } from "./useToastStore";

export const AllToasts: React.FC = () => {
  const toasts = useToastStore((s) => s.toasts);

  return (
    <>
      {toasts.map((t) => {
        return (
          <Toast.Root
            key={t.id}
            className={toastVariant({ variant: t.variant })}
            onOpenChange={(bool) => {
              if (!bool) removeToast(t);
            }}
          >
            <Toast.Title className="w- text-lg font-bold">
              {t.title}
            </Toast.Title>
            <Toast.Description>{t.description}</Toast.Description>
            {/* <Toast.Action
          className="ToastAction"
          asChild
          altText="Goto schedule to undo"
        >
          <Button>Toast Action</Button>
        </Toast.Action> */}
          </Toast.Root>
        );
      })}
    </>
  );
};
