
import { supabase } from "@/integrations/supabase/client";

export interface Restaurant {
  id: string;
  name: string;
}

export const fetchRestaurants = async (): Promise<Restaurant[]> => {
  try {
    const { data, error } = await supabase
      .from('restaurants')
      .select('id, name')
      .order('name');

    if (error) {
      console.error('Error fetching restaurants:', error);
      return [];
    }
    return data;
  } catch (err) {
    console.error('Exception fetching restaurants:', err);
    return [];
  }
};
