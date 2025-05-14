
import { Session, User } from "@supabase/supabase-js";

// Define types for the authentication context
export type Role = "super_admin" | "business_owner" | "employee" | "cms_admin";

export interface UserProfile {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  role?: Role;
  business_id?: string;
  business_type?: string;
  avatar_url?: string;
}

export interface SignUpOptions {
  first_name?: string;
  last_name?: string;
  role?: Role;
  business_type?: string;
}

export interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isLoading?: boolean;
  session: Session | null;
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
