
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Tooltip, Legend } from "recharts";

const hourlyData = [
  { time: "8 AM", calls: 12 },
  { time: "9 AM", calls: 19 },
  { time: "10 AM", calls: 28 },
  { time: "11 AM", calls: 32 },
  { time: "12 PM", calls: 25 },
  { time: "1 PM", calls: 22 },
  { time: "2 PM", calls: 28 },
  { time: "3 PM", calls: 30 },
  { time: "4 PM", calls: 24 },
  { time: "5 PM", calls: 18 },
  { time: "6 PM", calls: 12 },
];

const businessTypes = [
  { name: "Restaurants", value: 35 },
  { name: "Healthcare", value: 25 },
  { name: "Fitness", value: 15 },
  { name: "Auto", value: 15 },
  { name: "Home Services", value: 10 },
];

const COLORS = ["#8B5CF6", "#EC4899", "#3B82F6", "#10B981", "#F59E0B"];

const weeklyData = [
  { week: "Week 1", calls: 120 },
  { week: "Week 2", calls: 145 },
  { week: "Week 3", calls: 132 },
  { week: "Week 4", calls: 165 },
];

const config = {
  calls: { label: "Calls", color: "#8B5CF6" },
};

const Reports = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">Reports</h1>
        <div className="flex items-center gap-4">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="start-date">Start Date</Label>
              <Input id="start-date" type="date" className="h-9" />
            </div>
            <div>
              <Label htmlFor="end-date">End Date</Label>
              <Input id="end-date" type="date" className="h-9" />
            </div>
          </div>
          <Button>Generate Report</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="shadow-sm border-0">
          <CardHeader>
            <CardTitle>Hourly Call Volume</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ChartContainer config={config} className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyData} barGap={0} barCategoryGap="30%">
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="time" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip content={<ChartTooltipContent />} cursor={false} />
                  <Bar dataKey="calls" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0">
          <CardHeader>
            <CardTitle>Business Types</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ChartContainer config={config} className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={businessTypes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {businessTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value} calls`} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm border-0">
        <CardHeader>
          <CardTitle>Weekly Performance</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ChartContainer config={config} className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="week" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="calls" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-sm border-0">
          <CardHeader>
            <CardTitle>Top Performing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm font-medium text-gray-500">Business</div>
              <div className="font-semibold">Sunset Restaurant</div>
              <div className="flex items-center justify-between mt-2">
                <div className="text-sm">245 Calls</div>
                <div className="text-sm text-green-600">98% Success</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1.5">
                <div className="bg-green-600 h-1.5 rounded-full" style={{ width: "98%" }}></div>
              </div>
            </div>

            <div>
              <div className="text-sm font-medium text-gray-500">Business</div>
              <div className="font-semibold">Metro Fitness</div>
              <div className="flex items-center justify-between mt-2">
                <div className="text-sm">198 Calls</div>
                <div className="text-sm text-green-600">95% Success</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1.5">
                <div className="bg-green-600 h-1.5 rounded-full" style={{ width: "95%" }}></div>
              </div>
            </div>

            <div>
              <div className="text-sm font-medium text-gray-500">Business</div>
              <div className="font-semibold">Healing Hands Clinic</div>
              <div className="flex items-center justify-between mt-2">
                <div className="text-sm">176 Calls</div>
                <div className="text-sm text-green-600">94% Success</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1.5">
                <div className="bg-green-600 h-1.5 rounded-full" style={{ width: "94%" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0">
          <CardHeader>
            <CardTitle>Needs Attention</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm font-medium text-gray-500">Business</div>
              <div className="font-semibold">City Plumbing</div>
              <div className="flex items-center justify-between mt-2">
                <div className="text-sm">87 Calls</div>
                <div className="text-sm text-red-600">76% Success</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1.5">
                <div className="bg-red-600 h-1.5 rounded-full" style={{ width: "76%" }}></div>
              </div>
            </div>

            <div>
              <div className="text-sm font-medium text-gray-500">Business</div>
              <div className="font-semibold">Auto Experts</div>
              <div className="flex items-center justify-between mt-2">
                <div className="text-sm">112 Calls</div>
                <div className="text-sm text-red-600">80% Success</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1.5">
                <div className="bg-red-600 h-1.5 rounded-full" style={{ width: "80%" }}></div>
              </div>
            </div>

            <div>
              <div className="text-sm font-medium text-gray-500">Business</div>
              <div className="font-semibold">Fast Pizza</div>
              <div className="flex items-center justify-between mt-2">
                <div className="text-sm">95 Calls</div>
                <div className="text-sm text-red-600">82% Success</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1.5">
                <div className="bg-red-600 h-1.5 rounded-full" style={{ width: "82%" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0">
          <CardHeader>
            <CardTitle>Call Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium text-gray-500">Average Call Duration</div>
                <div className="text-2xl font-bold">1m 42s</div>
              </div>
              
              <div>
                <div className="text-sm font-medium text-gray-500">Peak Hour</div>
                <div className="text-2xl font-bold">11:00 AM</div>
              </div>
              
              <div>
                <div className="text-sm font-medium text-gray-500">Most Common Inquiry</div>
                <div className="text-2xl font-bold">Reservations</div>
              </div>
              
              <div>
                <div className="text-sm font-medium text-gray-500">Success Rate</div>
                <div className="text-2xl font-bold">94.2%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
