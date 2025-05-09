
import { useAuth } from "@/context/auth";
import { Role } from "@/context/auth/types";

type PermissionCheckProps = {
  requiredRole?: Role;
  businessId?: string;
  featureKey?: string;
};

/**
 * Hook for checking user permissions
 */
export function usePermissions() {
  const { profile } = useAuth();

  /**
   * Check if user has a specific role
   */
  const hasRole = (role: Role): boolean => {
    return profile?.role === role || profile?.role === 'super_admin';
  };

  /**
   * Check if user has at least the required role (role hierarchy)
   */
  const hasMinimumRole = (minimumRole: Role): boolean => {
    if (!profile?.role) return false;
    
    const roleHierarchy: Record<Role, number> = {
      'super_admin': 30,
      'business_owner': 20,
      'employee': 10
    };

    return roleHierarchy[profile.role] >= roleHierarchy[minimumRole];
  };

  /**
   * Check if user has permission to access a feature
   */
  const checkPermission = ({ requiredRole, businessId, featureKey }: PermissionCheckProps): boolean => {
    // If no requirements specified, allow access
    if (!requiredRole && !businessId && !featureKey) return true;

    // Check roles first
    if (requiredRole && !hasRole(requiredRole) && !hasRole('super_admin')) {
      return false;
    }

    // Check business ID if applicable
    if (businessId && profile?.business_id && profile.business_id !== businessId) {
      // Super admins can access any business
      if (profile.role !== 'super_admin') {
        return false;
      }
    }

    // Feature-specific checks could be added here
    // For example, checking if a feature flag is enabled for this user
    if (featureKey) {
      // This could check against a features table in the database
      // For now we'll just return true
      return true;
    }

    return true;
  };

  /**
   * Check if current user can manage employees (business owners and super admins)
   */
  const canManageEmployees = (): boolean => {
    return hasRole('business_owner') || hasRole('super_admin');
  };

  /**
   * Check if current user can manage business settings
   */
  const canManageBusinessSettings = (): boolean => {
    return hasRole('business_owner') || hasRole('super_admin');
  };

  /**
   * Check if current user can access analytics
   */
  const canAccessAnalytics = (): boolean => {
    return hasRole('business_owner') || hasRole('super_admin');
  };

  /**
   * Check if user can impersonate other businesses (super admins only)
   */
  const canImpersonateBusinesses = (): boolean => {
    return hasRole('super_admin');
  };

  return {
    hasRole,
    hasMinimumRole,
    checkPermission,
    canManageEmployees,
    canManageBusinessSettings,
    canAccessAnalytics,
    canImpersonateBusinesses,
    userRole: profile?.role
  };
}
