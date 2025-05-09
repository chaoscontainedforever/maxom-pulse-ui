
import { useState } from "react";
import BusinessAdminLayout from "@/components/BusinessAdmin/BusinessAdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarIcon, Search } from "lucide-react";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// Mock data for customers
const mockCustomers = [
  {
    id: 1,
    name: "John Smith",
    phone: "(555) 123-4567",
    lastOrder: new Date("2025-05-08T14:30:00"),
    totalSpent: 245.75,
    tags: ["Frequent", "Vegetarian"]
  },
  {
    id: 2,
    name: "Sarah Johnson",
    phone: "(555) 987-6543",
    lastOrder: new Date("2025-05-07T18:15:00"),
    totalSpent: 189.50,
    tags: ["New Customer"]
  },
  {
    id: 3,
    name: "Michael Brown",
    phone: "(555) 456-7890",
    lastOrder: new Date("2025-05-09T12:20:00"),
    totalSpent: 432.25,
    tags: ["Frequent", "Delivery Only"]
  },
  {
    id: 4,
    name: "Emily Davis",
    phone: "(555) 234-5678",
    lastOrder: new Date("2025-05-03T20:10:00"),
    totalSpent: 157.85,
    tags: ["Allergies"]
  },
  {
    id: 5,
    name: "Robert Wilson",
    phone: "(555) 876-5432",
    lastOrder: new Date("2025-05-05T13:45:00"),
    totalSpent: 310.20,
    tags: ["Frequent", "Special Requests"]
  }
];

const Customers = () => {
  const [dateRange, setDateRange] = useState<Date | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter customers based on search and date
  const filteredCustomers = mockCustomers.filter(customer => {
    // Filter by search query (name or phone)
    if (searchQuery && !customer.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !customer.phone.includes(searchQuery)) {
      return false;
    }
    
    // Filter by engagement date
    if (dateRange) {
      const orderDate = customer.lastOrder;
      if (
        orderDate.getDate() !== dateRange.getDate() ||
        orderDate.getMonth() !== dateRange.getMonth() ||
        orderDate.getFullYear() !== dateRange.getFullYear()
      ) {
        return false;
      }
    }
    
    return true;
  });

  return (
    <BusinessAdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
          <p className="text-muted-foreground">
            Manage your restaurant customers and their ordering history
          </p>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Customer Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by name or phone..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[220px] justify-start text-left font-normal",
                      !dateRange && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange ? format(dateRange, "PPP") : "Filter by engagement date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateRange}
                    onSelect={setDateRange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
              {dateRange && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setDateRange(undefined)}
                >
                  Clear date
                </Button>
              )}
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Last Order</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">{customer.name}</TableCell>
                        <TableCell>{customer.phone}</TableCell>
                        <TableCell>{format(customer.lastOrder, "PP")}</TableCell>
                        <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {customer.tags.map((tag, idx) => (
                              <Badge key={idx} variant="outline">{tag}</Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="outline">View Profile</Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                        No customers found matching your criteria
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

export default Customers;
