
import { Badge } from "@/components/ui/badge";

interface OrderStatusBadgeProps {
  status: string;
}

export const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  const statusLower = status.toLowerCase();

  switch (statusLower) {
    case "completed":
      return <Badge className="bg-green-100 text-green-700 border-green-200">Completed</Badge>;
    case "preparing":
      return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Preparing</Badge>;
    case "pending":
      return <Badge className="bg-amber-100 text-amber-700 border-amber-200">Pending</Badge>;
    case "cancelled":
      return <Badge className="bg-red-100 text-red-700 border-red-200">Cancelled</Badge>;
    case "ready":
      return <Badge className="bg-purple-100 text-purple-700 border-purple-200">Ready</Badge>;
    case "delivered":
      return <Badge className="bg-teal-100 text-teal-700 border-teal-200">Delivered</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};
