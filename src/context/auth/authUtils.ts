
import { User } from "@supabase/supabase-js";
import { UserProfile } from "./types";
import { mockUserProfiles } from "@/lib/mock-data";

/**
 * Check if user is super admin by email
 */
export function isSuperAdminEmail(email: string | undefined): boolean {
  return email === 'admin@maxom.ai';
}

/**
 * Get mock super admin profile
 */
export function getMockSuperAdminProfile(): UserProfile | null {
  return mockUserProfiles.find(profile => profile.role === 'super_admin') || null;
}

/**
 * Create a user profile from database data
 */
export function createProfileFromDbData(data: any, user: User): UserProfile {
  // Create a UserProfile object with role from user_metadata
  const userRole = user.user_metadata?.role || 'business_owner';
  
  return {
    id: data.id,
    first_name: data.name?.split(' ')[0] || '',
    last_name: data.name?.split(' ').slice(1).join(' ') || '',
    email: data.email || '',
    role: userRole,
    avatar_url: data.avatar_url || ''
  };
}

/**
 * Create a user profile from user metadata
 */
export function createProfileFromMetadata(user: User): UserProfile {
  const userMetadata = user.user_metadata;
  
  return {
    id: user.id,
    first_name: userMetadata.first_name || '',
    last_name: userMetadata.last_name || '',
    email: user.email || '',
    role: userMetadata.role || 'business_owner',
    business_type: userMetadata.business_type || '',
  };
}

/**
 * Create a mock user from saved data
 */
export function createMockUser(mockData: any): User {
  return {
    id: 'mock-super-admin-id',
    email: mockData.email,
    app_metadata: {},
    user_metadata: {
      role: 'super_admin'
    },
    aud: 'authenticated',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    factors: null,
    identities: null,
    last_sign_in_at: new Date().toISOString(),
    phone: '',
    role: '',
    confirmed_at: new Date().toISOString(),
    email_confirmed_at: new Date().toISOString(),
    banned_until: null,
    reauthentication_token: null,
    recovery_token: null
  } as User;
}
