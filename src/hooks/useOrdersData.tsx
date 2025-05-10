
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
  
  console.log("Fetching orders with business ID:", targetBusinessId);

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
        
        // Create a basic set of test orders if missing for demonstration purposes
        const { count } = await supabase
          .from('orders')
          .select('id', { count: 'exact', head: true })
          .eq('restaurant_id', targetBusinessId);
        
        if (count === 0) {
          console.log("No orders found, creating sample orders");
          await createSampleOrders(targetBusinessId);
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
    enabled: !!targetBusinessId,
  });

  // Helper function to create sample orders for testing
  const createSampleOrders = async (restaurantId: string) => {
    try {
      // First, ensure we have a customer
      const { data: customerData, error: customerError } = await supabase
        .from('customers')
        .select('id')
        .eq('restaurant_id', restaurantId)
        .limit(1);
        
      let customerId;
      
      if (customerError || !customerData || customerData.length === 0) {
        // Create a new customer
        const { data: newCustomer, error: newCustomerError } = await supabase
          .from('customers')
          .insert({
            name: 'John Doe',
            phone: '555-123-4567',
            restaurant_id: restaurantId
          })
          .select();
          
        if (newCustomerError) {
          console.error('Error creating sample customer:', newCustomerError);
          return;
        }
        
        customerId = newCustomer[0].id;
      } else {
        customerId = customerData[0].id;
      }
      
      // Create sample orders
      const sampleOrders = [
        {
          customer_id: customerId,
          restaurant_id: restaurantId,
          call_id: '00000000-0000-0000-0000-000000000000',
          items_json: [
            { 
              name: 'Cheeseburger', 
              quantity: 2, 
              price: 8.99,
              status: 'completed'
            },
            { 
              name: 'French Fries', 
              quantity: 1, 
              price: 3.99,
              status: 'completed'
            }
          ],
          total_amount: 21.97,
          special_instructions: 'Extra ketchup please'
        },
        {
          customer_id: customerId,
          restaurant_id: restaurantId,
          call_id: '00000000-0000-0000-0000-000000000000',
          items_json: [
            { 
              name: 'Margherita Pizza', 
              quantity: 1, 
              price: 12.99,
              status: 'preparing'
            },
            { 
              name: 'Garlic Bread', 
              quantity: 1, 
              price: 4.99,
              status: 'preparing'
            }
          ],
          total_amount: 17.98,
          special_instructions: 'Well done crust'
        },
        {
          customer_id: customerId,
          restaurant_id: restaurantId,
          call_id: '00000000-0000-0000-0000-000000000000',
          items_json: [
            { 
              name: 'Caesar Salad', 
              quantity: 1, 
              price: 9.99,
              status: 'pending'
            },
            { 
              name: 'Iced Tea', 
              quantity: 2, 
              price: 2.99,
              status: 'pending'
            }
          ],
          total_amount: 15.97
        }
      ];
      
      const { error: ordersError } = await supabase
        .from('orders')
        .insert(sampleOrders);
        
      if (ordersError) {
        console.error('Error creating sample orders:', ordersError);
      } else {
        console.log('Sample orders created successfully');
      }
    } catch (err) {
      console.error('Error in createSampleOrders:', err);
    }
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
    setSearchQuery
  };
};
