
import BusinessAdminLayout from "@/components/BusinessAdmin/BusinessAdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrdersFilters } from "@/components/BusinessAdmin/Orders/OrdersFilters";
import { OrdersTable } from "@/components/BusinessAdmin/Orders/OrdersTable";
import { useOrdersData } from "@/hooks/useOrdersData";
import PermissionGuard from "@/components/PermissionGuard";
import { useEffect } from "react";
import { useAuth } from "@/context/auth";

const Orders = () => {
  const { profile } = useAuth();
  const {
    orders,
    isLoading,
    error,
    statusFilter,
    setStatusFilter,
    date,
    setDate,
    searchQuery,
    setSearchQuery
  } = useOrdersData();

  // Debug logging
  useEffect(() => {
    console.log("Orders page mounted");
    console.log("Profile:", profile);
    console.log("Business ID:", profile?.business_id);
    console.log("Orders data:", { count: orders?.length, isLoading, error });
  }, [orders, isLoading, error, profile]);

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
                isLoading={isLoading}
                error={error}
              />
            </CardContent>
          </Card>
        </div>
      </PermissionGuard>
    </BusinessAdminLayout>
  );
};

export default Orders;
