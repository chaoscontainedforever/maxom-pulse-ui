
import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Eye } from "lucide-react";
import { mockBusinesses, mockUserProfiles, getBusinessTypeLabel } from "@/lib/mock-data";
import { useNavigate } from "react-router-dom";
import { Business, UserProfile } from "@/types/schema";

interface CustomerData extends Business {
  ownerName: string;
  usersCount: number;
}

interface CustomersTableProps {
  searchTerm?: string;
}

const CustomerTableMock = ({ searchTerm = "" }: CustomersTableProps) => {
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API fetch
    const fetchData = async () => {
      setLoading(true);
      
      // Process the mock data
      const processedCustomers = mockBusinesses.map(business => {
        const users = mockUserProfiles.filter(user => user.business_id === business.id);
        const owner = users.find(user => user.role === "business_owner");
        
        return {
          ...business,
          ownerName: owner ? `${owner.first_name} ${owner.last_name}` : "No owner",
          usersCount: users.length
        };
      });
      
      setTimeout(() => {
        setCustomers(processedCustomers);
        setLoading(false);
      }, 800); // Simulate network delay
    };

    fetchData();
  }, []);

  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const viewCustomer = (customerId: string) => {
    navigate(`/super-admin/customer/${customerId}`);
  };

  if (loading) {
    return (
      <div className="py-10">
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex items-center justify-between p-4 border rounded animate-pulse">
              <div className="space-y-2">
                <div className="h-4 w-48 bg-muted rounded"></div>
                <div className="h-3 w-32 bg-muted rounded"></div>
              </div>
              <div className="h-8 w-20 bg-muted rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (filteredCustomers.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No customers found matching "{searchTerm}"</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Business</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Users</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCustomers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>
                <div className="font-medium">{customer.name}</div>
                <div className="text-sm text-muted-foreground">{customer.email}</div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{getBusinessTypeLabel(customer.business_type)}</Badge>
              </TableCell>
              <TableCell>{customer.ownerName}</TableCell>
              <TableCell>{customer.usersCount}</TableCell>
              <TableCell>{new Date(customer.created_at).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => viewCustomer(customer.id)}
                  className="gap-1"
                >
                  <Eye className="h-4 w-4" />
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomerTableMock;
