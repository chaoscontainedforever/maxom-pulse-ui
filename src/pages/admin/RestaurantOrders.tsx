
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { useQuery } from "@tanstack/react-query";
import { RestaurantSelector } from "@/components/Admin/Orders/RestaurantSelector";
import { OrdersDisplay } from "@/components/Admin/Orders/OrdersDisplay";
import { useOrdersData } from "@/hooks/useOrdersData";
import { fetchRestaurants } from "@/services/restaurantService";

const RestaurantOrders = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);

  // Fetch restaurants for super admin
  const { data: restaurants = [], isLoading: isLoadingRestaurants } = useQuery({
    queryKey: ['restaurants'],
    queryFn: fetchRestaurants,
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
            <RestaurantSelector
              restaurants={restaurants}
              isLoading={isLoadingRestaurants}
              selectedRestaurant={selectedRestaurant}
              onRestaurantChange={setSelectedRestaurant}
            />

            {selectedRestaurant && (
              <OrdersDisplay 
                orders={orders} 
                isLoading={isLoadingOrders} 
                error={ordersError} 
              />
            )}
          </div>
        </div>
      </main>
    </AdminLayout>
  );
};

export default RestaurantOrders;
