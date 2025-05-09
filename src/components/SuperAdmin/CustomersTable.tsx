
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowUpDown, ChevronDown, Eye, MoreHorizontal, 
  Plus, Search, UserCheck 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CustomersTable = () => {
  const [filter, setFilter] = useState("");
  
  // Simulated customer data
  const customers = [
    {
      id: 1,
      businessName: "Main Street Restaurant",
      type: "restaurant",
      owner: "John Smith",
      email: "john@mainstreet.com",
      phone: "(555) 123-4567",
      status: "active",
      usersCount: 3,
      dateJoined: "2023-04-12",
    },
    {
      id: 2,
      businessName: "Fitness First Studio",
      type: "fitness",
      owner: "Sarah Johnson",
      email: "sarah@fitnessfirst.com",
      phone: "(555) 234-5678",
      status: "active",
      usersCount: 2,
      dateJoined: "2023-04-28",
    },
    {
      id: 3,
      businessName: "City Auto Dealership",
      type: "auto",
      owner: "Michael Brown",
      email: "michael@cityauto.com",
      phone: "(555) 345-6789",
      status: "pending",
      usersCount: 5,
      dateJoined: "2023-05-03",
    },
    {
      id: 4,
      businessName: "Wellness Medical Center",
      type: "healthcare",
      owner: "Dr. Emily Chen",
      email: "emily@wellness.com",
      phone: "(555) 456-7890",
      status: "active",
      usersCount: 8,
      dateJoined: "2023-05-01",
    },
    {
      id: 5,
      businessName: "Speedy Plumbing & Electric",
      type: "homeservices",
      owner: "Robert Wilson",
      email: "robert@speedyservices.com",
      phone: "(555) 567-8901",
      status: "suspended",
      usersCount: 4,
      dateJoined: "2023-04-15",
    }
  ];
  
  const getBusinessTypeBadge = (type: string) => {
    switch (type) {
      case "restaurant":
        return <Badge className="bg-orange-100 text-orange-700 border-orange-200">Restaurant</Badge>;
      case "fitness":
        return <Badge className="bg-indigo-100 text-indigo-700 border-indigo-200">Fitness</Badge>;
      case "auto":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Auto</Badge>;
      case "healthcare":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Healthcare</Badge>;
      case "homeservices":
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200">Home Services</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200">Pending</Badge>;
      case "suspended":
        return <Badge className="bg-red-100 text-red-700 border-red-200">Suspended</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const filteredCustomers = customers.filter(customer =>
    customer.businessName.toLowerCase().includes(filter.toLowerCase()) ||
    customer.owner.toLowerCase().includes(filter.toLowerCase()) ||
    customer.email.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <div className="flex gap-2 self-end">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </div>
      
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">
                <div className="flex items-center cursor-pointer hover:text-primary">
                  Business
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">
                  <div>
                    <div>{customer.businessName}</div>
                    <div className="text-xs text-muted-foreground">{customer.phone}</div>
                  </div>
                </TableCell>
                <TableCell>{getBusinessTypeBadge(customer.type)}</TableCell>
                <TableCell>
                  <div>
                    <div>{customer.owner}</div>
                    <div className="text-xs text-muted-foreground">{customer.email}</div>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(customer.status)}</TableCell>
                <TableCell>{customer.usersCount}</TableCell>
                <TableCell>{customer.dateJoined}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[200px]">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <UserCheck className="mr-2 h-4 w-4" />
                          Login as Customer
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit Details</DropdownMenuItem>
                        <DropdownMenuItem>Manage Users</DropdownMenuItem>
                        <DropdownMenuItem>Voice Settings</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          Suspend Account
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            
            {filteredCustomers.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                  No customers found matching your search
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CustomersTable;
