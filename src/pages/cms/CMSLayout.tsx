
import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from '@/integrations/supabase/client';
import { CMSSidebar } from "@/components/cms/Sidebar";
import { UnifiedHeader } from "@/components/cms/unified-header";

interface CMSLayoutProps {
  children: ReactNode;
}

export default function CMSLayout({ children }: CMSLayoutProps) {
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const location = useLocation();
  
  const handleSignOut = async () => {
    await signOut();
  };

  useEffect(() => {
    async function checkUserCMSRole() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Directly query the users table to check role
        const { data, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Error checking user role:', error);
          setIsAuthorized(false);
          setLoading(false);
          return;
        }

        const hasAdminRole = data?.role === 'cms_admin' || data?.role === 'super_admin';
        
        if (!hasAdminRole) {
          console.log('User does not have CMS access. Current role:', data?.role);
        } else {
          console.log('User authorized for CMS with role:', data?.role);
        }
        
        setIsAuthorized(hasAdminRole);
        setLoading(false);
      } catch (error) {
        console.error('Error checking user role:', error);
        setIsAuthorized(false);
        setLoading(false);
      }
    }

    checkUserCMSRole();
  }, [user]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/cms/login" replace />;
  }

  if (!isAuthorized) {
    return <Navigate to="/unauthorized" replace />;
  }

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
