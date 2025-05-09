
import { useEffect, useState } from "react";
import {
  BarChart3,
  Calendar,
  Clock,
  DollarSign,
  PhoneIncoming,
  PhoneMissed,
  Star,
  Users,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CallsOverviewChart from "@/components/CallsOverviewChart";
import RecentCallsTable from "@/components/Dashboard/RecentCallsTable";
import BusinessSpecificDashboard from "@/components/Dashboard/BusinessSpecificDashboard";

const DashboardHome = () => {
  const [businessType, setBusinessType] = useState("restaurant");
  const [loading, setLoading] = useState(false);

  // Simulated data (would come from API)
  const stats = {
    totalCalls: 128,
    missedCalls: 3,
    ordersPlaced: 89,
    revenue: 2347.65,
    customerSatisfaction: 4.8,
    averageCallTime: "1m 24s",
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your business performance.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
            <PhoneIncoming className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCalls}</div>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Missed Calls</CardTitle>
            <PhoneMissed className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.missedCalls}</div>
            <p className="text-xs text-muted-foreground">
              -24% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Orders Placed</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.ordersPlaced}</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stats.revenue.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Calls Overview</CardTitle>
            <CardDescription>
              Your call volume and outcomes over time
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <CallsOverviewChart />
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Key metrics for your business</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Customer Satisfaction</span>
              <div className="flex items-center gap-1">
                <span className="font-bold">{stats.customerSatisfaction}</span>
                <Star className="h-4 w-4 fill-primary text-primary" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Average Call Time</span>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-bold">{stats.averageCallTime}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">New Customers</span>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="font-bold">24</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Conversion Rate</span>
              <div className="flex items-center gap-1">
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                <span className="font-bold">69.5%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recentCalls" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="recentCalls">Recent Calls</TabsTrigger>
          <TabsTrigger value="businessSpecific">Business Specific</TabsTrigger>
        </TabsList>
        <TabsContent value="recentCalls" className="space-y-4">
          <RecentCallsTable />
        </TabsContent>
        <TabsContent value="businessSpecific" className="space-y-4">
          <BusinessSpecificDashboard businessType={businessType} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardHome;
