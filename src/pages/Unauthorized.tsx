
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Shield, Home, ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/auth";
import { usePermissions } from "@/hooks/usePermissions";

const Unauthorized = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { userRole } = usePermissions();
  
  // Determine where to redirect users based on their role
  const handleBackToDashboard = () => {
    if (userRole === 'super_admin') {
      navigate('/super-admin');
    } else if (userRole === 'business_owner') {
      navigate('/business-admin');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="rounded-full bg-red-100 dark:bg-red-900/20 p-6 mb-6">
        <Shield className="h-16 w-16 text-red-500" />
      </div>
      <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-2 max-w-md">
        You don't have permission to access this page.
      </p>
      <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
        Current role: <span className="font-medium">{profile?.role || 'Not logged in'}</span>
      </p>
      <div className="space-x-4">
        <Button onClick={() => navigate(-1)} variant="outline" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </Button>
        <Button onClick={handleBackToDashboard} className="gap-2">
          <Home className="h-4 w-4" />
          Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
