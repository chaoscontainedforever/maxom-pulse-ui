
import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from '@/integrations/supabase/client';

interface CMSLayoutProps {
  children: ReactNode;
}

export default function CMSLayout({ children }: CMSLayoutProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

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

  return (
    <div className="min-h-screen flex">
      {children}
    </div>
  );
}
