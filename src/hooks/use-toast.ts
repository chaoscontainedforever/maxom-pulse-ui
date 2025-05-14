
import { toast as sonnerToast } from "sonner";
import * as React from "react";

// Define the toast types based on the expected props
type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  action?: React.ReactNode;
};

// Create a custom hook that provides a toast function compatible with both sonner and our custom UI
export function useToast() {
  const toasts = React.useState<ToastProps[]>([]);

  function toast(props: ToastProps) {
    // Use sonner toast for actual display
    sonnerToast(props.title, {
      description: props.description,
      // Map our variant to sonner's type
      type: props.variant === "destructive" ? "error" : "default",
      action: props.action,
    });
  }

  return {
    toast,
    toasts: toasts[0],
  };
}

// Re-export sonner's toast for direct use
export { sonnerToast as toast };
