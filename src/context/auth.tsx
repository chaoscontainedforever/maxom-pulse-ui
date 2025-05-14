
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { queryUserProfile, updateUserProfile } from '@/utils/supabaseHelpers';

// Define AuthContextType here to ensure it's consistent with imports
interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  profile: any | null; // User profile from the database
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, options?: any) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  updateProfile?: (updates: any) => Promise<void>;
  loading?: boolean; // Added for compatibility with older components
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  profile: null,
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null }),
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<any | null>(null);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Use setTimeout to avoid potential deadlock issues
          setTimeout(async () => {
            const data = await queryUserProfile(session.user.id);
            setProfile(data);
          }, 0);
        } else {
          setProfile(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        queryUserProfile(session.user.id)
          .then((data) => {
            setProfile(data);
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        toast.error("Sign In Failed", {
          description: error.message,
        });
        return { error };
      }
      
      toast.success("Welcome back!", {
        description: "You have been successfully signed in.",
      });
      
      return { error: null };
    } catch (err) {
      const error = err as Error;
      toast.error("Sign In Failed", {
        description: error.message,
      });
      return { error };
    }
  };

  const signUp = async (email: string, password: string, options: any = {}) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: options.first_name || "",
            last_name: options.last_name || "",
            role: options.role || "business_owner",
            business_type: options.business_type || "",
          },
        },
      });

      if (error) {
        toast.error("Registration Failed", {
          description: error.message,
        });
        return { error };
      }

      toast.success("Registration Successful", {
        description: "Your account has been created successfully.",
      });

      return { error: null };
    } catch (err) {
      const error = err as Error;
      toast.error("Registration Failed", {
        description: error.message,
      });
      return { error };
    }
  };

  const signOut = async () => {
    try {
      localStorage.removeItem('mockSuperAdmin');
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast.error("Sign Out Failed", {
          description: error.message,
        });
        return;
      }
      
      toast.success("Signed Out", {
        description: "You have been successfully signed out.",
      });
    } catch (err) {
      console.error("Exception during sign out:", err);
      const error = err as Error;
      toast.error("Sign Out Failed", {
        description: error.message,
      });
    }
  };

  const updateProfile = async (updates: any) => {
    if (!user?.id) return;

    try {
      const { error } = await updateUserProfile(user.id, updates);

      if (error) {
        toast.error("Profile Update Failed", {
          description: error.message,
        });
      } else {
        toast.success("Profile Updated", {
          description: "Your profile has been successfully updated.",
        });
        
        // Update local profile state
        setProfile(prev => ({
          ...prev,
          ...updates
        }));
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Profile Update Failed", {
        description: "An unexpected error occurred",
      });
    }
  };

  const value = {
    user,
    session,
    isLoading,
    profile,
    signIn,
    signUp,
    signOut,
    updateProfile,
    loading: isLoading // For compatibility with older components
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
