
import { useState } from "react";
import BusinessAdminLayout from "@/components/BusinessAdmin/BusinessAdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart2, Clock, PhoneCall, UserMinus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for drive-thru metrics
const weeklyOrders = [
  { day: "Mon", orders: 58, avgTime: 62 },
  { day: "Tue", orders: 42, avgTime: 54 },
  { day: "Wed", orders: 67, avgTime: 59 },
  { day: "Thu", orders: 53, avgTime: 48 },
  { day: "Fri", orders: 92, avgTime: 67 },
  { day: "Sat", orders: 86, avgTime: 72 },
  { day: "Sun", orders: 45, avgTime: 51 },
];

const monthlyOrders = [
  { day: "Week 1", orders: 342, avgTime: 58 },
  { day: "Week 2", orders: 398, avgTime: 62 },
  { day: "Week 3", orders: 427, avgTime: 59 },
  { day: "Week 4", orders: 375, avgTime: 61 },
];

const hourlyBreakdown = [
  { hour: "8AM", orders: 12 },
  { hour: "9AM", orders: 18 },
  { hour: "10AM", orders: 24 },
  { hour: "11AM", orders: 45 },
  { hour: "12PM", orders: 52 },
  { hour: "1PM", orders: 48 },
  { hour: "2PM", orders: 36 },
  { hour: "3PM", orders: 28 },
  { hour: "4PM", orders: 22 },
  { hour: "5PM", orders: 38 },
  { hour: "6PM", orders: 47 },
  { hour: "7PM", orders: 32 },
  { hour: "8PM", orders: 24 },
  { hour: "9PM", orders: 16 },
];

const DriveThruMetrics = () => {
  const [timeRange, setTimeRange] = useState<"weekly" | "monthly">("weekly");
  
  // Calculate the key metrics
  const totalOrders = timeRange === "weekly" 
    ? weeklyOrders.reduce((sum, day) => sum + day.orders, 0)
    : monthlyOrders.reduce((sum, week) => sum + week.orders, 0);
  
  const averageTime = timeRange === "weekly"
    ? Math.round(weeklyOrders.reduce((sum, day) => sum + day.avgTime, 0) / weeklyOrders.length)
    : Math.round(monthlyOrders.reduce((sum, week) => sum + week.avgTime, 0) / monthlyOrders.length);
  
  const missedCalls = timeRange === "weekly" ? 23 : 86;
  
  // Find peak hour
  const peakHourData = hourlyBreakdown.reduce((max, hour) => 
    hour.orders > max.orders ? hour : max, 
    hourlyBreakdown[0]
  );

  return (
    <BusinessAdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Drive-Thru Metrics</h2>
          <p className="text-muted-foreground">
            Analytics and performance metrics for your drive-thru operations
          </p>
        </div>

        <div className="flex justify-end">
          <Select value={timeRange} onValueChange={(value: "weekly" | "monthly") => setTimeRange(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly View</SelectItem>
              <SelectItem value="monthly">Monthly View</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Key metrics cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Drive-Thru Orders
              </CardTitle>
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalOrders}</div>
              <p className="text-xs text-muted-foreground">
                {timeRange === "weekly" ? "Past 7 days" : "Past month"}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg. Call-to-Order Duration
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageTime} seconds</div>
              <p className="text-xs text-muted-foreground">
                {averageTime < 60 ? "Good" : "Needs improvement"}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Peak Hour
              </CardTitle>
              <PhoneCall className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{peakHourData.hour}</div>
              <p className="text-xs text-muted-foreground">
                {peakHourData.orders} orders
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Missed Calls
              </CardTitle>
              <UserMinus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{missedCalls}</div>
              <p className="text-xs text-muted-foreground">
                {timeRange === "weekly" ? "Past 7 days" : "Past month"}
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="orders" className="space-y-4">
          <TabsList>
            <TabsTrigger value="orders">Orders by Day</TabsTrigger>
            <TabsTrigger value="time">Call Duration</TabsTrigger>
            <TabsTrigger value="hourly">Hourly Distribution</TabsTrigger>
          </TabsList>
          
          {/* Orders by Day Chart */}
          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Drive-Thru Orders</CardTitle>
                <CardDescription>
                  {timeRange === "weekly" 
                    ? "Number of drive-thru orders per day this week" 
                    : "Number of drive-thru orders per week this month"}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[300px] flex items-end space-x-2">
                  {(timeRange === "weekly" ? weeklyOrders : monthlyOrders).map((data) => (
                    <div key={data.day} className="flex flex-col items-center flex-1">
                      <div
                        className="bg-gradient-to-t from-maxom-violet to-maxom-orange rounded-t w-full transition-all"
                        style={{ height: `${(data.orders / (timeRange === "weekly" ? 100 : 450)) * 250}px` }}
                      ></div>
                      <div className="mt-2 text-xs font-medium">{data.day}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Call Duration Chart */}
          <TabsContent value="time" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Average Call Duration</CardTitle>
                <CardDescription>
                  {timeRange === "weekly" 
                    ? "Average time in seconds per day this week" 
                    : "Average time in seconds per week this month"}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[300px] flex items-end space-x-2">
                  {(timeRange === "weekly" ? weeklyOrders : monthlyOrders).map((data) => (
                    <div key={data.day} className="flex flex-col items-center flex-1">
                      <div
                        className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t w-full transition-all"
                        style={{ height: `${(data.avgTime / 80) * 250}px` }}
                      ></div>
                      <div className="mt-2 text-xs font-medium">{data.day}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Hourly Distribution Chart */}
          <TabsContent value="hourly" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Hourly Order Distribution</CardTitle>
                <CardDescription>
                  Number of orders by hour of day
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[300px] flex items-end space-x-2">
                  {hourlyBreakdown.map((data) => (
                    <div key={data.hour} className="flex flex-col items-center flex-1">
                      <div
                        className="bg-gradient-to-t from-green-600 to-green-400 rounded-t w-full transition-all"
                        style={{ height: `${(data.orders / 55) * 250}px` }}
                      ></div>
                      <div className="mt-2 text-xs font-medium">{data.hour}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </BusinessAdminLayout>
  );
};

export default DriveThruMetrics;
