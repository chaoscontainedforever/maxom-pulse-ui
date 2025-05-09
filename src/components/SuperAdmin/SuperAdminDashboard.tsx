
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import CustomersTable from "./CustomersTable";

const SuperAdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">247</div>
            <p className="text-green-600 text-sm mt-1">+12 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,382</div>
            <p className="text-green-600 text-sm mt-1">+78 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Voice Minutes Used</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">32,847</div>
            <p className="text-green-600 text-sm mt-1">+3,254 this month</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>All Customers</CardTitle>
            <p className="text-sm text-muted-foreground">
              View and manage all registered business customers
            </p>
          </div>
          
          <Button 
            onClick={() => navigate('/super-admin/new-customer')}
            className="gap-2"
          >
            <UserPlus className="h-4 w-4" />
            Add Customer
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search customers..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
          
          <CustomersTable searchTerm={searchTerm} />
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAdminDashboard;
