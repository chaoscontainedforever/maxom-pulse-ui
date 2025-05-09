
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SuperAdminLayout from "@/components/SuperAdmin/SuperAdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CustomersTable from "@/components/SuperAdmin/CustomersTable";
import { useAuth } from "@/context/auth";
import { toast } from "@/hooks/use-toast";

const SuperAdmin = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Only run check when loading is complete
    if (loading) return;
    
    console.log("SuperAdmin page - checking auth:", { user, profile });

    // Check if user has super_admin role
    if (!user) {
      // Check for mock super admin in localStorage
      const mockSuperAdmin = localStorage.getItem('mockSuperAdmin');
      if (!mockSuperAdmin) {
        toast({
          title: "Access Denied",
          description: "You must be logged in to access the Super Admin panel.",
          variant: "destructive"
        });
        navigate("/login");
        return;
      }
      // If mockSuperAdmin exists, let the auth provider handle it
    }
    
    if (profile && profile.role !== 'super_admin') {
      toast({
        title: "Access Denied",
        description: "You do not have permission to access the Super Admin panel.",
        variant: "destructive"
      });
      navigate("/dashboard");
    }
  }, [profile, navigate, user, loading]);

  // Show loading state while auth is being checked
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <SuperAdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-2">Super Admin Dashboard</h1>
        <p className="text-muted-foreground mb-6">Manage all customers and system settings</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>All Customers</CardTitle>
            <CardDescription>
              View and manage all registered business customers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CustomersTable />
          </CardContent>
        </Card>
      </div>
    </SuperAdminLayout>
  );
};

export default SuperAdmin;
