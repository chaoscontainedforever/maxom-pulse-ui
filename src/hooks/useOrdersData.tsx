import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { toast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from 'uuid';
import { OrderItem } from "@/types/orders";

export const useOrdersData = (businessId?: string) => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const { profile } = useAuth();
  
  // Use the provided businessId, or fall back to profile.business_id
  // This allows explicit override when needed but defaults to current user's business
  const targetBusinessId = businessId || profile?.business_id;
  
  // If no business ID is available, generate a mock one for demonstration purposes
  // In a production app, we'd require a valid business ID or show an error
  const businessIdForQuery = targetBusinessId || (profile ? `temp-${profile.id.substring(0, 8)}` : null);
  
  console.log("Fetching orders with business ID:", targetBusinessId);

  // Fetch orders from Supabase
  const { data: ordersData = [], isLoading, error } = useQuery({
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
          return generateMockOrders();
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
            variant: 'destructive'
          });
          return [];
        }
        
        console.log(`Retrieved ${data?.length || 0} orders:`, data);
        
        // Transform the data to match our component needs
        return data.map((order: any): OrderItem => {
          // Parse items from JSON
          let parsedItems = [];
          let status = 'pending'; // Default status
          
          try {
            if (order.items_json) {
              if (typeof order.items_json === 'string') {
                parsedItems = JSON.parse(order.items_json);
              } else {
                parsedItems = Array.isArray(order.items_json) 
                  ? order.items_json 
                  : [order.items_json];
              }
              
              // Extract status from first item or from the order itself
              if (parsedItems[0]?.status) {
                status = parsedItems[0].status;
              } else if (order.items_json.status) {
                status = order.items_json.status;
              }
            }
          } catch (e) {
            console.error('Error parsing items JSON:', e, order.items_json);
            parsedItems = [];
          }

          return {
            id: order.id,
            customerName: order.customers?.name || 'Unknown',
            customerPhone: order.customers?.phone,
            items: parsedItems.map((item: any) => ({
              name: item.name || item.item_name || 'Unknown Item',
              quantity: item.quantity || 1,
              price: item.price || 0,
              modifiers: item.modifiers || []
            })),
            total: order.total_amount,
            status: status,
            timestamp: new Date(order.created_at),
            special_instructions: order.special_instructions,
            restaurant_id: order.restaurant_id
          };
        });
      } catch (err) {
        console.error('Exception fetching orders:', err);
        toast({
          title: 'Error fetching orders',
          description: 'An unexpected error occurred',
          variant: 'destructive'
        });
        return [];
      }
    },
    enabled: !!businessIdForQuery,
  });

  // Helper function to generate mock orders for demonstration
  const generateMockOrders = (): OrderItem[] => {
    // Generate 5 mock orders
    return Array(5).fill(null).map((_, index) => ({
      id: uuidv4(),
      customerName: `Demo Customer ${index + 1}`,
      customerPhone: `555-${100 + index}-${1000 + index}`,
      items: [
        {
          name: 'Sample Item',
          quantity: Math.floor(Math.random() * 3) + 1,
          price: 9.99,
          modifiers: []
        },
        {
          name: 'Side Dish',
          quantity: 1,
          price: 4.99,
          modifiers: []
        }
      ],
      total: 14.98 * (Math.floor(Math.random() * 3) + 1),
      status: ['pending', 'completed', 'processing'][Math.floor(Math.random() * 3)],
      timestamp: new Date(Date.now() - Math.random() * 86400000 * 7), // Random date in the past week
      special_instructions: index % 2 === 0 ? 'Extra sauce please' : undefined,
      restaurant_id: businessIdForQuery
    }));
  };

  // Filter orders based on selected filters
  const filteredOrders = ordersData.filter((order: OrderItem) => {
    // Filter by status
    if (statusFilter !== "all" && order.status !== statusFilter) {
      return false;
    }
    
    // Filter by date
    if (date && order.timestamp && (
      order.timestamp.getDate() !== date.getDate() ||
      order.timestamp.getMonth() !== date.getMonth() ||
      order.timestamp.getFullYear() !== date.getFullYear()
    )) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !order.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (!order.customerPhone || !order.customerPhone.includes(searchQuery))) {
      return false;
    }
    
    return true;
  });

  console.log("Filtered orders:", filteredOrders.length);

  return {
    orders: filteredOrders,
    isLoading,
    error,
    statusFilter,
    setStatusFilter,
    date,
    setDate,
    searchQuery,
    setSearchQuery,
    hasBusiness: !!targetBusinessId
  };
};
