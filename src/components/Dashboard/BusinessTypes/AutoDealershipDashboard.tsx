
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Car, Clock, Settings, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AutoDealershipDashboard = () => {
  // Simulated data for auto dealership
  const testDrives = [
    {
      id: "td-1",
      customer: "David Anderson",
      vehicle: "2023 Model X SUV",
      date: "2023-05-09",
      time: "14:30",
      status: "scheduled",
      salesRep: "Rachel Kim"
    },
    {
      id: "td-2",
      customer: "Lisa Martinez",
      vehicle: "2023 Sedan Y",
      date: "2023-05-10",
      time: "10:00",
      status: "scheduled",
      salesRep: "Tom Wilson"
    },
    {
      id: "td-3",
      customer: "Robert Taylor",
      vehicle: "2023 Electric Z",
      date: "2023-05-10",
      time: "15:45",
      status: "requested",
      salesRep: "Unassigned"
    }
  ];

  const serviceAppointments = [
    {
      id: "sa-1",
      customer: "Emily Johnson",
      vehicle: "2021 SUV X",
      service: "Oil Change + Tire Rotation",
      date: "2023-05-09",
      time: "09:00",
      status: "in-progress"
    },
    {
      id: "sa-2",
      customer: "Michael Brown",
      vehicle: "2022 Electric Z",
      service: "Annual Maintenance",
      date: "2023-05-09",
      time: "11:30",
      status: "completed"
    },
    {
      id: "sa-3",
      customer: "Sarah Wilson",
      vehicle: "2020 Sedan Y",
      service: "Brake Inspection",
      date: "2023-05-10",
      time: "08:15",
      status: "scheduled"
    }
  ];

  const getTestDriveStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Scheduled</Badge>;
      case "requested":
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200">Requested</Badge>;
      case "completed":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Completed</Badge>;
      case "canceled":
        return <Badge className="bg-red-100 text-red-700 border-red-200">Canceled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getServiceStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-indigo-100 text-indigo-700 border-indigo-200">Scheduled</Badge>;
      case "in-progress":
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200">In Progress</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Completed</Badge>;
      case "delayed":
        return <Badge className="bg-red-100 text-red-700 border-red-200">Delayed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Auto Dealership Dashboard</h2>

      {/* Calendar Sync Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Calendar Integration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 border rounded-md">
              <h3 className="text-lg font-medium mb-2">Connected Systems</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Google Calendar</span>
                  </div>
                  <Badge variant="outline" className="bg-green-100 text-green-700">Connected</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    <span>DMS Integration</span>
                  </div>
                  <Badge variant="outline" className="bg-green-100 text-green-700">Connected</Badge>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 justify-center">
              <Button className="w-full">
                <Calendar className="mr-2 h-4 w-4" />
                Sync Calendar
              </Button>
              <Button variant="outline" className="w-full">
                Configure Integration Settings
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Drives and Service Appointments */}
      <Tabs defaultValue="testDrives">
        <TabsList>
          <TabsTrigger value="testDrives">Test Drives</TabsTrigger>
          <TabsTrigger value="service">Service Appointments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="testDrives" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Test Drive Reservations</CardTitle>
              <Button variant="outline" size="sm">
                <Clock className="mr-2 h-4 w-4" />
                New Test Drive
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Sales Rep</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testDrives.map((testDrive) => (
                    <TableRow key={testDrive.id}>
                      <TableCell>{testDrive.customer}</TableCell>
                      <TableCell>{testDrive.vehicle}</TableCell>
                      <TableCell>{testDrive.date}</TableCell>
                      <TableCell>{testDrive.time}</TableCell>
                      <TableCell>{testDrive.salesRep}</TableCell>
                      <TableCell>{getTestDriveStatusBadge(testDrive.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="ghost">
                            <User className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Car className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="service" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Service Appointments</CardTitle>
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                New Service Request
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {serviceAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>{appointment.customer}</TableCell>
                      <TableCell>{appointment.vehicle}</TableCell>
                      <TableCell>{appointment.service}</TableCell>
                      <TableCell>{appointment.date}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>{getServiceStatusBadge(appointment.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm">Update Status</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AutoDealershipDashboard;
