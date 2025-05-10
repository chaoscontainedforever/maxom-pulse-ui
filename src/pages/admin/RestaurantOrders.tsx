
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";

const RestaurantOrders = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);

  // Fetch restaurants for super admin
  const { data: restaurants = [], isLoading: isLoadingRestaurants } = useQuery({
    queryKey: ['restaurants'],
    queryFn: async () => {
      try {
        const { data, error } = await (supabase as any)
          .from('restaurants')
          .select('id, name')
          .order('name');

        if (error) {
          console.error('Error fetching restaurants:', error);
          return [];
        }
        return data;
      } catch (err) {
        console.error('Exception fetching restaurants:', err);
        return [];
      }
    },
  });

  // Fetch orders for the selected restaurant
  const { data: orders = [], isLoading: isLoadingOrders } = useQuery({
    queryKey: ['admin-restaurant-orders', selectedRestaurant],
    queryFn: async () => {
      if (!selectedRestaurant) {
        return [];
      }

      try {
        const { data, error } = await (supabase as any)
          .from('orders')
          .select(`
            id, 
            customer_id,
            items_json,
            special_instructions,
            total_amount,
            created_at,
            customers (
              name,
              phone
            )
          `)
          .eq('restaurant_id', selectedRestaurant)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching orders:', error);
          return [];
        }

        // Transform the data
        return data.map((order: any) => ({
          id: order.id,
          customerName: order.customers?.name || 'Unknown',
          items: order.items_json?.map((item: any) => item.name || item.item_name) || [],
          total: order.total_amount,
          status: order.items_json?.status || 'pending',
          timestamp: new Date(order.created_at),
          special_instructions: order.special_instructions
        }));
      } catch (err) {
        console.error('Exception fetching orders:', err);
        return [];
      }
    },
    enabled: !!selectedRestaurant,
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Completed</Badge>;
      case "preparing":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Preparing</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200">Pending</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-700 border-red-200">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <AdminLayout>
      <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Restaurant Orders</h1>
          
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Restaurant Selection</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingRestaurants ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Loading restaurants...</span>
                  </div>
                ) : (
                  <Select
                    value={selectedRestaurant || ""}
                    onValueChange={setSelectedRestaurant}
                  >
                    <SelectTrigger className="w-[300px]">
                      <SelectValue placeholder="Select a restaurant" />
                    </SelectTrigger>
                    <SelectContent>
                      {restaurants.map((restaurant: any) => (
                        <SelectItem key={restaurant.id} value={restaurant.id}>
                          {restaurant.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </CardContent>
            </Card>

            {selectedRestaurant && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Items</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isLoadingOrders ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-6">
                              <div className="flex justify-center items-center">
                                <Loader2 className="h-6 w-6 animate-spin mr-2" />
                                Loading orders...
                              </div>
                            </TableCell>
                          </TableRow>
                        ) : orders.length > 0 ? (
                          orders.map((order: any) => (
                            <TableRow key={order.id}>
                              <TableCell className="font-medium">{order.id.substring(0, 8)}</TableCell>
                              <TableCell>{order.customerName}</TableCell>
                              <TableCell className="max-w-[200px] truncate">
                                {order.items.join(", ")}
                              </TableCell>
                              <TableCell>${Number(order.total).toFixed(2)}</TableCell>
                              <TableCell>{getStatusBadge(order.status)}</TableCell>
                              <TableCell>{format(new Date(order.timestamp), "PPp")}</TableCell>
                              <TableCell className="text-right">
                                <Button size="sm" variant="outline">View</Button>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                              No orders found for this restaurant
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </AdminLayout>
  );
};

export default RestaurantOrders;
