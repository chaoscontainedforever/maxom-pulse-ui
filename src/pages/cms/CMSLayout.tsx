
import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { checkUserRole } from "@/utils/supabaseHelpers";

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
        const hasAdminRole = await checkUserRole(user.id, 'cms_admin');
        setIsAuthorized(hasAdminRole);
      } catch (error) {
        console.error('Error checking user role:', error);
        setIsAuthorized(false);
      } finally {
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
