
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, DollarSign, ShoppingBag, Utensils } from "lucide-react";

const RestaurantDashboard = () => {
  // Simulated data for restaurant orders
  const orders = [
    { 
      id: "ord-1", 
      caller: "John Smith", 
      items: ["Double Cheeseburger", "Large Fries", "Chocolate Shake"],
      total: 18.99,
      time: "2023-05-09 14:32",
      status: "ready"
    },
    { 
      id: "ord-2", 
      caller: "Sara Johnson", 
      items: ["Chicken Wings (12pc)", "Caesar Salad", "Soda"],
      total: 24.50,
      time: "2023-05-09 14:15",
      status: "preparing"
    },
    { 
      id: "ord-3", 
      caller: "Michael Brown", 
      items: ["Pepperoni Pizza (Large)", "Garlic Knots"],
      total: 22.95,
      time: "2023-05-09 13:52",
      status: "ready"
    },
    { 
      id: "ord-4", 
      caller: "Jessica Davis", 
      items: ["Grilled Chicken Sandwich", "Side Salad", "Iced Tea"],
      total: 15.75,
      time: "2023-05-09 13:40",
      status: "delivered"
    }
  ];

  const driveThruMetrics = {
    avgServiceTime: "3m 12s",
    currentWaitTime: "4m 30s",
    carsInLine: 3,
    avgOrderValue: "$21.45"
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ready":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Ready</Badge>;
      case "preparing":
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200">Preparing</Badge>;
      case "delivered":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Delivered</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Restaurant Dashboard</h2>
      
      {/* Drive-Thru Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Service Time</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <div className="text-2xl font-bold">{driveThruMetrics.avgServiceTime}</div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Wait Time</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-amber-500" />
            <div className="text-2xl font-bold">{driveThruMetrics.currentWaitTime}</div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Cars in Line</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-muted-foreground" />
            <div className="text-2xl font-bold">{driveThruMetrics.carsInLine}</div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-muted-foreground" />
            <div className="text-2xl font-bold">{driveThruMetrics.avgOrderValue}</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Orders Table */}
      <Tabs defaultValue="current">
        <TabsList>
          <TabsTrigger value="current">Current Orders</TabsTrigger>
          <TabsTrigger value="past">Past Orders</TabsTrigger>
        </TabsList>
        
        <TabsContent value="current" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Orders</CardTitle>
              <Button variant="outline" size="sm">Refresh</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.caller}</TableCell>
                      <TableCell>
                        <div className="max-w-[200px] truncate">
                          {order.items.join(", ")}
                        </div>
                      </TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>{order.time}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="past">
          <Card>
            <CardHeader>
              <CardTitle>Past Orders</CardTitle>
              <CardDescription>
                View order history and customer details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Past orders will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RestaurantDashboard;
