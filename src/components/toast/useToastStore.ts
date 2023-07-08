import { create } from "zustand";
import { v4 } from "uuid";
import { type ToastVariantOptions } from "./toastVariants";

type Toast = {
  title: string;
  description: string;
  id: string;
  meta?: string; // any extra data you want to pass to the toast (maybe to prevent duplicates)
} & ToastVariantOptions;

type ToastStore = {
  toasts: Toast[];
};

export const useToastStore = create<ToastStore>(() => {
  return {
    toasts: [],
  };
});

export function addToast(t: Omit<Toast, "id">) {
  useToastStore.setState((state) => ({
    toasts: [...state.toasts, { ...t, id: v4() }],
  }));
}

export function removeToast(t: Toast) {
  useToastStore.setState(({ toasts }) => {
    const filtered = toasts.filter((toast) => toast !== t);

    if (filtered.length === toasts.length) {
      throw new Error("Toast not found");
    }
    return {
      toasts: filtered,
    };
  });
}
