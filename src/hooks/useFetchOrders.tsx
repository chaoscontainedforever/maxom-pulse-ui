
import { useState, useEffect } from "react";
import { Order } from "@/types/orders";

// Mock fetch orders hook for development
export const useFetchOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simulate API call with mock data
    const mockOrders: Order[] = [
      {
        id: "1",
        status: "completed",
        customerName: "John Doe",
        orderDate: new Date().toISOString(),
        total: 45.99,
        items: [{ name: "Product 1", quantity: 2, price: 19.99 }]
      },
      {
        id: "2",
        status: "processing",
        customerName: "Jane Smith",
        orderDate: new Date().toISOString(),
        total: 75.50,
        items: [{ name: "Product 2", quantity: 1, price: 75.50 }]
      }
    ];

    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 500);
  }, []);

  return { orders, loading, error };
};

export default useFetchOrders;
