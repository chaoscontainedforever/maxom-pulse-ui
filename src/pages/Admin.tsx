import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CallsOverviewChart from "@/components/CallsOverviewChart";

const Admin = () => {
  return (
    <AdminLayout>
      <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="shadow-sm border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Calls</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2,543</div>
                <p className="text-green-600 text-sm mt-1">+15% from last week</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">94.2%</div>
                <p className="text-green-600 text-sm mt-1">+2.1% from last week</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Avg. Call Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1m 42s</div>
                <p className="text-red-600 text-sm mt-1">-12s from last week</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Active Businesses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">168</div>
                <p className="text-green-600 text-sm mt-1">+3 new this week</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card className="shadow-sm border-0">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Calls Overview</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <CallsOverviewChart />
              </CardContent>
            </Card>
            
            <Card className="shadow-sm border-0">
              <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Recent Businesses</CardTitle>
                <Button variant="outline" size="sm">View All</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center justify-between pb-4 border-b last:border-0">
                      <div>
                        <p className="font-medium">Sunset Restaurant</p>
                        <p className="text-sm text-gray-500">Food & Dining • {40 - i * 5} calls today</p>
                      </div>
                      <Button variant="ghost" size="sm">Details</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity Log */}
          <Card className="shadow-sm border-0">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
              <Button variant="outline" size="sm">View All Activity</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex gap-4 pb-4 border-b last:border-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-card1 flex items-center justify-center text-white">
                      {i % 3 === 0 ? "JD" : i % 2 === 0 ? "SR" : "MC"}
                    </div>
                    <div>
                      <p><span className="font-medium">Jackson D.</span> <span className="text-gray-500">updated call script for</span> <span className="font-medium">Metro Fitness</span></p>
                      <p className="text-sm text-gray-500">{i * 4} hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </AdminLayout>
  );
};

export default Admin;
