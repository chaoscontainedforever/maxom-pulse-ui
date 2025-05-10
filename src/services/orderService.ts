
import { supabase } from "@/integrations/supabase/client";
import { OrderItem } from "@/types/orders";
import { transformOrderData } from "@/utils/orderUtils";

/**
 * Fetch orders for a specific restaurant
 * @param restaurantId The ID of the restaurant to fetch orders for
 * @returns Promise containing an array of transformed order data
 */
export const fetchOrders = async (restaurantId: string): Promise<OrderItem[]> => {
  try {
    console.log(`Fetching orders for restaurant ID: ${restaurantId}`);
    
    const { data, error } = await supabase
      .from('orders')
      .select(`
        id, 
        customer_id,
        restaurant_id,
        items_json,
        special_instructions,
        total_amount,
        created_at,
        customers (
          name,
          phone
        )
      `)
      .eq('restaurant_id', restaurantId)
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
    
    console.log(`Retrieved ${data?.length || 0} orders`);
    
    // Transform the data to match our component needs
    return data.map((order: any): OrderItem => transformOrderData(order));
  } catch (err) {
    console.error('Exception fetching orders:', err);
    return [];
  }
};

/**
 * Fetch a specific order by ID
 * @param orderId The ID of the order to fetch
 * @returns Promise containing the order data or null if not found
 */
export const fetchOrderById = async (orderId: string): Promise<OrderItem | null> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        id, 
        customer_id,
        restaurant_id,
        items_json,
        special_instructions,
        total_amount,
        created_at,
        customers (
          name,
          phone
        )
      `)
      .eq('id', orderId)
      .single();
      
    if (error) {
      console.error('Error fetching order by ID:', error);
      return null;
    }
    
    return transformOrderData(data);
  } catch (err) {
    console.error('Exception fetching order by ID:', err);
    return null;
  }
};
