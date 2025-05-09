
import { Button } from "@/components/ui/button";
import PermissionGuard from "@/components/PermissionGuard";
import { Settings, Users, BarChart2, Lock } from "lucide-react";

interface BusinessAdminActionsProps {
  businessId?: string;
}

const BusinessAdminActions = ({ businessId }: BusinessAdminActionsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <PermissionGuard requiredRole="business_owner">
        <Button variant="outline" className="gap-2">
          <Settings className="h-4 w-4" />
          Configure Settings
        </Button>
      </PermissionGuard>
      
      <PermissionGuard 
        requiredRole="business_owner"
        fallback={
          <Button variant="outline" className="gap-2" disabled>
            <Users className="h-4 w-4" />
            Manage Team (Requires Owner)
          </Button>
        }
      >
        <Button variant="outline" className="gap-2">
          <Users className="h-4 w-4" />
          Manage Team
        </Button>
      </PermissionGuard>
      
      <PermissionGuard featureKey="analytics">
        <Button variant="outline" className="gap-2">
          <BarChart2 className="h-4 w-4" />
          Advanced Analytics
        </Button>
      </PermissionGuard>
      
      <PermissionGuard requiredRole="super_admin">
        <Button variant="outline" className="gap-2">
          <Lock className="h-4 w-4" />
          Admin Controls
        </Button>
      </PermissionGuard>
    </div>
  );
};

export default BusinessAdminActions;
