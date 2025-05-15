
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { CMSSidebar } from "@/components/cms/Sidebar";
import { UnifiedHeader } from "@/components/cms/unified-header";

interface CMSLayoutProps {
  children: ReactNode;
}

export default function CMSLayout({ children }: CMSLayoutProps) {
  const location = useLocation();
  
  const handleSignOut = async () => {
    console.log("Sign out clicked - bypassed in demo mode");
  };

  // Get page title based on current path
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/cms") return "Dashboard";
    if (path === "/cms/pages") return "Pages";
    if (path === "/cms/media") return "Media Library";
    if (path === "/cms/navigation") return "Navigation";
    if (path === "/cms/ribbon") return "Announcement Ribbon";
    if (path === "/cms/settings") return "Site Settings";
    if (path.includes("/cms/pages/")) return "Page Editor";
    return "Content Management System";
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <CMSSidebar onSignOut={handleSignOut} />
      
      <div className="flex-1 ml-64 overflow-auto">
        <div className="p-8">
          <UnifiedHeader 
            title={getPageTitle()} 
            subtitle={
              location.pathname === "/cms" 
                ? "Manage site content and settings" 
                : undefined
            } 
          />
          
          <div className="mt-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
