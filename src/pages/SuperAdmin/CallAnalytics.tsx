
import { useState } from "react";
import SuperAdminLayout from "@/components/SuperAdmin/SuperAdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Phone, 
  BarChart2, 
  Download, 
  Calendar, 
  Play, 
  FileText,
  Filter 
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
  
// Mock data for charts
const callVolumeData = [
  { name: "May 1", calls: 145 },
  { name: "May 2", calls: 132 },
  { name: "May 3", calls: 164 },
  { name: "May 4", calls: 187 },
  { name: "May 5", calls: 212 },
  { name: "May 6", calls: 143 },
  { name: "May 7", calls: 118 },
  { name: "May 8", calls: 138 },
  { name: "May 9", calls: 159 },
];

const callIntentData = [
  { name: "Appointment Booking", value: 35 },
  { name: "Product Inquiry", value: 25 },
  { name: "Support", value: 20 },
  { name: "Order Status", value: 15 },
  { name: "Other", value: 5 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

// Mock data for recent calls
const recentCallsData = [
  { 
    id: 1, 
    customer: "Acme Inc", 
    phoneNumber: "(555) 123-4567", 
    duration: "3:45", 
    timestamp: "2023-05-09T14:35:00",
    intent: "Appointment Booking",
    status: "completed",
    caller: "John Smith"
  },
  { 
    id: 2, 
    customer: "TechCorp", 
    phoneNumber: "(555) 234-5678", 
    duration: "5:12", 
    timestamp: "2023-05-09T13:22:00",
    intent: "Product Inquiry",
    status: "completed",
    caller: "Lisa Johnson"
  },
  { 
    id: 3, 
    customer: "Global Services", 
    phoneNumber: "(555) 345-6789", 
    duration: "2:18", 
    timestamp: "2023-05-09T11:47:00",
    intent: "Support",
    status: "completed",
    caller: "Robert Brown"
  },
  { 
    id: 4, 
    customer: "Local Shop", 
    phoneNumber: "(555) 456-7890", 
    duration: "4:03", 
    timestamp: "2023-05-09T10:15:00",
    intent: "Order Status",
    status: "completed",
    caller: "Emma Wilson"
  },
  { 
    id: 5, 
    customer: "Medical Center", 
    phoneNumber: "(555) 567-8901", 
    duration: "1:52", 
    timestamp: "2023-05-08T16:30:00",
    intent: "Appointment Booking",
    status: "completed",
    caller: "Michael Garcia"
  },
];

const SuperAdminCallAnalytics = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState("week");
  const [statusFilter, setStatusFilter] = useState("");
  
  // Filter calls based on search
  const filteredCalls = recentCallsData.filter(call => {
    return (
      call.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.caller.toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.phoneNumber.includes(searchTerm) ||
      call.intent.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <SuperAdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Call Analytics</h1>
          <p className="text-muted-foreground">
            Analyze call data across all customers
          </p>
        </div>
        
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="bg-transparent border border-border p-1">
            <TabsTrigger 
              value="dashboard" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <BarChart2 className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="calls"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Phone className="h-4 w-4 mr-2" />
              Call Records
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Calls Today</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">247</div>
                  <p className="text-green-600 text-sm mt-1">+12% from yesterday</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Average Call Duration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">3:24</div>
                  <p className="text-green-600 text-sm mt-1">-0:14 from average</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Customer Satisfaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">96%</div>
                  <p className="text-green-600 text-sm mt-1">+2% this month</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Call Volume</CardTitle>
                    <Select value={dateRange} onValueChange={setDateRange}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="day">Today</SelectItem>
                        <SelectItem value="week">This Week</SelectItem>
                        <SelectItem value="month">This Month</SelectItem>
                        <SelectItem value="year">This Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={callVolumeData}>
                        <defs>
                          <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="calls"
                          stroke="#8884d8"
                          fillOpacity={1}
                          fill="url(#colorCalls)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Call Intent Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={callIntentData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {callIntentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="calls">
            <Card>
              <CardHeader>
                <CardTitle>All Call Records</CardTitle>
                <CardDescription>
                  View and analyze all customer call records
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-grow">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search customer, caller, intent..."
                      className="pl-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="outline" className="gap-2">
                      <Calendar className="h-4 w-4" />
                      Date Range
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Filter className="h-4 w-4" />
                      Filters
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Download className="h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Caller</TableHead>
                      <TableHead>Phone Number</TableHead>
                      <TableHead>Intent</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  
                  <TableBody>
                    {filteredCalls.map((call) => (
                      <TableRow key={call.id}>
                        <TableCell className="font-medium">{call.customer}</TableCell>
                        <TableCell>{call.caller}</TableCell>
                        <TableCell>{call.phoneNumber}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
                            {call.intent}
                          </Badge>
                        </TableCell>
                        <TableCell>{call.duration}</TableCell>
                        <TableCell>{formatDate(call.timestamp)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" title="Play recording">
                              <Play className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" title="View transcript">
                              <FileText className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {filteredCalls.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No call records found matching your search.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SuperAdminLayout>
  );
};

export default SuperAdminCallAnalytics;
