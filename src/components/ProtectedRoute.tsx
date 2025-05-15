
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

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
  // For demo purposes, we'll bypass authentication entirely
  
  // Always grant access in demo mode
  return <>{children}</>;
};

export default ProtectedRoute;
