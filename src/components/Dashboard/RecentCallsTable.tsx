
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Play, Download, MessageSquare } from "lucide-react";

const RecentCallsTable = () => {
  // Simulated data (would come from API)
  const calls = [
    {
      id: "call-1",
      caller: "John Smith",
      phone: "(555) 123-4567",
      date: "2023-05-09 14:32",
      duration: "2m 45s",
      status: "completed",
      outcome: "order",
    },
    {
      id: "call-2",
      caller: "Sara Johnson",
      phone: "(555) 987-6543",
      date: "2023-05-09 13:15",
      duration: "1m 20s",
      status: "completed",
      outcome: "reservation",
    },
    {
      id: "call-3",
      caller: "Michael Brown",
      phone: "(555) 567-8901",
      date: "2023-05-09 12:08",
      duration: "3m 12s",
      status: "completed",
      outcome: "information",
    },
    {
      id: "call-4",
      caller: "Jessica Davis",
      phone: "(555) 234-5678",
      date: "2023-05-09 10:47",
      duration: "0m 45s",
      status: "missed",
      outcome: "none",
    },
    {
      id: "call-5",
      caller: "Robert Wilson",
      phone: "(555) 345-6789",
      date: "2023-05-08 16:32",
      duration: "1m 55s",
      status: "completed",
      outcome: "order",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      case "missed":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Missed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getOutcomeBadge = (outcome: string) => {
    switch (outcome) {
      case "order":
        return <Badge className="bg-primary/20 text-primary border-primary/30">Order</Badge>;
      case "reservation":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Reservation</Badge>;
      case "information":
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200">Information</Badge>;
      case "none":
        return <Badge variant="outline" className="text-muted-foreground">None</Badge>;
      default:
        return <Badge variant="outline">{outcome}</Badge>;
    }
  };

  return (
    <div className="rounded-lg border bg-card">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold">Recent Calls</h3>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>
      <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Caller</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Outcome</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {calls.map((call) => (
              <TableRow key={call.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{call.caller}</div>
                    <div className="text-sm text-muted-foreground">{call.phone}</div>
                  </div>
                </TableCell>
                <TableCell>{call.date}</TableCell>
                <TableCell>{call.duration}</TableCell>
                <TableCell>{getStatusBadge(call.status)}</TableCell>
                <TableCell>{getOutcomeBadge(call.outcome)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="ghost">
                      <Play className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RecentCallsTable;
