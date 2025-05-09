
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, ClipboardList, Clock, User } from "lucide-react";

const HealthcareDashboard = () => {
  // Simulated data for healthcare appointments
  const appointments = [
    {
      id: "app-1",
      patient: "Alice Johnson",
      doctor: "Dr. Elizabeth Chen",
      type: "Annual Checkup",
      date: "2023-05-09",
      time: "09:00 - 09:30",
      status: "confirmed"
    },
    {
      id: "app-2",
      patient: "Mark Rodriguez",
      doctor: "Dr. James Wilson",
      type: "Follow-up",
      date: "2023-05-09",
      time: "10:15 - 10:45",
      status: "confirmed"
    },
    {
      id: "app-3",
      patient: "Sophia Williams",
      doctor: "Dr. Elizabeth Chen",
      type: "New Patient",
      date: "2023-05-09",
      time: "11:30 - 12:15",
      status: "arrived"
    },
    {
      id: "app-4",
      patient: "Thomas Brown",
      doctor: "Dr. Robert Singh",
      type: "Consultation",
      date: "2023-05-09",
      time: "13:45 - 14:15",
      status: "confirmed"
    },
    {
      id: "app-5",
      patient: "Emma Davis",
      doctor: "Dr. James Wilson",
      type: "Follow-up",
      date: "2023-05-09",
      time: "14:30 - 15:00",
      status: "canceled"
    }
  ];

  // Schedule for the weekly view
  const weekSchedule = [
    {
      day: "Monday",
      slots: [
        { time: "09:00 - 09:30", patient: "Alice Johnson", status: "confirmed" },
        { time: "10:15 - 10:45", patient: "Mark Rodriguez", status: "confirmed" },
        { time: "11:30 - 12:15", patient: "Sophia Williams", status: "arrived" }
      ]
    },
    {
      day: "Tuesday",
      slots: [
        { time: "09:00 - 09:30", patient: "Oliver Wilson", status: "confirmed" },
        { time: "10:15 - 10:45", patient: "Emma Miller", status: "confirmed" },
        { time: "14:30 - 15:00", patient: "Noah Davis", status: "confirmed" }
      ]
    },
    {
      day: "Wednesday",
      slots: [
        { time: "09:00 - 09:30", patient: "Ava Brown", status: "confirmed" },
        { time: "13:45 - 14:15", patient: "William Taylor", status: "confirmed" }
      ]
    },
    {
      day: "Thursday",
      slots: [
        { time: "09:00 - 09:30", patient: "Sophia Garcia", status: "confirmed" },
        { time: "10:15 - 10:45", patient: "James Martinez", status: "confirmed" },
        { time: "11:30 - 12:15", patient: "Isabella Johnson", status: "confirmed" }
      ]
    },
    {
      day: "Friday",
      slots: [
        { time: "09:00 - 09:30", patient: "Benjamin Anderson", status: "confirmed" },
        { time: "10:15 - 10:45", patient: "Mia Thomas", status: "confirmed" }
      ]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Confirmed</Badge>;
      case "arrived":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Arrived</Badge>;
      case "completed":
        return <Badge className="bg-indigo-100 text-indigo-700 border-indigo-200">Completed</Badge>;
      case "canceled":
        return <Badge className="bg-red-100 text-red-700 border-red-200">Canceled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Healthcare Dashboard</h2>

      {/* Today's Appointments */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Today's Appointments</CardTitle>
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            New Appointment
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.patient}</TableCell>
                  <TableCell>{appointment.doctor}</TableCell>
                  <TableCell>{appointment.type}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost">
                        <User className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <ClipboardList className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Weekly Calendar View */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4">
            {weekSchedule.map((day, index) => (
              <div key={index} className="border rounded-lg">
                <div className="bg-muted/30 p-2 text-center font-medium border-b">
                  {day.day}
                </div>
                <div className="p-2">
                  {day.slots.map((slot, slotIndex) => (
                    <div key={slotIndex} className="mb-2 p-2 border rounded-md text-xs bg-background">
                      <div className="font-medium">{slot.time}</div>
                      <div className="text-sm truncate">{slot.patient}</div>
                      <div className="mt-1">{getStatusBadge(slot.status)}</div>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" className="w-full mt-2">
                    <Clock className="mr-1 h-3 w-3" /> Add
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Patient Record Viewer */}
      <Card>
        <CardHeader>
          <CardTitle>Patient Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="border rounded-md p-4 w-1/3">
              <div className="font-medium mb-2">Search Patients</div>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search by name or ID..." 
                  className="w-full p-2 border rounded-md" 
                />
                <Button className="absolute right-1 top-1" size="sm">
                  Search
                </Button>
              </div>
              <div className="mt-4 space-y-2">
                <div className="p-2 border rounded-md cursor-pointer hover:bg-muted/50 bg-muted/20">
                  <div className="font-medium">Alice Johnson</div>
                  <div className="text-xs text-muted-foreground">Patient ID: P-12345</div>
                </div>
                <div className="p-2 border rounded-md cursor-pointer hover:bg-muted/50">
                  <div className="font-medium">Mark Rodriguez</div>
                  <div className="text-xs text-muted-foreground">Patient ID: P-12346</div>
                </div>
                <div className="p-2 border rounded-md cursor-pointer hover:bg-muted/50">
                  <div className="font-medium">Sophia Williams</div>
                  <div className="text-xs text-muted-foreground">Patient ID: P-12347</div>
                </div>
              </div>
            </div>
            
            <div className="border rounded-md p-4 flex-1">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-bold">Alice Johnson</h3>
                  <div className="text-sm text-muted-foreground">DOB: 05/12/1985 • ID: P-12345</div>
                </div>
                <Button>Update Record</Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 border rounded-md">
                  <div className="font-medium mb-1">Contact Information</div>
                  <div className="text-sm">Phone: (555) 123-4567</div>
                  <div className="text-sm">Email: alice.johnson@example.com</div>
                  <div className="text-sm">Address: 123 Main St, Anytown USA</div>
                </div>
                <div className="p-3 border rounded-md">
                  <div className="font-medium mb-1">Insurance</div>
                  <div className="text-sm">Provider: HealthPlus</div>
                  <div className="text-sm">Policy #: HP-987654</div>
                  <div className="text-sm">Group #: 12345</div>
                </div>
              </div>
              
              <div className="border rounded-md p-3 mb-4">
                <div className="font-medium mb-1">Medical History</div>
                <div className="text-sm">• Hypertension (diagnosed 2018)</div>
                <div className="text-sm">• Asthma (childhood)</div>
                <div className="text-sm">• Appendectomy (2010)</div>
              </div>
              
              <div className="border rounded-md p-3">
                <div className="font-medium mb-1">Recent Visits</div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-1">Date</th>
                      <th className="text-left py-1">Provider</th>
                      <th className="text-left py-1">Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-1">04/12/2023</td>
                      <td className="py-1">Dr. Elizabeth Chen</td>
                      <td className="py-1">Annual Checkup</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-1">02/03/2023</td>
                      <td className="py-1">Dr. Robert Singh</td>
                      <td className="py-1">Flu Symptoms</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthcareDashboard;
