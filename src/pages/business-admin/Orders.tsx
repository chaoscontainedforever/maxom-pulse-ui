
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import BusinessAdminLayout from "@/components/BusinessAdmin/BusinessAdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Calendar as CalendarIcon, Loader2, Search } from "lucide-react";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { RestaurantOrder } from "@/types/schema";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/auth";

const Orders = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const { profile } = useAuth();

  // Fetch orders from Supabase
  const { data: orders = [], isLoading, error } = useQuery({
    queryKey: ['orders', profile?.business_id],
    queryFn: async () => {
      if (!profile?.business_id) {
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
          .eq('restaurant_id', profile.business_id)
          .order('created_at', { ascending: false });
          
        if (error) {
          console.error('Error fetching orders:', error);
          toast({
            title: 'Error fetching orders',
            description: error.message,
            variant: 'destructive'
          });
          return [];
        }
        
        // Transform the data to match our component needs
        return data.map((order: any) => ({
          id: order.id,
          customerName: order.customers?.name || 'Unknown',
          items: order.items_json?.map((item: any) => item.name || item.item_name) || [],
          total: order.total_amount,
          status: order.items_json?.status || 'pending',
          timestamp: new Date(order.created_at),
          special_instructions: order.special_instructions,
          phone: order.customers?.phone
        }));
      } catch (err) {
        console.error('Exception fetching orders:', err);
        toast({
          title: 'Error fetching orders',
          description: 'An unexpected error occurred',
          variant: 'destructive'
        });
        return [];
      }
    },
    enabled: !!profile?.business_id,
  });

  // Filter orders based on selected filters
  const filteredOrders = orders.filter((order: any) => {
    // Filter by status
    if (statusFilter !== "all" && order.status !== statusFilter) {
      return false;
    }
    
    // Filter by date
    if (date && order.timestamp && (
      order.timestamp.getDate() !== date.getDate() ||
      order.timestamp.getMonth() !== date.getMonth() ||
      order.timestamp.getFullYear() !== date.getFullYear()
    )) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !order.id.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
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
    <BusinessAdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
          <p className="text-muted-foreground">
            Manage food orders for your restaurant
          </p>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Order Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by order ID or customer..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="preparing">Preparing</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[180px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Filter by date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
              {date && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setDate(undefined)}
                >
                  Clear date
                </Button>
              )}
            </div>
            
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
                  ) : filteredOrders.length > 0 ? (
                    filteredOrders.map((order: any) => (
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
                        No orders found matching your filters
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </BusinessAdminLayout>
  );
};

export default Orders;
