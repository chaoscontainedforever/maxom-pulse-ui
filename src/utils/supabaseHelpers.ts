
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

/**
 * Safely query the users table with proper type checking
 */
export async function queryUserProfile(userId: string) {
  if (!userId) return null;
  
  try {
    // RLS policies may affect this query, so handle errors appropriately
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Exception fetching user profile:', error);
    return null;
  }
}

/**
 * Safely update a user profile with proper type checking
 */
export async function updateUserProfile(userId: string, updates: any) {
  if (!userId) return { error: new Error('No user ID provided') };
  
  try {
    const { error } = await supabase
      .from('users')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);
    
    return { error: error ? new Error(error.message) : null };
  } catch (error) {
    return { error: error as Error };
  }
}

/**
 * Check if a user has a specific role
 */
export async function checkUserRole(userId: string, requiredRole: string) {
  if (!userId) return false;
  
  try {
    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single();
    
    if (error || !data) {
      console.error('Error checking user role:', error);
      return false;
    }
    
    return data.role === requiredRole;
  } catch (error) {
    console.error('Exception checking user role:', error);
    return false;
  }
}
