
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { usePermissions } from '@/hooks/usePermissions';
import { Role } from '@/context/auth/types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: Role;
  businessId?: string;
  featureKey?: string;
}

const ProtectedRoute = ({ children, requiredRole, businessId, featureKey }: ProtectedRouteProps) => {
  const { user, profile, loading } = useAuth();
  const { checkPermission } = usePermissions();
  const location = useLocation();

  console.log("ProtectedRoute check - user:", user?.id, "role:", profile?.role);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    // Clear any mock admin data to ensure it doesn't interfere with auth state
    localStorage.removeItem('mockSuperAdmin');
    
    // Redirect to login page, but save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check permissions
  const hasPermission = checkPermission({
    requiredRole,
    businessId,
    featureKey
  });

  // If user doesn't have required permissions, redirect to unauthorized page
  if (!hasPermission) {
    return <Navigate to="/unauthorized" replace />;
  }

  // User is authenticated and has the required permissions
  return <>{children}</>;
};

export default ProtectedRoute;
