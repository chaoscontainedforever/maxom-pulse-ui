
import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string;
  featureKey?: string;
}

const ProtectedRoute = ({ 
  children, 
  requiredRole, 
  featureKey 
}: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [isCheckingRole, setIsCheckingRole] = useState(!!requiredRole);

  useEffect(() => {
    const checkUserRole = async () => {
      if (!user || !requiredRole) {
        setHasAccess(!requiredRole);
        setIsCheckingRole(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error checking user role:', error);
          setHasAccess(false);
        } else {
          setHasAccess(data?.role === requiredRole);
        }
      } catch (error) {
        console.error('Error checking user role:', error);
        setHasAccess(false);
      } finally {
        setIsCheckingRole(false);
      }
    };

    checkUserRole();
  }, [user, requiredRole]);

  // Show loading state
  if (isLoading || isCheckingRole) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If role check failed, redirect to unauthorized
  if (requiredRole && hasAccess === false) {
    return <Navigate to="/unauthorized" />;
  }

  // All checks passed, render the protected component
  return <>{children}</>;
};

export default ProtectedRoute;
