
import { ReactNode } from "react";
import { usePermissions } from "@/hooks/usePermissions";
import { Role } from "@/context/auth/types";

interface PermissionGuardProps {
  children: ReactNode;
  requiredRole?: Role;
  businessId?: string;
  featureKey?: string;
  fallback?: ReactNode;
}

/**
 * A component that conditionally renders its children based on user permissions
 */
const PermissionGuard = ({ 
  children, 
  requiredRole,
  businessId,
  featureKey,
  fallback = null 
}: PermissionGuardProps) => {
  const { checkPermission } = usePermissions();
  
  const hasPermission = checkPermission({
    requiredRole,
    businessId,
    featureKey
  });

  if (!hasPermission) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default PermissionGuard;
