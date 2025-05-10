
import { useState } from "react";
import { useAuth } from "@/context/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrdersTable } from "@/components/BusinessAdmin/Orders/OrdersTable";
import { OrderItem } from "@/types/orders";
import { fetchOrders } from "@/services/orderService";
import { useQuery } from "@tanstack/react-query";

interface OrderListProps {
  restaurantId: string;
}

export const OrderList = ({ restaurantId }: OrderListProps) => {
  const { data: orders = [], isLoading, error } = useQuery({
    queryKey: ['orderList', restaurantId],
    queryFn: async () => await fetchOrders(restaurantId),
    enabled: !!restaurantId,
  });

  if (isLoading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div>Error loading orders: {String(error)}</div>;
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Restaurant Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <OrdersTable 
          orders={orders}
          isLoading={false}
          error={null}
        />
      </CardContent>
    </Card>
  );
};
