
import { toast as sonnerToast, type ExternalToast } from "sonner";
import * as React from "react";

// Define the toast types based on the expected props
type ToastProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: "default" | "destructive";
  action?: React.ReactNode;
};

// Create a custom hook that provides a toast function compatible with both sonner and our custom UI
export function useToast() {
  const toasts = React.useState<ToastProps[]>([]);

  function toast(props: ToastProps) {
    // Use sonner toast for actual display
    sonnerToast(props.title as string, {
      description: props.description,
      // Map our variant to sonner's type
      ...(props.variant === "destructive" ? { style: { backgroundColor: 'var(--destructive)', color: 'var(--destructive-foreground)' } } : {}),
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
