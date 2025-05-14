
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Eye } from "lucide-react";

export interface CustomerData {
  business: string;
  email: string;
  type: string;
  owner: string;
  users: number;
  created: string;
}

interface CustomerTableProps {
  customers: CustomerData[];
}

export const CustomerTable = ({ customers }: CustomerTableProps) => {
  return (
    <Card className="shadow-sm">
      <div className="p-6 pb-4">
        <h2 className="text-xl font-semibold">All Customers</h2>
        <p className="text-muted-foreground text-sm">View and manage all registered business customers</p>
      </div>
      
      <div className="overflow-hidden rounded-b-lg">
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
            {customers.map((customer, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">
                  <div>
                    {customer.business}
                    <div className="text-xs text-muted-foreground">{customer.email}</div>
                  </div>
                </TableCell>
                <TableCell>{customer.type}</TableCell>
                <TableCell>{customer.owner}</TableCell>
                <TableCell>{customer.users}</TableCell>
                <TableCell>{customer.created}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                    asChild
                  >
                    <Link to={`/cms/customers/${customer.business.toLowerCase().replace(/\s+/g, '-')}`}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
