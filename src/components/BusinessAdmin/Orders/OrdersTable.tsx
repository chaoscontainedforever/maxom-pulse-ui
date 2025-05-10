
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderStatusBadge } from "./OrderStatusBadge";

interface OrderItem {
  id: string;
  customerName: string;
  items: string[];
  total: number;
  status: string;
  timestamp: Date;
  special_instructions?: string;
  phone?: string;
}

interface OrdersTableProps {
  orders: OrderItem[];
  isLoading: boolean;
  error: unknown;
}

export const OrdersTable = ({ orders, isLoading, error }: OrdersTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6">
                <div className="flex justify-center items-center">
                  <Loader2 className="h-6 w-6 animate-spin mr-2" />
                  Loading orders...
                </div>
              </TableCell>
            </TableRow>
          ) : error ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6 text-red-500">
                Error loading orders. Please try again.
              </TableCell>
            </TableRow>
          ) : orders.length > 0 ? (
            orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id.substring(0, 8)}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {order.items.join(", ")}
                </TableCell>
                <TableCell>${Number(order.total).toFixed(2)}</TableCell>
                <TableCell><OrderStatusBadge status={order.status} /></TableCell>
                <TableCell>{format(new Date(order.timestamp), "PPp")}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="outline">View</Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                No orders found matching your filters
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
