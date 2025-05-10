
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { toast } from "@/hooks/use-toast";
import { OrderItem } from "@/types/orders";

export const useOrdersData = (businessId?: string) => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const { profile } = useAuth();
  
  const targetBusinessId = businessId || profile?.business_id;

  // Fetch orders from Supabase
  const { data: ordersData = [], isLoading, error } = useQuery({
    queryKey: ['orders', targetBusinessId, statusFilter, date?.toISOString(), searchQuery],
    queryFn: async () => {
      if (!targetBusinessId) {
        console.log("No target business ID found");
        return [];
      }
      
      try {
        console.log(`Fetching orders for restaurant ID: ${targetBusinessId}`);
        
        // Use more specific query to get order status from items_json
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
          .eq('restaurant_id', targetBusinessId)
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
        
        console.log(`Retrieved ${data?.length || 0} orders`);
        
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
    enabled: !!targetBusinessId,
  });

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
    setSearchQuery
  };
};
