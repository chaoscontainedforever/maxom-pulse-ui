
import { useEffect } from "react";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, BarChart2, CalendarDays } from "lucide-react";

const Calls = () => {
  useEffect(() => {
    // This could be used to fetch calls data
    console.log("Calls page loaded");
  }, []);

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Calls Management</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Calls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">247</div>
              <p className="text-green-600 text-sm mt-1">+12% from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Avg. Call Duration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">2m 38s</div>
              <p className="text-green-600 text-sm mt-1">+24s from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">92%</div>
              <p className="text-red-600 text-sm mt-1">-2% from last week</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Recent Calls</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Phone className="mr-2 h-4 w-4" />
                New Call
              </Button>
              <Button variant="outline" size="sm">
                <CalendarDays className="mr-2 h-4 w-4" />
                Schedule
              </Button>
              <Button variant="outline" size="sm">
                <BarChart2 className="mr-2 h-4 w-4" />
                Reports
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between pb-4 border-b last:border-0">
                  <div>
                    <p className="font-medium">Customer #{i}</p>
                    <p className="text-sm text-gray-500">Today at {10 + i}:{i * 10} AM • {2 + i}m {20 + i * 10}s</p>
                  </div>
                  <Button variant="ghost" size="sm">Details</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Calls;
