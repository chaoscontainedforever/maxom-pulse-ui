
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { mockUserProfiles } from '@/lib/mock-data';

export function useLoginHandler() {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const [standardError, setStandardError] = useState<string | null>(null);
  const [adminError, setAdminError] = useState<string | null>(null);

  // Redirect if already logged in
  useEffect(() => {
    // Check if user is already authenticated
    if (user) {
      console.log("User already authenticated, redirecting...", user);
      
      // Determine where to redirect based on user role
      if (user.user_metadata?.role === 'super_admin') {
        navigate('/super-admin');
      } else if (user.user_metadata?.role === 'business_owner') {
        navigate('/business-admin');
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, navigate]);

  const handleStandardLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setStandardError(null);
    
    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        setStandardError(error.message);
        toast.error("Login Failed", {
          description: error.message || "Invalid email or password"
        });
      } else {
        toast.success("Login Successful", {
          description: "Welcome back!"
        });
        
        // Auth context will handle redirection based on user role
      }
    } catch (err) {
      const error = err as Error;
      setStandardError(error.message);
      toast.error("Login Error", {
        description: error.message
      });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuperAdminLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setAdminError(null);
    
    try {
      console.log("Attempting super admin login with:", email);
      
      // Special case for the demo super admin
      if (email === 'admin@maxom.ai' && password === 'Admin123!') {
        console.log("Using mock login for super admin");
        
        // Find the admin profile from mock data
        const adminProfile = mockUserProfiles.find(profile => profile.role === 'super_admin');
        
        if (adminProfile) {
          // Store admin info in localStorage for the auth provider to use
          localStorage.setItem('mockSuperAdmin', JSON.stringify({
            email: email,
            role: 'super_admin',
            profile: adminProfile
          }));
          
          toast.success("Super Admin Login Successful", {
            description: "Welcome to the Super Admin dashboard."
          });
          
          // Instead of reloading, directly navigate and force the auth provider to update
          window.location.href = '/super-admin';
          return;
        }
      }
      
      // Regular Supabase auth for non-mock users
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email: email,
        password: password
      });
      
      if (error) {
        setAdminError(error.message);
        toast.error("Login Failed", {
          description: error.message || "Could not log in as super admin. Please check credentials."
        });
        console.error("Super admin login error:", error);
        return;
      }
      
      if (data.user) {
        console.log("Super admin login successful:", data.user);
        toast.success("Super Admin Login Successful", {
          description: "Welcome to the Super Admin dashboard."
        });
        
        navigate('/super-admin');
      }
    } catch (err) {
      const error = err as Error;
      setAdminError(error.message);
      toast.error("Login Error", {
        description: error.message
      });
      console.error("Super admin login exception:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    standardError,
    adminError,
    handleStandardLogin,
    handleSuperAdminLogin
  };
}
