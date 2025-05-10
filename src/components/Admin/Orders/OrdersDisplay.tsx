
import { OrdersTable } from "@/components/BusinessAdmin/Orders/OrdersTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderItem } from "@/types/orders";

interface OrdersDisplayProps {
  orders: OrderItem[];
  isLoading: boolean;
  error: unknown;
}

export const OrdersDisplay = ({ orders, isLoading, error }: OrdersDisplayProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <OrdersTable 
          orders={orders} 
          isLoading={isLoading} 
          error={error}
        />
      </CardContent>
    </Card>
  );
};
