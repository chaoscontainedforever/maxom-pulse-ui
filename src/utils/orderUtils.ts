
// Utility functions for working with orders

// Generate a unique ID for demo orders
export const generateId = (): string => {
  return 'order_' + Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// Generate mock orders for demonstration purposes
export const generateMockOrders = (businessIdForQuery: string): any[] => {
  // Generate 5 mock orders
  return Array(5).fill(null).map((_, index) => ({
    id: generateId(),
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

// Parse order items from JSON data
export const parseOrderItems = (order: any) => {
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

  return { parsedItems, status };
};

// Transform API order data to our application format
export const transformOrderData = (order: any) => {
  const { parsedItems, status } = parseOrderItems(order);
  
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
};

// Filter orders based on filter criteria
export const filterOrders = (
  orders: any[], 
  statusFilter: string, 
  date: Date | undefined, 
  searchQuery: string
) => {
  return orders.filter((order) => {
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
};
