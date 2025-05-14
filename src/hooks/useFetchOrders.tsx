
import { useQuery } from "@tanstack/react-query";
import { OrderItem } from "@/types/orders";

// Simulated function to fetch orders from an API
const fetchOrdersFromApi = async (params: any): Promise<OrderItem[]> => {
  console.log("Fetching orders with params:", params);
  
  // This would normally be an API call
  // For now, we return mock data
  return [
    {
      id: "1",
      status: "completed",
      customerName: "John Doe", // Fixed property name
      date: new Date().toISOString(),
      total: 45.99,
      items: [{ name: "Product 1", quantity: 2, price: 19.99 }]
    },
    {
      id: "2",
      status: "processing",
      customerName: "Jane Smith", // Fixed property name
      date: new Date().toISOString(),
      total: 75.50,
      items: [{ name: "Product 2", quantity: 1, price: 75.50 }]
    }
  ];
};

export type FetchOrdersParams = {
  businessIdForQuery: string | null;
  statusFilter?: string;
  date?: Date;
  searchQuery?: string;
};

export const useFetchOrders = (params: FetchOrdersParams) => {
  const { 
    businessIdForQuery, 
    statusFilter = "all", 
    date,
    searchQuery = ""
  } = params;

  return useQuery({
    queryKey: ['orders', businessIdForQuery, statusFilter, date, searchQuery],
    queryFn: () => fetchOrdersFromApi({
      businessId: businessIdForQuery,
      status: statusFilter !== "all" ? statusFilter : undefined,
      date,
      search: searchQuery
    }),
    enabled: !!businessIdForQuery, // Only run if we have a business ID
  });
};
