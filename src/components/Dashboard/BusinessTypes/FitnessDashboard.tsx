
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Clock, Users } from "lucide-react";

const FitnessDashboard = () => {
  // Simulated data for fitness appointments
  const appointments = [
    {
      id: "apt-1",
      customer: "Emma Wilson",
      class: "Spin Class",
      instructor: "Mike Taylor",
      date: "2023-05-09",
      time: "18:00",
      status: "confirmed"
    },
    {
      id: "apt-2",
      customer: "James Brown",
      class: "Yoga",
      instructor: "Sarah Johnson",
      date: "2023-05-09",
      time: "19:30",
      status: "confirmed"
    },
    {
      id: "apt-3",
      customer: "Sophia Martinez",
      class: "HIIT Training",
      instructor: "Chris Davis",
      date: "2023-05-10",
      time: "08:00",
      status: "waitlist"
    },
    {
      id: "apt-4",
      customer: "William Garcia",
      class: "Personal Training",
      instructor: "Jennifer Lee",
      date: "2023-05-10",
      time: "14:00",
      status: "confirmed"
    }
  ];

  // Call metrics for fitness studios
  const callMetrics = {
    totalCalls: 67,
    bookingRate: "78%",
    topRequests: ["Class Schedule", "Membership Info", "Personal Training"],
    peakCallTimes: ["8:00 - 10:00", "16:00 - 18:00"]
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Confirmed</Badge>;
      case "waitlist":
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200">Waitlist</Badge>;
      case "canceled":
        return <Badge className="bg-red-100 text-red-700 border-red-200">Canceled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Fitness Studio Dashboard</h2>

      {/* Call Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Call Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border p-3">
              <div className="text-sm font-medium text-muted-foreground mb-1">Total Calls</div>
              <div className="text-2xl font-bold">{callMetrics.totalCalls}</div>
            </div>
            <div className="rounded-lg border p-3">
              <div className="text-sm font-medium text-muted-foreground mb-1">Booking Rate</div>
              <div className="text-2xl font-bold">{callMetrics.bookingRate}</div>
            </div>
            <div className="rounded-lg border p-3 col-span-2">
              <div className="text-sm font-medium text-muted-foreground mb-1">Top Requests</div>
              <div className="flex flex-wrap gap-2 mt-1">
                {callMetrics.topRequests.map((request, index) => (
                  <Badge key={index} variant="secondary">{request}</Badge>
                ))}
              </div>
            </div>
            <div className="rounded-lg border p-3 col-span-2">
              <div className="text-sm font-medium text-muted-foreground mb-1">Peak Call Times</div>
              <div className="flex gap-4">
                {callMetrics.peakCallTimes.map((time, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{time}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg border p-3 col-span-2">
              <Button className="w-full">View Detailed Call Analytics</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointments Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Upcoming Classes & Appointments</CardTitle>
          <Button variant="outline" size="sm">View Calendar</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Class/Service</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.customer}</TableCell>
                  <TableCell>{appointment.class}</TableCell>
                  <TableCell>{appointment.instructor}</TableCell>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost">
                        <Users className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default FitnessDashboard;
