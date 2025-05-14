
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const OrdersNoBusinessWarning = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <AlertCircle className="h-12 w-12 text-amber-500 mb-4" />
      <h2 className="text-xl font-semibold mb-2">No Business Associated</h2>
      <p className="text-muted-foreground mb-4">
        Your account is not associated with any business. Orders functionality is unavailable.
      </p>
      <Button 
        variant="outline" 
        size="sm" 
        className="mt-2 bg-white border-amber-300 text-amber-700 hover:bg-amber-100"
        onClick={() => toast("Account setup required", {
          description: "Please contact an administrator to link your account to a business."
        })}
      >
        Learn More
      </Button>
    </div>
  );
};
