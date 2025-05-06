
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "lucide-react";

const reservations = [
  {
    id: "RES-001345",
    name: "Emily Johnson",
    restaurant: "Sunset Restaurant",
    date: "May 6, 2024",
    time: "7:30 PM",
    guests: 4,
    status: "Confirmed",
    phone: "+1 (555) 123-4567",
    notes: "Window seating requested"
  },
  {
    id: "RES-001344",
    name: "Michael Chen",
    restaurant: "Sunset Restaurant",
    date: "May 6, 2024",
    time: "8:00 PM",
    guests: 2,
    status: "Confirmed",
    phone: "+1 (555) 234-5678",
    notes: "Anniversary dinner"
  },
  {
    id: "RES-001343",
    name: "Sarah Williams",
    restaurant: "Sunset Restaurant",
    date: "May 6, 2024",
    time: "6:45 PM",
    guests: 6,
    status: "Pending",
    phone: "+1 (555) 345-6789",
    notes: "Allergy: Shellfish"
  },
  {
    id: "RES-001342",
    name: "James Rodriguez",
    restaurant: "Sunset Restaurant",
    date: "May 6, 2024",
    time: "7:00 PM",
    guests: 3,
    status: "Confirmed",
    phone: "+1 (555) 456-7890",
    notes: ""
  },
  {
    id: "RES-001341",
    name: "Leila Hassan",
    restaurant: "Sunset Restaurant",
    date: "May 7, 2024",
    time: "6:30 PM",
    guests: 2,
    status: "Confirmed",
    phone: "+1 (555) 567-8901",
    notes: "Vegan options needed"
  },
  {
    id: "RES-001340",
    name: "David Wilson",
    restaurant: "Fast Pizza",
    date: "May 7, 2024",
    time: "7:15 PM",
    guests: 4,
    status: "Cancelled",
    phone: "+1 (555) 678-9012",
    notes: ""
  },
  {
    id: "RES-001339",
    name: "Jennifer Lee",
    restaurant: "Fast Pizza",
    date: "May 7, 2024",
    time: "8:30 PM",
    guests: 5,
    status: "Confirmed",
    phone: "+1 (555) 789-0123",
    notes: "High chair needed"
  },
];

const Reservations = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">Reservations</h1>
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          New Reservation
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="flex-1">
          <Label htmlFor="search" className="sr-only">Search</Label>
          <Input id="search" placeholder="Search by name, restaurant, or reservation ID..." />
        </div>
        <Button variant="outline">Filter</Button>
        <Button variant="outline">Export</Button>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-4">
          <Card className="shadow-sm border-0">
            <CardHeader>
              <CardTitle>Upcoming Reservations</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Restaurant</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Guests</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservations.filter(r => r.status !== "Cancelled").map((reservation) => (
                    <TableRow key={reservation.id}>
                      <TableCell className="font-medium">{reservation.id}</TableCell>
                      <TableCell>
                        {reservation.name}
                        <div className="text-xs text-muted-foreground">{reservation.phone}</div>
                      </TableCell>
                      <TableCell>{reservation.restaurant}</TableCell>
                      <TableCell>{reservation.date}</TableCell>
                      <TableCell>{reservation.time}</TableCell>
                      <TableCell>{reservation.guests}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          reservation.status === "Confirmed" ? "bg-green-100 text-green-700" : 
                          reservation.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                          "bg-red-100 text-red-700"
                        }`}>
                          {reservation.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="today" className="space-y-4">
          <Card className="shadow-sm border-0">
            <CardHeader>
              <CardTitle>Today's Reservations</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Restaurant</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Guests</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservations
                    .filter(r => r.date === "May 6, 2024")
                    .map((reservation) => (
                      <TableRow key={reservation.id}>
                        <TableCell className="font-medium">{reservation.id}</TableCell>
                        <TableCell>
                          {reservation.name}
                          <div className="text-xs text-muted-foreground">{reservation.phone}</div>
                        </TableCell>
                        <TableCell>{reservation.restaurant}</TableCell>
                        <TableCell>{reservation.time}</TableCell>
                        <TableCell>{reservation.guests}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            reservation.status === "Confirmed" ? "bg-green-100 text-green-700" : 
                            reservation.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                            "bg-red-100 text-red-700"
                          }`}>
                            {reservation.status}
                          </span>
                        </TableCell>
                        <TableCell>{reservation.notes || "-"}</TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm">View</Button>
                            <Button variant="ghost" size="sm">Edit</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {/* Similar to "upcoming" tab but with past reservations */}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          {/* Similar to "upcoming" tab but with cancelled reservations */}
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-sm border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Today's Reservations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">18</div>
            <p className="text-green-600 text-sm mt-1">+3 from yesterday</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Average Party Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3.5</div>
            <p className="text-gray-500 text-sm mt-1">No change from last week</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Confirmation Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">92.3%</div>
            <p className="text-green-600 text-sm mt-1">+1.5% from last week</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reservations;
