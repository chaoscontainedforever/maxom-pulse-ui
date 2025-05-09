
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";

// Component for the support widget in the sidebar footer
export const SupportWidget = () => {
  const { profile } = useAuth();
  const businessType = profile?.business_type || 'none';

  return (
    <div className="rounded-md bg-sidebar-accent/50 p-3">
      <h4 className="text-sm font-medium mb-2 text-sidebar-foreground">Need Help?</h4>
      <p className="text-xs text-sidebar-foreground">
        Contact our support team for assistance with any issues.
      </p>
      <Button variant="outline" size="sm" className="w-full mt-3">
        Contact Support
      </Button>
      
      {/* Debug info - remove in production */}
      <div className="mt-2 border-t border-dashed border-sidebar-border pt-2">
        <p className="text-xs text-sidebar-foreground/70">
          Business Type: <strong>{businessType}</strong>
        </p>
      </div>
    </div>
  );
};
