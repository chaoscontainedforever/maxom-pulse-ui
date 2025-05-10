
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { toast } from "@/hooks/use-toast";

export interface OrderItem {
  id: string;
  customerName: string;
  items: string[];
  total: number;
  status: string;
  timestamp: Date;
  special_instructions?: string;
  phone?: string;
}

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
        const { data, error } = await (supabase as any)
          .from('orders')
          .select(`
            id, 
            customer_id,
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
        return data.map((order: any) => ({
          id: order.id,
          customerName: order.customers?.name || 'Unknown',
          items: order.items_json?.map((item: any) => item.name || item.item_name) || [],
          total: order.total_amount,
          status: order.items_json?.status || 'pending',
          timestamp: new Date(order.created_at),
          special_instructions: order.special_instructions,
          phone: order.customers?.phone
        }));
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
        !order.id.toLowerCase().includes(searchQuery.toLowerCase())) {
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
