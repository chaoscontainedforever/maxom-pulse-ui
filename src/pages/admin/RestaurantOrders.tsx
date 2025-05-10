
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
import { Loader2 } from "lucide-react";
import { OrdersTable } from "@/components/BusinessAdmin/Orders/OrdersTable";
import { useOrdersData } from "@/hooks/useOrdersData";

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

  // Use our custom hook for orders data
  const {
    orders,
    isLoading: isLoadingOrders,
    error: ordersError
  } = useOrdersData(selectedRestaurant || undefined);

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
                  <OrdersTable 
                    orders={orders} 
                    isLoading={isLoadingOrders} 
                    error={ordersError}
                  />
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
