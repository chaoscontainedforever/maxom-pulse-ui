
import { format } from "date-fns";
import { Loader2, Phone, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { OrderItem } from "@/types/orders";

interface OrdersTableProps {
  orders: OrderItem[];
  isLoading: boolean;
  error: unknown;
  isDemoData?: boolean;
}

export const OrdersTable = ({ orders, isLoading, error, isDemoData = false }: OrdersTableProps) => {
  return (
    <div className="rounded-md border">
      {isDemoData && (
        <div className="bg-blue-50 p-3 border-b border-blue-200 flex items-center">
          <AlertCircle className="text-blue-500 h-4 w-4 mr-2" />
          <span className="text-sm text-blue-700">Sample data is being displayed for demonstration purposes.</span>
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
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
          ) : orders?.length > 0 ? (
            orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id.substring(0, 8)}</TableCell>
                <TableCell>
                  <div>
                    {order.customerName}
                    {order.customerPhone && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                              <Phone className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{order.customerPhone}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {order.items && order.items.length > 0 
                    ? order.items.map(item => `${item.quantity}x ${item.name}`).join(", ")
                    : "No items"}
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
