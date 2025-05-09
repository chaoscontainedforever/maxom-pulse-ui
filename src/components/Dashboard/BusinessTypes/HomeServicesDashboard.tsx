
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Clock, Home, MapPin, Tool, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HomeServicesDashboard = () => {
  // Simulated data for home services
  const jobs = [
    {
      id: "job-1",
      customer: "Jennifer Smith",
      service: "Plumbing Repair",
      address: "123 Maple Street, Anytown",
      date: "2023-05-09",
      timeWindow: "09:00 - 12:00",
      technician: "Mike Johnson",
      status: "scheduled"
    },
    {
      id: "job-2",
      customer: "Robert Davis",
      service: "Electrical Inspection",
      address: "456 Oak Avenue, Anytown",
      date: "2023-05-09",
      timeWindow: "13:00 - 16:00",
      technician: "Sam Wilson",
      status: "in-progress"
    },
    {
      id: "job-3",
      customer: "Maria Garcia",
      service: "HVAC Maintenance",
      address: "789 Pine Boulevard, Anytown",
      date: "2023-05-10",
      timeWindow: "09:00 - 12:00",
      technician: "David Miller",
      status: "scheduled"
    },
    {
      id: "job-4",
      customer: "Thomas Robinson",
      service: "Appliance Repair",
      address: "101 Cedar Lane, Anytown",
      date: "2023-05-10",
      timeWindow: "13:00 - 16:00",
      technician: "Lisa Chen",
      status: "scheduled"
    }
  ];

  // Business details for the form
  const businessDetails = {
    name: "Swift Home Services",
    address: "1234 Service Road, Anytown, USA",
    phone: "(555) 987-6543",
    email: "contact@swifthomeservices.com",
    website: "www.swifthomeservices.com",
    services: ["Plumbing", "Electrical", "HVAC", "Appliance Repair", "General Contracting"],
    operatingHours: {
      weekdays: "8:00 AM - 6:00 PM",
      saturday: "9:00 AM - 4:00 PM",
      sunday: "Closed"
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Scheduled</Badge>;
      case "in-progress":
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200">In Progress</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Completed</Badge>;
      case "canceled":
        return <Badge className="bg-red-100 text-red-700 border-red-200">Canceled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Home Services Dashboard</h2>

      {/* Job Booking Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Upcoming Jobs</CardTitle>
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule New Job
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time Window</TableHead>
                <TableHead>Technician</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{job.customer}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {job.address}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{job.service}</TableCell>
                  <TableCell>{job.date}</TableCell>
                  <TableCell>{job.timeWindow}</TableCell>
                  <TableCell>{job.technician}</TableCell>
                  <TableCell>{getStatusBadge(job.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost">
                        <User className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Tool className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Business Information and Calendar Sync */}
      <Tabs defaultValue="business">
        <TabsList>
          <TabsTrigger value="business">Business Details</TabsTrigger>
          <TabsTrigger value="calendar">Calendar Sync</TabsTrigger>
        </TabsList>
        
        <TabsContent value="business" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Business Name</label>
                    <input 
                      type="text" 
                      value={businessDetails.name} 
                      className="w-full p-2 border rounded-md" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <input 
                      type="text" 
                      value={businessDetails.phone} 
                      className="w-full p-2 border rounded-md" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Address</label>
                  <input 
                    type="text" 
                    value={businessDetails.address} 
                    className="w-full p-2 border rounded-md" 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <input 
                      type="email" 
                      value={businessDetails.email} 
                      className="w-full p-2 border rounded-md" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Website</label>
                    <input 
                      type="text" 
                      value={businessDetails.website} 
                      className="w-full p-2 border rounded-md" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Services Offered</label>
                  <div className="flex flex-wrap gap-2">
                    {businessDetails.services.map((service, index) => (
                      <div key={index} className="flex items-center gap-1 p-1 pl-2 pr-2 rounded-md bg-muted">
                        {service}
                        <button className="ml-1 text-sm">×</button>
                      </div>
                    ))}
                    <button className="p-1 pl-2 pr-2 border rounded-md text-sm">+ Add Service</button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Operating Hours</label>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-2 border rounded-md">
                      <div className="font-medium text-xs">Weekdays</div>
                      <div className="text-sm">{businessDetails.operatingHours.weekdays}</div>
                    </div>
                    <div className="p-2 border rounded-md">
                      <div className="font-medium text-xs">Saturday</div>
                      <div className="text-sm">{businessDetails.operatingHours.saturday}</div>
                    </div>
                    <div className="p-2 border rounded-md">
                      <div className="font-medium text-xs">Sunday</div>
                      <div className="text-sm">{businessDetails.operatingHours.sunday}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="calendar" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Calendar Synchronization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        <div className="font-medium">Google Calendar</div>
                      </div>
                      <Badge variant="outline" className="bg-green-100 text-green-700">Connected</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Your Google Calendar is currently synced with your job bookings.
                    </p>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm">Disconnect</Button>
                      <Button size="sm">Sync Now</Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        <div className="font-medium">Outlook Calendar</div>
                      </div>
                      <Badge variant="outline" className="bg-muted">Not Connected</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Connect your Outlook Calendar to sync job bookings.
                    </p>
                    <div className="mt-4">
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <Home className="h-5 w-5" />
                        <div className="font-medium">Field Service Software</div>
                      </div>
                      <Badge variant="outline" className="bg-blue-100 text-blue-700">Pending</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Your integration with field service software is pending approval.
                    </p>
                    <div className="mt-4">
                      <Button variant="outline" size="sm">Check Status</Button>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-4">Calendar Preview</h3>
                  <div className="bg-muted h-[300px] rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <Calendar className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Calendar preview will appear here once configured
                      </p>
                      <Button className="mt-4">Configure View</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 border-t pt-4">
                <h3 className="font-medium mb-4">Sync Settings</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Auto-Sync Frequency</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Every 15 minutes</option>
                      <option>Every 30 minutes</option>
                      <option>Every hour</option>
                      <option>Every 2 hours</option>
                      <option>Manually only</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Calendar View Mode</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Day view</option>
                      <option>Week view</option>
                      <option>Month view</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Settings</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HomeServicesDashboard;
