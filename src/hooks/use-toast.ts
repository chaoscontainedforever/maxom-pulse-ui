
import { toast as sonnerToast } from "sonner";

import { useToast as useToastShadcn } from "@/components/ui/use-toast";

// Re-export the hook from shadcn/ui
export const useToast = useToastShadcn;

// Re-export the toast function from sonner for direct use
export const toast = sonnerToast;
