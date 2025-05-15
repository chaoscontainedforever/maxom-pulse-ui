
import { createContext, useContext, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { queryUserProfile } from '@/utils/supabaseHelpers';
import { AuthContextType } from './types';
import { useAuthState } from './useAuthState';
import { signIn as authSignIn, signUp as authSignUp, signOut as authSignOut, updateProfile as authUpdateProfile } from './authActions';
import { createMockUser, getMockSuperAdminProfile } from './authUtils';

// Create the auth context
export const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  profile: null,
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null }),
  signOut: async () => {},
});

// Auth Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { 
    user, setUser, 
    profile, setProfile,
    isLoading, setIsLoading,
    session, setSession
  } = useAuthState();
  const navigate = useNavigate();

  // Check for mock super admin on mount
  useEffect(() => {
    const mockAdminData = localStorage.getItem('mockSuperAdmin');
    if (mockAdminData) {
      try {
        const parsedData = JSON.parse(mockAdminData);
        setUser(createMockUser(parsedData));
        setProfile(getMockSuperAdminProfile());
        setIsLoading(false);
      } catch (err) {
        console.error("Error parsing mock admin data:", err);
        localStorage.removeItem('mockSuperAdmin');
      }
    }
  }, []);

  // Set up auth state listener
  useEffect(() => {
    // Skip if using mock admin
    if (localStorage.getItem('mockSuperAdmin')) return;
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Use setTimeout to avoid potential deadlock issues
          setTimeout(async () => {
            const data = await queryUserProfile(session.user.id);
            if (data) {
              // Convert string role to our Role type
              setProfile({
                ...data,
                role: data.role as any // Using type assertion to bypass strict typing temporarily
              });
            }
          }, 0);
        } else {
          setProfile(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Existing session check:", session);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        queryUserProfile(session.user.id)
          .then((data) => {
            if (data) {
              // Convert string role to our Role type
              setProfile({
                ...data,
                role: data.role as any // Using type assertion to bypass strict typing temporarily
              });
              setIsLoading(false);
            } else {
              setIsLoading(false);
            }
          });
      } else {
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Wrap auth actions with necessary state updates
  const handleSignIn = async (email: string, password: string) => {
    console.log("Handling sign in:", email);
    const result = await authSignIn(email, password);
    console.log("Sign in result:", result);
    return result;
  };

  const handleSignUp = async (email: string, password: string, options = {}) => {
    const result = await authSignUp(email, password, options);
    return result;
  };

  const handleSignOut = async () => {
    console.log("Handling sign out");
    await authSignOut();
    
    // Ensure navigation happens after state updates
    setTimeout(() => {
      navigate("/login");
    }, 100);
  };

  const handleUpdateProfile = async (updates: any) => {
    if (!user?.id) return;
    
    const { error } = await authUpdateProfile(updates, user.id);
    
    // Update local profile state if successful
    if (!error) {
      setProfile(prev => ({
        ...prev,
        ...updates
      }));
    }
  };

  // Context value
  const value = {
    user,
    session,
    isLoading,
    profile,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
    updateProfile: handleUpdateProfile,
    loading: isLoading // For compatibility with older components
  };

  console.log("Auth context value:", { 
    hasUser: !!user, 
    hasProfile: !!profile,
    isLoading 
  });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
