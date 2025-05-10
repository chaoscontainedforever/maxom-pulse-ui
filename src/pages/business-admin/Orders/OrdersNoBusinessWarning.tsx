
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export const OrdersNoBusinessWarning = () => {
  return (
    <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start">
      <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
      <div className="text-sm text-amber-800">
        <p className="font-semibold mb-1">Demo Mode Active</p>
        <p>Your user account isn't linked to a business. Sample order data is being displayed.</p>
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-2 bg-white border-amber-300 text-amber-700 hover:bg-amber-100"
          onClick={() => toast({
            title: "Account setup required",
            description: "Please contact an administrator to link your account to a business.",
          })}
        >
          Request Business Setup
        </Button>
      </div>
    </div>
  );
};
