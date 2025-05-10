
import { useEffect } from "react";
import { useAuth } from "@/context/auth";
import { toast } from "@/hooks/use-toast";
import BusinessAdminLayout from "@/components/BusinessAdmin/BusinessAdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrdersFilters } from "@/components/BusinessAdmin/Orders/OrdersFilters";
import { OrdersTable } from "@/components/BusinessAdmin/Orders/OrdersTable";
import { useOrdersData } from "@/hooks/useOrdersData";
import PermissionGuard from "@/components/PermissionGuard";
import { AlertCircle } from "lucide-react";

const Orders = () => {
  const { profile, loading } = useAuth();
  const {
    orders,
    isLoading,
    error,
    statusFilter,
    setStatusFilter,
    date,
    setDate,
    searchQuery,
    setSearchQuery,
    hasBusiness
  } = useOrdersData(profile?.business_id);

  // Debug logging
  useEffect(() => {
    console.log("Orders page mounted");
    console.log("Auth loading:", loading);
    console.log("Profile:", profile);
    console.log("Business ID:", profile?.business_id);
    console.log("Orders data:", { count: orders?.length, isLoading, error });
    
    if (!profile?.business_id && !loading) {
      toast({
        title: "Missing business ID",
        description: "Your user profile isn't linked to a business. Demo data is being shown.",
        variant: "default" // Changed from "warning" to "default" to match allowed variants
      });
    }
  }, [orders, isLoading, error, profile, loading]);

  return (
    <BusinessAdminLayout>
      <PermissionGuard requiredRole="business_owner">
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
              {!profile?.business_id && !loading && (
                <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-800">
                    <p className="font-semibold mb-1">Demo Mode Active</p>
                    <p>Your user account isn't linked to a business. Sample order data is being displayed.</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2 bg-white border-amber-300 text-amber-700 hover:bg-amber-100"
                      onClick={() => toast({
                        title: "Account setup required",
                        description: "Please contact an administrator to link your account to a business.",
                      })}
                    >
                      Request Business Setup
                    </Button>
                  </div>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <OrdersFilters
                onSearchChange={setSearchQuery}
                onStatusChange={setStatusFilter}
                onDateChange={setDate}
                searchQuery={searchQuery}
                statusFilter={statusFilter}
                date={date}
              />
              
              <OrdersTable
                orders={orders}
                isLoading={isLoading || loading}
                error={error}
                isDemoData={!hasBusiness}
              />
            </CardContent>
          </Card>
        </div>
      </PermissionGuard>
    </BusinessAdminLayout>
  );
};

export default Orders;
