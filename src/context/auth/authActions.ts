
import { NavigateFunction } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SignUpOptions, UserProfile } from "./types";
import { queryUserProfile } from "@/utils/supabaseHelpers";

/**
 * Sign in with email and password
 */
export async function signIn(
  email: string, 
  password: string
) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      toast("Sign In Failed", {
        description: error.message,
        type: "error"
      });
      return { error };
    }
    
    toast("Welcome back!", {
      description: "You have been successfully signed in."
    });
    
    return { error: null };
  } catch (err) {
    const error = err as Error;
    toast("Sign In Failed", {
      description: error.message,
      type: "error"
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
      toast("Registration Failed", {
        description: error.message,
        type: "error"
      });
      return { error };
    }

    toast("Registration Successful", {
      description: "Your account has been created successfully."
    });

    return { error: null };
  } catch (err) {
    const error = err as Error;
    toast("Registration Failed", {
      description: error.message,
      type: "error"
    });
    return { error };
  }
}

/**
 * Sign out user
 */
export async function signOut() {
  try {
    // First clear any mock admin data (if exists)
    localStorage.removeItem('mockSuperAdmin');
    
    // Then sign out through Supabase
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast("Sign Out Failed", {
        description: error.message,
        type: "error"
      });
      return { error };
    }
    
    toast("Signed Out", {
      description: "You have been successfully signed out."
    });
    
    return { error: null };
  } catch (err) {
    console.error("Exception during sign out:", err);
    const error = err as Error;
    toast("Sign Out Failed", {
      description: error.message,
      type: "error"
    });
    return { error };
  }
}

/**
 * Update user profile
 */
export async function updateProfile(updates: Partial<UserProfile>, userId: string | undefined) {
  if (!userId) return { error: new Error('No user ID provided') };

  try {
    const { error } = await supabase
      .from('users')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (error) {
      toast("Profile Update Failed", {
        description: error.message,
        type: "error"
      });
      return { error };
    } else {
      toast("Profile Updated", {
        description: "Your profile has been successfully updated."
      });
      return { error: null };
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    toast("Profile Update Failed", {
      description: "An unexpected error occurred",
      type: "error"
    });
    return { error: error as Error };
  }
}
