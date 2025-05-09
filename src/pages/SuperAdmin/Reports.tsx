
import { useState } from "react";
import SuperAdminLayout from "@/components/SuperAdmin/SuperAdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  BarChart3, 
  FileText, 
  Download, 
  Calendar, 
  Filter,
  Users,
  Phone,
  CreditCard,
  TrendingUp,
  Plus
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Mock data for customer growth
const customerGrowthData = [
  { month: 'Jan', customers: 120 },
  { month: 'Feb', customers: 135 },
  { month: 'Mar', customers: 155 },
  { month: 'Apr', customers: 190 },
  { month: 'May', customers: 247 }
];

// Mock data for call volume by business type
const callVolumeByBusinessData = [
  { name: 'Healthcare', value: 35 },
  { name: 'Restaurant', value: 25 },
  { name: 'Auto Dealer', value: 15 },
  { name: 'Fitness', value: 12 },
  { name: 'Home Services', value: 8 },
  { name: 'Other', value: 5 }
];

// Mock data for revenue
const revenueData = [
  { month: 'Jan', revenue: 52000 },
  { month: 'Feb', revenue: 58000 },
  { month: 'Mar', revenue: 65000 },
  { month: 'Apr', revenue: 72000 },
  { month: 'May', revenue: 84000 }
];

// Mock data for report types
const reportTypes = [
  { id: 1, name: "Customer Growth", description: "New and active customers over time", icon: Users },
  { id: 2, name: "Voice Usage", description: "Call volume and duration analytics", icon: Phone },
  { id: 3, name: "Revenue Report", description: "Billing and revenue metrics", icon: CreditCard },
  { id: 4, name: "Performance Metrics", description: "System performance and availability", icon: TrendingUp },
];

// Colors for charts
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

const SuperAdminReports = () => {
  const [reportPeriod, setReportPeriod] = useState("month");
  
  return (
    <SuperAdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-muted-foreground">
            Analytics and business intelligence reports
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Last 30 Days
            </Button>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
          
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button variant="outline" className="gap-2">
              <FileText className="h-4 w-4" />
              Generate Report
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export Data
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="bg-transparent border border-border p-1">
            <TabsTrigger 
              value="dashboard" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="reports"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <FileText className="h-4 w-4 mr-2" />
              Reports Library
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Customers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">247</div>
                  <p className="text-green-600 text-sm mt-1">+30% YTD</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Monthly Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">$84,000</div>
                  <p className="text-green-600 text-sm mt-1">+16.7% from April</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Voice Minutes Used</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">218,432</div>
                  <p className="text-green-600 text-sm mt-1">+22% from April</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Growth</CardTitle>
                  <CardDescription>New customer acquisitions over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={customerGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="customers" fill="#8884d8" name="Total Customers" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Revenue</CardTitle>
                  <CardDescription>Revenue trends over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => `$${value}`} />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="revenue" 
                          stroke="#82ca9d" 
                          name="Revenue ($)" 
                          strokeWidth={2} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Call Volume by Business Type</CardTitle>
                <CardDescription>Distribution of voice minutes across business categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={callVolumeByBusinessData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {callVolumeByBusinessData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reportTypes.map(report => (
                <Card key={report.id}>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-full bg-primary/10">
                        <report.icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle>{report.name}</CardTitle>
                    </div>
                    <CardDescription>{report.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Report Period</div>
                        <select className="text-sm py-1 px-2 border rounded-md">
                          <option value="day">Today</option>
                          <option value="week">This Week</option>
                          <option value="month" selected>This Month</option>
                          <option value="quarter">This Quarter</option>
                          <option value="year">This Year</option>
                          <option value="custom">Custom Range</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Format</div>
                        <div className="flex gap-2">
                          <button className="text-xs py-1 px-2 border rounded-md bg-primary/10">PDF</button>
                          <button className="text-xs py-1 px-2 border rounded-md">Excel</button>
                          <button className="text-xs py-1 px-2 border rounded-md">CSV</button>
                        </div>
                      </div>
                      
                      <div className="pt-2 flex justify-end">
                        <Button className="gap-2">
                          <FileText className="h-4 w-4" />
                          Generate Report
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Scheduled Reports</CardTitle>
                <CardDescription>
                  Automatically generated reports on a schedule
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Report Name</th>
                        <th className="text-left py-3 px-4">Frequency</th>
                        <th className="text-left py-3 px-4">Recipients</th>
                        <th className="text-left py-3 px-4">Last Run</th>
                        <th className="text-right py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">Weekly Customer Report</td>
                        <td className="py-3 px-4">Every Monday at 8:00 AM</td>
                        <td className="py-3 px-4">3 recipients</td>
                        <td className="py-3 px-4">May 6, 2023</td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">Monthly Revenue Summary</td>
                        <td className="py-3 px-4">1st of month at 6:00 AM</td>
                        <td className="py-3 px-4">5 recipients</td>
                        <td className="py-3 px-4">May 1, 2023</td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium">Daily System Health</td>
                        <td className="py-3 px-4">Daily at 12:00 AM</td>
                        <td className="py-3 px-4">2 recipients</td>
                        <td className="py-3 px-4">May 9, 2023</td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Schedule New Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SuperAdminLayout>
  );
};

export default SuperAdminReports;
