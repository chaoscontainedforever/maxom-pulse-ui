
import { supabase } from '@/integrations/supabase/client';
import { Role } from '@/context/auth/types';

/**
 * Manually adds a user to the users table if they don't exist
 * Useful for adding existing auth users to the users table
 */
export async function addUserToUsersTable(userId: string, email: string, role: Role = 'business_owner', firstName = '', lastName = '') {
  try {
    // First check if user already exists in the users table
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = "No rows returned"
      console.error('Error checking if user exists:', checkError);
      return { 
        success: false, 
        error: checkError, 
        message: 'Error checking if user exists' 
      };
    }
    
    // If user already exists, return early
    if (existingUser) {
      return { 
        success: true, 
        user: existingUser, 
        message: 'User already exists in users table' 
      };
    }
    
    // User doesn't exist, so add them to the users table
    const { data, error } = await supabase
      .from('users')
      .insert([
        { 
          id: userId,
          email,
          first_name: firstName,
          last_name: lastName,
          role,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select()
      .single();
    
    if (error) {
      console.error('Error adding user to users table:', error);
      return { 
        success: false, 
        error, 
        message: 'Failed to add user to users table' 
      };
    }
    
    return { 
      success: true, 
      user: data, 
      message: 'User successfully added to users table' 
    };
    
  } catch (error) {
    console.error('Exception adding user to users table:', error);
    return { 
      success: false, 
      error, 
      message: 'Exception occurred while adding user to users table' 
    };
  }
}
