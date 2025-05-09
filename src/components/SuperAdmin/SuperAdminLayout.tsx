
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { useAuth } from "@/context/auth";
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
  const { signOut } = useAuth();
  const navigate = useNavigate();
  
  const endImpersonation = () => {
    // This would be implemented with actual auth logic
    console.log("Ending impersonation");
    // Redirect to admin area
  };

  const handleSignOut = async () => {
    try {
      // Clear any mock admin data first
      localStorage.removeItem('mockSuperAdmin');
      await signOut();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out."
      });
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error",
        description: "There was a problem signing out. Please try again.",
        variant: "destructive"
      });
    }
  };

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
