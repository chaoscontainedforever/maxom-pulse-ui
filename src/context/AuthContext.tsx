
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";

// Define types for the authentication context
type Role = "super_admin" | "business_owner" | "employee";

interface UserProfile {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  role?: Role;
  business_type?: string; // Add business type to profile
  avatar_url?: string;
}

interface SignUpOptions {
  first_name?: string;
  last_name?: string;
  role?: Role;
  business_type?: string; // Add business type to sign up options
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{
    error: Error | null;
  }>;
  signUp: (
    email: string, 
    password: string, 
    options?: SignUpOptions
  ) => Promise<{
    error: Error | null;
  }>;
  signOut: () => Promise<void>;
  updateProfile?: (updates: Partial<UserProfile>) => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getSession() {
      setLoading(true);

      // Set up auth state listener first
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, newSession) => {
          setSession(newSession);
          setUser(newSession?.user ?? null);

          if (event === 'SIGNED_OUT') {
            setProfile(null);
          } else if (event === 'SIGNED_IN' && newSession?.user) {
            // Fetch user profile on sign in
            setTimeout(async () => {
              const { data, error } = await supabase
                .from("users")
                .select("*")
                .eq("id", newSession.user.id)
                .single();

              if (error) {
                console.error("Error fetching profile:", error);
              } else if (data) {
                setProfile(data);
              }
            }, 0);
          }
        }
      );

      // Then check for existing session
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      // Fetch user profile if there's an active session
      if (currentSession?.user) {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", currentSession.user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
        } else if (data) {
          setProfile(data);
        }
      }

      setLoading(false);
      
      return subscription;
    }

    const subscription = getSession();

    return () => {
      // Clean up the subscription when the component unmounts
      subscription.then(sub => sub.unsubscribe());
    };
  }, []);

  // Sign in with email and password
  async function signIn(email: string, password: string) {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        toast({
          title: "Sign In Failed",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }
      
      toast({
        title: "Welcome back!",
        description: "You have been successfully signed in.",
      });
      
      navigate("/dashboard");
      return { error: null };
    } catch (err) {
      const error = err as Error;
      toast({
        title: "Sign In Failed",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  }

  // Sign up with email and password
  async function signUp(
    email: string, 
    password: string, 
    options: SignUpOptions = {}
  ) {
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
        toast({
          title: "Registration Failed",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      // If successful sign up
      if (data.user) {
        toast({
          title: "Registration Successful",
          description: "Please check your email to confirm your registration.",
        });
        navigate("/onboarding");
      }

      return { error: null };
    } catch (err) {
      const error = err as Error;
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  }

  // Sign out
  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    navigate("/login");
  }

  // Update user profile
  async function updateProfile(updates: Partial<UserProfile>) {
    if (!user) return;

    const { error } = await supabase
      .from('users')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (error) {
      toast({
        title: "Profile Update Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      // Update local profile state
      setProfile(prev => {
        return prev ? { ...prev, ...updates } : null;
      });

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    }
  }

  const value: AuthContextType = {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
