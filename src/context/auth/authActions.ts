
import { NavigateFunction } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { SignUpOptions, UserProfile } from "./types";
import { 
  createProfileFromDbData, 
  createProfileFromMetadata, 
  getMockSuperAdminProfile 
} from "./authUtils";

/**
 * Sign in with email and password
 */
export async function signIn(
  email: string, 
  password: string, 
  navigate: NavigateFunction
) {
  try {
    console.log("Signing in with email:", email);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      console.error("Sign in error:", error.message);
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
    
    // If this is a business owner, redirect to business admin
    if (data.user?.user_metadata?.role === 'business_owner') {
      setTimeout(() => {
        navigate('/business-admin');
      }, 100);
    } else if (data.user?.user_metadata?.role === 'super_admin') {
      setTimeout(() => {
        navigate('/super-admin');
      }, 100);
    } else {
      // For regular users
      setTimeout(() => {
        navigate('/dashboard');
      }, 100);
    }
    
    return { error: null };
  } catch (err) {
    const error = err as Error;
    console.error("Sign in exception:", error.message);
    toast({
      title: "Sign In Failed",
      description: error.message,
      variant: "destructive",
    });
    return { error };
  }
}

/**
 * Sign up with email and password
 */
export async function signUp(
  email: string, 
  password: string,
  navigate: NavigateFunction,
  options: SignUpOptions = {}
) {
  try {
    console.log("Signing up with email:", email, "and options:", options);
    
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
      console.error("Sign up error:", error.message);
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }

    // If successful sign up
    if (data.user) {
      console.log("Sign up successful for:", data.user.email);
      toast({
        title: "Registration Successful",
        description: "Your account has been created successfully.",
      });
      
      // For development environments, we may want to automatically sign in
      // the user since email confirmation might be disabled
      if (data.session) {
        console.log("Auto sign-in successful with session");
        setTimeout(() => {
          navigate('/onboarding');
        }, 100);
      } else {
        // If no session is returned, the user may need to confirm their email
        toast({
          title: "Email Verification",
          description: "Please check your email to verify your account.",
        });
        setTimeout(() => {
          navigate('/login');
        }, 100);
      }
    }

    return { error: null };
  } catch (err) {
    const error = err as Error;
    console.error("Sign up exception:", error.message);
    toast({
      title: "Registration Failed",
      description: error.message,
      variant: "destructive",
    });
    return { error };
  }
}

/**
 * Sign out user
 */
export async function signOut(navigate: NavigateFunction) {
  try {
    console.log("Auth Actions: Starting sign out process");
    
    // First clear any mock admin data (if exists)
    localStorage.removeItem('mockSuperAdmin');
    
    // Then sign out through Supabase
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Sign Out Failed",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
    
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out.",
    });
    
    // Ensure navigation happens after state updates
    setTimeout(() => {
      console.log("Navigating to /login after sign out");
      navigate("/login");
    }, 100);
    
    return { error: null };
  } catch (err) {
    console.error("Exception during sign out:", err);
    const error = err as Error;
    toast({
      title: "Sign Out Failed",
      description: error.message,
      variant: "destructive",
    });
    return { error };
  }
}

/**
 * Update user profile
 */
export async function updateProfile(updates: Partial<UserProfile>, user: UserProfile | null) {
  if (!user?.id) return;

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
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  }
}

/**
 * Fetch user profile from Supabase
 */
export async function fetchUserProfile(userId: string, setProfile: (profile: UserProfile | null) => void) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
      return null;
    } 
    
    if (data) {
      console.log("Fetched user profile:", data);
      return data;
    }
    
    return null;
  } catch (err) {
    console.error("Exception fetching profile:", err);
    return null;
  }
}
