
import BusinessAdminLayout from "@/components/BusinessAdmin/BusinessAdminLayout";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, PhoneCall, Clock, Download, Search } from "lucide-react";

// Mock data for call logs
const mockCallLogs = [
  {
    id: "1",
    callerName: "John Smith",
    callerNumber: "(555) 123-4567",
    date: "2025-05-08",
    time: "10:24 AM",
    duration: "2:45",
    purpose: "Appointment scheduling",
    result: "Appointment booked",
    recording: true,
  },
  {
    id: "2",
    callerName: "Sarah Johnson",
    callerNumber: "(555) 987-6543",
    date: "2025-05-08",
    time: "09:15 AM",
    duration: "1:30",
    purpose: "General inquiry",
    result: "Information provided",
    recording: true,
  },
  {
    id: "3",
    callerName: "Michael Davis",
    callerNumber: "(555) 456-7890",
    date: "2025-05-07",
    time: "04:45 PM",
    duration: "3:10",
    purpose: "Price inquiry",
    result: "Quote provided",
    recording: true,
  },
  {
    id: "4",
    callerName: "Emily Wilson",
    callerNumber: "(555) 234-5678",
    date: "2025-05-07",
    time: "02:30 PM",
    duration: "4:15",
    purpose: "Complaint",
    result: "Issue resolved",
    recording: true,
  },
  {
    id: "5",
    callerName: "Robert Taylor",
    callerNumber: "(555) 345-6789",
    date: "2025-05-06",
    time: "11:50 AM",
    duration: "2:20",
    purpose: "Follow-up",
    result: "Information provided",
    recording: true,
  },
  {
    id: "6",
    callerName: "Jessica Brown",
    callerNumber: "(555) 567-8901",
    date: "2025-05-06",
    time: "10:15 AM",
    duration: "1:45",
    purpose: "Appointment scheduling",
    result: "Appointment booked",
    recording: true,
  },
];

const CallLogs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Filter call logs based on search query and filter type
  const filteredLogs = mockCallLogs.filter((log) => {
    const matchesSearch =
      log.callerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.callerNumber.includes(searchQuery) ||
      log.purpose.toLowerCase().includes(searchQuery.toLowerCase());

    if (filterType === "all") return matchesSearch;
    return matchesSearch && log.purpose.toLowerCase().includes(filterType.toLowerCase());
  });

  return (
    <BusinessAdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Call Logs</h2>
          <p className="text-muted-foreground">
            View and analyze your customer call history
          </p>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Call History</CardTitle>
            <CardDescription>
              Review all customer interactions handled by your AI assistant
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
              <div className="flex flex-1 gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, number, or purpose..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select
                  value={filterType}
                  onValueChange={setFilterType}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All calls</SelectItem>
                    <SelectItem value="appointment">Appointments</SelectItem>
                    <SelectItem value="inquiry">Inquiries</SelectItem>
                    <SelectItem value="complaint">Complaints</SelectItem>
                    <SelectItem value="follow">Follow-ups</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="gap-2">
                <Download className="h-4 w-4" />
                Export Data
              </Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Caller</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        <div className="font-medium">{log.callerName}</div>
                        <div className="text-sm text-muted-foreground">{log.callerNumber}</div>
                      </TableCell>
                      <TableCell>
                        <div>{log.date}</div>
                        <div className="text-sm text-muted-foreground">{log.time}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{log.duration}</span>
                        </div>
                      </TableCell>
                      <TableCell>{log.purpose}</TableCell>
                      <TableCell>{log.result}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="gap-1">
                            <PhoneCall className="h-4 w-4" />
                            <span className="sr-only md:not-sr-only md:inline">Details</span>
                          </Button>
                          {log.recording && (
                            <Button variant="outline" size="sm" className="gap-1">
                              <Phone className="h-4 w-4" />
                              <span className="sr-only md:not-sr-only md:inline">Play</span>
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </BusinessAdminLayout>
  );
};

export default CallLogs;
