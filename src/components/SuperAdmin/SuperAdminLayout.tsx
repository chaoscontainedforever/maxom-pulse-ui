
import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

interface SuperAdminLayoutProps {
  isImpersonating?: boolean;
  impersonatedUser?: string;
}

const SuperAdminLayout = ({ 
  isImpersonating = false,
  impersonatedUser = "" 
}: SuperAdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const endImpersonation = () => {
    // This would be implemented with actual auth logic
    console.log("Ending impersonation");
    // Redirect to admin area
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
        />

        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
