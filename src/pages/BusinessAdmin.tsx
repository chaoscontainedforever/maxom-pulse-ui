
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BusinessAdminLayout from "@/components/BusinessAdmin/BusinessAdminLayout";
import { useAuth } from "@/context/AuthContext";
import { BarChart, Phone, Check, Calendar } from "lucide-react";
import { useState, useEffect } from "react";

// Mock data for business dashboard
const mockCallData = [
  { day: "Mon", calls: 12 },
  { day: "Tue", calls: 18 },
  { day: "Wed", calls: 15 },
  { day: "Thu", calls: 25 },
  { day: "Fri", calls: 22 },
  { day: "Sat", calls: 8 },
  { day: "Sun", calls: 5 },
];

const BusinessAdmin = () => {
  const { profile } = useAuth();
  const [businessType, setBusinessType] = useState<string>(profile?.business_type || "");
  const [stats, setStats] = useState({
    totalCalls: 105,
    handledCalls: 98,
    appointments: 42,
    orders: 37,
    testDrives: 8,
  });

  useEffect(() => {
    if (profile?.business_type) {
      setBusinessType(profile.business_type);
    }
  }, [profile]);

  // Get business-specific stats based on business type
  const getBusinessSpecificStats = () => {
    switch (businessType) {
      case "restaurant":
        return (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Orders Summary</CardTitle>
              <CardDescription>Last 7 days order summary</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-3xl font-bold">{stats.orders}</p>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-medium text-green-600">$1,285.75</p>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case "fitness":
        return (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Class Bookings</CardTitle>
              <CardDescription>Last 7 days class bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-3xl font-bold">{stats.appointments}</p>
                  <p className="text-sm text-muted-foreground">Class Bookings</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-medium">28</p>
                  <p className="text-sm text-muted-foreground">Available Spots</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case "auto":
        return (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Test Drives</CardTitle>
              <CardDescription>Last 7 days test drive appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-3xl font-bold">{stats.testDrives}</p>
                  <p className="text-sm text-muted-foreground">Test Drives</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-medium">12</p>
                  <p className="text-sm text-muted-foreground">Service Appointments</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case "healthcare":
        return (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Patient Appointments</CardTitle>
              <CardDescription>Last 7 days appointment summary</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-3xl font-bold">{stats.appointments}</p>
                  <p className="text-sm text-muted-foreground">Total Appointments</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-medium text-amber-600">5</p>
                  <p className="text-sm text-muted-foreground">Pending Confirmations</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case "homeservices":
        return (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Jobs Summary</CardTitle>
              <CardDescription>Last 7 days service jobs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-3xl font-bold">{stats.appointments}</p>
                  <p className="text-sm text-muted-foreground">Scheduled Jobs</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-medium text-green-600">$3,450</p>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Business Summary</CardTitle>
              <CardDescription>Last 7 days summary</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between">
                <p className="text-3xl font-bold">{stats.totalCalls}</p>
                <p className="text-sm text-muted-foreground">Total Interactions</p>
              </div>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <BusinessAdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
          <p className="text-muted-foreground">
            Here's an overview of your business's performance
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Call Stats Card */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Call Activity</CardTitle>
                <Phone className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardDescription>Last 7 days summary</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-3xl font-bold">{stats.totalCalls}</p>
                  <p className="text-sm text-muted-foreground">Total Calls</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-medium text-green-600">{stats.handledCalls}</p>
                  <p className="text-sm text-muted-foreground">Handled</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Appointments/Calendar Card */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Appointments</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardDescription>Upcoming schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-3xl font-bold">{stats.appointments}</p>
                  <p className="text-sm text-muted-foreground">Total</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-medium">8</p>
                  <p className="text-sm text-muted-foreground">Today</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Specific Card */}
          {getBusinessSpecificStats()}
        </div>

        {/* Call Analytics */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Call Analytics</CardTitle>
                  <CardDescription>Calls received per day</CardDescription>
                </div>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[200px] flex items-end space-x-2">
                {mockCallData.map(data => (
                  <div key={data.day} className="flex flex-col items-center">
                    <div
                      className="bg-gradient-to-t from-maxom-violet to-maxom-orange rounded-t w-12 transition-all"
                      style={{ height: `${(data.calls / 25) * 170}px` }}
                    ></div>
                    <div className="mt-2 text-xs">{data.day}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Interactions Table */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Interactions</CardTitle>
                  <CardDescription>Recent customer calls and actions</CardDescription>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Check className="h-4 w-4 mr-1 text-green-500" />
                  All handled by AI
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="p-3">
                  <div className="font-medium">John Smith - (555) 123-4567</div>
                  <div className="text-sm text-muted-foreground">Requested appointment for tomorrow @ 2:30 PM</div>
                  <div className="text-xs mt-1 text-green-600">Today, 10:24 AM</div>
                </div>
                <div className="border-t p-3">
                  <div className="font-medium">Sarah Johnson - (555) 987-6543</div>
                  <div className="text-sm text-muted-foreground">Asked about business hours and services</div>
                  <div className="text-xs mt-1 text-green-600">Today, 9:15 AM</div>
                </div>
                <div className="border-t p-3">
                  <div className="font-medium">Michael Davis - (555) 456-7890</div>
                  <div className="text-sm text-muted-foreground">Inquired about pricing for services</div>
                  <div className="text-xs mt-1 text-green-600">Yesterday, 4:45 PM</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </BusinessAdminLayout>
  );
};

export default BusinessAdmin;
