
import { supabase } from '@/integrations/supabase/client';

/**
 * Query user profile data
 */
export async function queryUserProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .maybeSingle(); // Use maybeSingle() instead of single() to avoid errors when no row is found
    
    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
    
    // If no data is found, return null
    if (!data) {
      console.info(`No user profile found for ID: ${userId}`);
    }
    
    return data;
  } catch (err) {
    console.error('Exception fetching user profile:', err);
    return null;
  }
}

/**
 * Check if user has a specific role
 */
export async function checkUserRole(userId: string, roleName: string) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .maybeSingle();
    
    if (error) {
      console.error('Error checking user role:', error);
      return false;
    }
    
    if (!data) {
      console.info(`No user found with ID: ${userId}`);
      return false;
    }
    
    // Check if the user has the specified role
    // For super_admin, they have access to everything
    return data.role === roleName || data.role === 'super_admin';
  } catch (err) {
    console.error('Exception checking user role:', err);
    return false;
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(userId: string, updates: any) {
  try {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId);
    
    return { data, error };
  } catch (err) {
    console.error('Error updating user profile:', err);
    return { data: null, error: err };
  }
}
