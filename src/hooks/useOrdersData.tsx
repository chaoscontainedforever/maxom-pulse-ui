
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
  const { data: orders = [], isLoading, error } = useQuery({
    queryKey: ['orders', targetBusinessId],
    queryFn: async () => {
      if (!targetBusinessId) {
        return [];
      }
      
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
        
        // Transform the data to match our component needs
        return data.map((order: any): OrderItem => {
          // Parse items from JSON
          let parsedItems = [];
          try {
            if (order.items_json) {
              parsedItems = Array.isArray(order.items_json) 
                ? order.items_json 
                : [order.items_json];
            }
          } catch (e) {
            console.error('Error parsing items JSON:', e);
            parsedItems = [];
          }

          // Extract status from items if available
          const status = parsedItems.length > 0 && parsedItems[0].status 
            ? parsedItems[0].status 
            : 'pending';

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
  const filteredOrders = orders.filter((order: OrderItem) => {
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
