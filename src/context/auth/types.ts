
import { Session, User } from "@supabase/supabase-js";

export type Role = 'super_admin' | 'cms_admin' | 'business_owner' | 'user' | string;

export interface UserProfile {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  avatar_url?: string;
  role?: Role;
  business_type?: string;
  business_id?: string;
  created_at?: string;
  updated_at?: string;
  [key: string]: any; // Allow additional properties
}

export interface SignUpOptions {
  first_name?: string;
  last_name?: string;
  role?: Role;
  business_type?: string;
}

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  loading?: boolean; // For backward compatibility
  profile: UserProfile | null;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, options?: SignUpOptions) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  updateProfile?: (updates: Partial<UserProfile>) => Promise<void>;
}
