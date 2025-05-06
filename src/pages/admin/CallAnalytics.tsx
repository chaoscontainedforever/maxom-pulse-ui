
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, Tooltip, Legend } from "recharts";

const data = [
  { day: "Mon", calls: 20, answered: 18, missed: 2 },
  { day: "Tue", calls: 30, answered: 25, missed: 5 },
  { day: "Wed", calls: 42, answered: 38, missed: 4 },
  { day: "Thu", calls: 35, answered: 30, missed: 5 },
  { day: "Fri", calls: 45, answered: 40, missed: 5 },
  { day: "Sat", calls: 25, answered: 22, missed: 3 },
  { day: "Sun", calls: 15, answered: 13, missed: 2 },
];

const callsData = [
  { id: 1, time: "10:23 AM", number: "+1 (555) 123-4567", business: "Metro Fitness", duration: "1m 42s", status: "Completed" },
  { id: 2, time: "11:05 AM", number: "+1 (555) 234-5678", business: "Sunset Restaurant", duration: "3m 15s", status: "Completed" },
  { id: 3, time: "11:47 AM", number: "+1 (555) 345-6789", business: "Healing Hands Clinic", duration: "2m 38s", status: "Completed" },
  { id: 4, time: "12:30 PM", number: "+1 (555) 456-7890", business: "Auto Experts", duration: "0m 00s", status: "Missed" },
  { id: 5, time: "1:15 PM", number: "+1 (555) 567-8901", business: "City Plumbing", duration: "4m 22s", status: "Completed" },
  { id: 6, time: "2:03 PM", number: "+1 (555) 678-9012", business: "Metro Fitness", duration: "0m 00s", status: "Missed" },
  { id: 7, time: "2:47 PM", number: "+1 (555) 789-0123", business: "Sunset Restaurant", duration: "1m 55s", status: "Completed" },
];

const config = {
  calls: { label: "Total Calls", color: "#8B5CF6" },
  answered: { label: "Answered", color: "#10B981" },
  missed: { label: "Missed", color: "#EF4444" },
};

const CallAnalytics = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">Call Analytics</h1>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="calls">Calls</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <CardTitle className="text-sm font-medium text-gray-500">Average Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1m 42s</div>
                <p className="text-red-600 text-sm mt-1">-12s from last week</p>
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
          </div>
          
          <Card className="shadow-sm border-0">
            <CardHeader>
              <CardTitle>Call Volume</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer 
                config={config}
                className="w-full h-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} barGap={0} barCategoryGap="20%">
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="day" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <Tooltip content={<ChartTooltipContent />} cursor={false} />
                    <Legend />
                    <Bar dataKey="answered" name="Answered" fill="#10B981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="missed" name="Missed" fill="#EF4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="calls" className="space-y-4">
          <Card className="shadow-sm border-0">
            <CardHeader>
              <CardTitle>Recent Calls</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Number</TableHead>
                    <TableHead>Business</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {callsData.map((call) => (
                    <TableRow key={call.id}>
                      <TableCell>{call.time}</TableCell>
                      <TableCell>{call.number}</TableCell>
                      <TableCell>{call.business}</TableCell>
                      <TableCell>{call.duration}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          call.status === "Completed" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}>
                          {call.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-4">
          <Card className="shadow-sm border-0">
            <CardHeader>
              <CardTitle>Call Volume Trend</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer 
                config={config}
                className="w-full h-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="day" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line type="monotone" dataKey="calls" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CallAnalytics;
