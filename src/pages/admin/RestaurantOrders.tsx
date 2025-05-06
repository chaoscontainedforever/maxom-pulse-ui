
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const orders = [
  {
    id: "ORD-001245",
    customer: "John Smith",
    restaurant: "Sunset Restaurant",
    items: ["Grilled Salmon", "Caesar Salad", "Lemonade"],
    total: "$42.95",
    status: "Completed",
    date: "2024-05-06 12:30 PM",
    phone: "+1 (555) 123-4567"
  },
  {
    id: "ORD-001244",
    customer: "Maria Garcia",
    restaurant: "Sunset Restaurant",
    items: ["Margherita Pizza", "Tiramisu", "Sparkling Water"],
    total: "$34.50",
    status: "In Progress",
    date: "2024-05-06 12:15 PM",
    phone: "+1 (555) 234-5678"
  },
  {
    id: "ORD-001243",
    customer: "Robert Johnson",
    restaurant: "Sunset Restaurant",
    items: ["Chicken Tacos (3)", "Guacamole", "Mexican Soda"],
    total: "$28.75",
    status: "In Progress",
    date: "2024-05-06 12:05 PM",
    phone: "+1 (555) 345-6789"
  },
  {
    id: "ORD-001242",
    customer: "Emily Wong",
    restaurant: "Sunset Restaurant",
    items: ["Vegetable Curry", "Naan Bread", "Mango Lassi"],
    total: "$32.25",
    status: "Completed",
    date: "2024-05-06 11:45 AM",
    phone: "+1 (555) 456-7890"
  },
  {
    id: "ORD-001241",
    customer: "Michael Brown",
    restaurant: "Sunset Restaurant",
    items: ["Steak Sandwich", "French Fries", "Iced Tea"],
    total: "$26.50",
    status: "Completed",
    date: "2024-05-06 11:30 AM",
    phone: "+1 (555) 567-8901"
  },
  {
    id: "ORD-001240",
    customer: "Sarah Davis",
    restaurant: "Fast Pizza",
    items: ["Pepperoni Pizza", "Garden Salad", "Soda"],
    total: "$24.99",
    status: "Cancelled",
    date: "2024-05-06 11:15 AM",
    phone: "+1 (555) 678-9012"
  },
  {
    id: "ORD-001239",
    customer: "David Wilson",
    restaurant: "Fast Pizza",
    items: ["Chicken Wings", "Garlic Knots", "Beer"],
    total: "$35.75",
    status: "Completed",
    date: "2024-05-06 11:00 AM",
    phone: "+1 (555) 789-0123"
  },
];

const RestaurantOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredOrders = orders.filter(
    order => 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.restaurant.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 space-y-4 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">Restaurant Orders</h1>
      </div>

      <div className="flex items-center space-x-2">
        <div className="flex-1">
          <Label htmlFor="search" className="sr-only">Search</Label>
          <Input 
            id="search" 
            placeholder="Search by order ID, customer, or restaurant..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">Filter</Button>
        <Button>Export</Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="inProgress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <Card className="shadow-sm border-0">
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Restaurant</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        {order.customer}
                        <div className="text-xs text-muted-foreground">{order.phone}</div>
                      </TableCell>
                      <TableCell>{order.restaurant}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {order.items.slice(0, 2).join(", ")}
                          {order.items.length > 2 && "..."}
                        </div>
                        <div className="text-xs text-muted-foreground">{order.items.length} items</div>
                      </TableCell>
                      <TableCell>{order.total}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === "Completed" ? "bg-green-100 text-green-700" : 
                          order.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                          "bg-red-100 text-red-700"
                        }`}>
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inProgress" className="space-y-4">
          <Card className="shadow-sm border-0">
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Restaurant</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders
                    .filter(order => order.status === "In Progress")
                    .map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        {order.customer}
                        <div className="text-xs text-muted-foreground">{order.phone}</div>
                      </TableCell>
                      <TableCell>{order.restaurant}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {order.items.slice(0, 2).join(", ")}
                          {order.items.length > 2 && "..."}
                        </div>
                        <div className="text-xs text-muted-foreground">{order.items.length} items</div>
                      </TableCell>
                      <TableCell>{order.total}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {/* Similar to "all" tab but filtered for completed orders */}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          {/* Similar to "all" tab but filtered for cancelled orders */}
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card className="shadow-sm border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Today's Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
            <p className="text-green-600 text-sm mt-1">+4 from yesterday</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Average Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$32.85</div>
            <p className="text-green-600 text-sm mt-1">+$1.20 from last week</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">94.7%</div>
            <p className="text-red-600 text-sm mt-1">-1.3% from last week</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RestaurantOrders;
