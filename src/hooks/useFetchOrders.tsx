
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { generateMockOrders, transformOrderData } from "@/utils/orderUtils";
import { OrderItem } from "@/types/orders";

interface UseFetchOrdersProps {
  businessIdForQuery: string | null;
  statusFilter: string;
  date: Date | undefined;
  searchQuery: string;
}

export const useFetchOrders = ({
  businessIdForQuery,
  statusFilter,
  date,
  searchQuery
}: UseFetchOrdersProps) => {
  return useQuery({
    queryKey: ['orders', businessIdForQuery, statusFilter, date?.toISOString(), searchQuery],
    queryFn: async () => {
      if (!businessIdForQuery) {
        console.log("No target business ID found");
        return [];
      }
      
      try {
        console.log(`Fetching orders for restaurant ID: ${businessIdForQuery}`);
        
        // If using a temporary business ID (user without business_id association)
        // Return mock data for demonstration purposes
        if (businessIdForQuery.startsWith('temp-')) {
          return generateMockOrders(businessIdForQuery);
        }
        
        // Fetch orders with related customer data
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
          .eq('restaurant_id', businessIdForQuery)
          .order('created_at', { ascending: false });
          
        if (error) {
          console.error('Error fetching orders:', error);
          toast({
            title: 'Error fetching orders',
            description: error.message,
            variant: 'default' // Using 'default' instead of 'destructive' which may not be a valid variant
          });
          return [];
        }
        
        console.log(`Retrieved ${data?.length || 0} orders:`, data);
        
        // Transform the data to match our component needs
        return data.map((order: any): OrderItem => transformOrderData(order));
      } catch (err) {
        console.error('Exception fetching orders:', err);
        toast({
          title: 'Error fetching orders',
          description: 'An unexpected error occurred',
          variant: 'default'
        });
        return [];
      }
    },
    enabled: !!businessIdForQuery,
  });
};
