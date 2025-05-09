
import { useEffect } from "react";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, LineChart, PieChart, ArrowDownload } from "lucide-react";

const Analytics = () => {
  useEffect(() => {
    // This could be used to fetch analytics data
    console.log("Analytics page loaded");
  }, []);

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">68.2%</div>
              <p className="text-green-600 text-sm mt-1">+4.3% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Customer Satisfaction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">4.8/5</div>
              <p className="text-green-600 text-sm mt-1">+0.2 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Cost per Call</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$1.24</div>
              <p className="text-green-600 text-sm mt-1">-$0.11 from last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="h-80">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Call Volume Trends</CardTitle>
              <Button variant="outline" size="sm">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Details
              </Button>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <LineChart className="mx-auto h-16 w-16 mb-2" />
                <p>Chart visualization would appear here</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="h-80">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Call Types Distribution</CardTitle>
              <Button variant="outline" size="sm">
                <PieChart className="mr-2 h-4 w-4" />
                View Details
              </Button>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <PieChart className="mx-auto h-16 w-16 mb-2" />
                <p>Chart visualization would appear here</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Reports</CardTitle>
            <Button variant="outline" size="sm">
              <ArrowDownload className="mr-2 h-4 w-4" />
              Export Data
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["Weekly Performance", "Monthly Call Summary", "Customer Feedback Analysis", "Agent Performance", "ROI Analysis"].map((report, i) => (
                <div key={i} className="flex items-center justify-between pb-4 border-b last:border-0">
                  <div>
                    <p className="font-medium">{report}</p>
                    <p className="text-sm text-gray-500">Last updated: {i + 1} day{i !== 0 ? "s" : ""} ago</p>
                  </div>
                  <Button variant="ghost" size="sm">View Report</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
