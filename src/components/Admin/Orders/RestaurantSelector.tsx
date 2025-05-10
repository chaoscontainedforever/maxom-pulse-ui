
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

interface Restaurant {
  id: string;
  name: string;
}

interface RestaurantSelectorProps {
  restaurants: Restaurant[];
  isLoading: boolean;
  selectedRestaurant: string | null;
  onRestaurantChange: (restaurantId: string) => void;
}

export const RestaurantSelector = ({
  restaurants,
  isLoading,
  selectedRestaurant,
  onRestaurantChange
}: RestaurantSelectorProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Restaurant Selection</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Loading restaurants...</span>
          </div>
        ) : (
          <Select
            value={selectedRestaurant || ""}
            onValueChange={onRestaurantChange}
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
  );
};
