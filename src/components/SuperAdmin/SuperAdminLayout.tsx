import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { useAuth } from "@/context/auth";
import { usePermissions } from "@/hooks/usePermissions";
import { toast } from "@/hooks/use-toast";

interface SuperAdminLayoutProps {
  children: React.ReactNode;
  isImpersonating?: boolean;
  impersonatedUser?: string;
}

const SuperAdminLayout = ({ 
  children,
  isImpersonating = false,
  impersonatedUser = "" 
}: SuperAdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { signOut, profile } = useAuth();
  const { hasRole } = usePermissions();
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);
  
  useEffect(() => {
    // Check permission for this layout
    const checkPermission = () => {
      // First check if there's a mock super admin in localStorage
      const mockSuperAdmin = localStorage.getItem('mockSuperAdmin');
      
      if (mockSuperAdmin) {
        try {
          const mockData = JSON.parse(mockSuperAdmin);
          if (mockData.role === 'super_admin') {
            setAuthorized(true);
            return;
          }
        } catch (e) {
          console.error("Error parsing mock super admin data:", e);
        }
      }
      
      // Otherwise check using the normal permission system
      if (hasRole('super_admin')) {
        setAuthorized(true);
        return;
      }
      
      // Not authorized
      navigate('/unauthorized');
      toast({
        title: "Access Denied",
        description: "You must be a Super Admin to access this area.",
        variant: "destructive"
      });
    };
    
    checkPermission();
  }, [hasRole, navigate, profile]);
  
  const endImpersonation = () => {
    // This would be implemented with actual auth logic
    console.log("Ending impersonation");
    // Redirect to admin area
  };

  const handleSignOut = async () => {
    await signOut();
    // Navigation is now handled inside the signOut function
  };

  if (!authorized) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <AdminSidebar 
        isOpen={sidebarOpen} 
        closeSidebar={() => setSidebarOpen(false)} 
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <AdminHeader 
          openSidebar={() => setSidebarOpen(true)}
          isImpersonating={isImpersonating}
          impersonatedUser={impersonatedUser}
          endImpersonation={endImpersonation}
          onSignOut={handleSignOut}
        />

        <main className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
