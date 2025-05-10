
import { useState } from "react";
import { useAuth } from "@/context/auth";
import { useFetchOrders } from "@/hooks/useFetchOrders";
import { filterOrders } from "@/utils/orderUtils";
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

  // Fetch orders data
  const { 
    data: ordersData = [], 
    isLoading, 
    error 
  } = useFetchOrders({
    businessIdForQuery,
    statusFilter,
    date,
    searchQuery
  });

  // Filter orders based on selected filters
  const filteredOrders = filterOrders(ordersData, statusFilter, date, searchQuery);

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
