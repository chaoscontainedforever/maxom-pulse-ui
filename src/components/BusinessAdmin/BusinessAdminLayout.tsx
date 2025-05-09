
import { useState } from "react";
import { useAuth } from "@/context/auth";
import BusinessAdminSidebar from "./BusinessAdminSidebar";
import DashboardHeader from "../Dashboard/DashboardHeader";

interface BusinessAdminLayoutProps {
  children: React.ReactNode;
}

const BusinessAdminLayout = ({ children }: BusinessAdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, profile, loading } = useAuth();

  console.log("BusinessAdminLayout profile:", profile); // Add this to debug

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-card1"></div>
          <div className="h-2 w-48 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <BusinessAdminSidebar 
        isOpen={sidebarOpen} 
        closeSidebar={() => setSidebarOpen(false)} 
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <DashboardHeader 
          openSidebar={() => setSidebarOpen(true)}
          user={user}
        />

        <main className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default BusinessAdminLayout;
