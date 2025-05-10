
import { useQuery } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { generateMockOrders } from "@/utils/orderUtils";
import { OrderItem } from "@/types/orders";
import { fetchOrders } from "@/services/orderService";

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
      
      // If using a temporary business ID (user without business_id association)
      // Return mock data for demonstration purposes
      if (businessIdForQuery.startsWith('temp-')) {
        console.log("Using mock data for temporary business ID");
        return generateMockOrders(businessIdForQuery);
      }
      
      try {
        // Use the orderService to fetch real orders
        return await fetchOrders(businessIdForQuery);
      } catch (err) {
        console.error('Exception in useFetchOrders:', err);
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
