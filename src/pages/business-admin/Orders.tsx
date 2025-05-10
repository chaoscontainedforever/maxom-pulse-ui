
import BusinessAdminLayout from "@/components/BusinessAdmin/BusinessAdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrdersFilters } from "@/components/BusinessAdmin/Orders/OrdersFilters";
import { OrdersTable } from "@/components/BusinessAdmin/Orders/OrdersTable";
import { useOrdersData } from "@/hooks/useOrdersData";

const Orders = () => {
  const {
    orders: filteredOrders,
    isLoading,
    error,
    statusFilter,
    setStatusFilter,
    date,
    setDate,
    searchQuery,
    setSearchQuery
  } = useOrdersData();

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
            <OrdersFilters
              onSearchChange={setSearchQuery}
              onStatusChange={setStatusFilter}
              onDateChange={setDate}
              searchQuery={searchQuery}
              statusFilter={statusFilter}
              date={date}
            />
            
            <OrdersTable
              orders={filteredOrders}
              isLoading={isLoading}
              error={error}
            />
          </CardContent>
        </Card>
      </div>
    </BusinessAdminLayout>
  );
};

export default Orders;
