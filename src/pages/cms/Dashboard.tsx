
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  FileText, 
  ImageIcon, 
  Settings, 
  Users,
  Bell,
  BarChart3,
  ShieldCheck,
  MonitorSmartphone,
  FileCode,
  Archive,
  LogOut,
  Search
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const statsCards = [
  {
    title: "Total Customers",
    value: "247",
    change: "+12 this month",
    positive: true
  },
  {
    title: "Active Users",
    value: "1,382",
    change: "+78 this month",
    positive: true
  },
  {
    title: "Voice Minutes Used",
    value: "32,847",
    change: "+3,254 this month",
    positive: true
  }
];

const customerData = [
  {
    business: "Quantum Foods",
    email: "info@quantumfoods.com",
    type: "Restaurant",
    owner: "John Smith",
    users: 2,
    created: "4/15/2025"
  },
  {
    business: "FlexFit Gym",
    email: "contact@flexfitgym.com",
    type: "Fitness",
    owner: "Sarah Jones",
    users: 2,
    created: "4/18/2025"
  },
  {
    business: "Elite Motors",
    email: "sales@elitemotors.com",
    type: "Auto Dealership",
    owner: "Michael Rodriguez",
    users: 2,
    created: "4/20/2025"
  },
  {
    business: "Wellness Medical Group",
    email: "appointments@wellnessmedical.com",
    type: "Healthcare",
    owner: "Lisa Chen",
    users: 2,
    created: "5/8/2025"
  },
  {
    business: "ReadyFix Home Services",
    email: "service@readyfix.com",
    type: "Home Services",
    owner: "Robert Johnson",
    users: 2,
    created: "4/21/2025"
  }
];

export default function CMSDashboard() {
  const { user, signOut } = useAuth();
  
  const handleSignOut = async () => {
    await signOut();
  };
  
  return (
    <div className="flex h-full min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-[#800020] to-[#FF6200] text-white">
        <div className="p-4 flex items-center">
          <h2 className="text-xl font-bold flex items-center">
            <span className="text-white">Maxom.ai</span>
            <span className="ml-2 text-xs py-0.5 px-2 bg-orange-300/90 rounded text-[#800020] font-normal">Admin</span>
          </h2>
        </div>
        
        <div className="px-3 py-2">
          <p className="text-xs font-semibold text-white/70 uppercase tracking-wider pl-3 mb-1">APPLICATION</p>
          <nav className="space-y-1">
            <Link to="/cms" className="flex items-center gap-2 px-3 py-2 rounded-md bg-white/10 text-white">
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </Link>
            <Link to="/cms/pages" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10 text-white/80 hover:text-white">
              <FileText size={18} />
              <span>Pages</span>
            </Link>
            <Link to="/cms/customers" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10 text-white/80 hover:text-white">
              <Users size={18} />
              <span>Customers</span>
            </Link>
            <Link to="/cms/user-management" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10 text-white/80 hover:text-white">
              <Users size={18} />
              <span>User Management</span>
            </Link>
            <Link to="/cms/voice-settings" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10 text-white/80 hover:text-white">
              <ImageIcon size={18} />
              <span>Voice Settings</span>
            </Link>
            <Link to="/cms/call-analytics" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10 text-white/80 hover:text-white">
              <ImageIcon size={18} />
              <span>Call Analytics</span>
            </Link>
          </nav>
          
          <p className="text-xs font-semibold text-white/70 uppercase tracking-wider pl-3 mt-6 mb-1">PLATFORM</p>
          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10 text-white/80 hover:text-white">
              <Bell size={18} />
              <span>Notifications</span>
            </a>
            <Link to="/cms/settings" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10 text-white/80 hover:text-white">
              <Settings size={18} />
              <span>System Settings</span>
            </Link>
            <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10 text-white/80 hover:text-white">
              <BarChart3 size={18} />
              <span>Reports</span>
            </a>
          </nav>
          
          <p className="text-xs font-semibold text-white/70 uppercase tracking-wider pl-3 mt-6 mb-1">SECURITY</p>
          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10 text-white/80 hover:text-white">
              <ShieldCheck size={18} />
              <span>Permissions</span>
            </a>
          </nav>
          
          <p className="text-xs font-semibold text-white/70 uppercase tracking-wider pl-3 mt-6 mb-1">SRE</p>
          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10 text-white/80 hover:text-white">
              <MonitorSmartphone size={18} />
              <span>Monitoring</span>
            </a>
            <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10 text-white/80 hover:text-white">
              <Archive size={18} />
              <span>Logs</span>
            </a>
            <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10 text-white/80 hover:text-white">
              <FileCode size={18} />
              <span>Deployments</span>
            </a>
          </nav>
        </div>
        
        <div className="absolute bottom-0 w-64 p-4 border-t border-white/20">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#800020] font-semibold mr-2">
              {user?.email?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="text-sm overflow-hidden">
              <p className="font-medium truncate">{user?.email}</p>
              <p className="text-white/60 text-xs">Super Admin Access</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border-white/20 text-white"
            onClick={handleSignOut}
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </Button>
          <div className="text-xs text-white/50 mt-1 text-center">
            You have full system administrator privileges.
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 p-8 bg-gray-50 dark:bg-gray-900 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Super Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage all customers and system settings</p>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-9 w-[300px]" />
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            {statsCards.map((stat, i) => (
              <Card key={i} className="p-6">
                <p className="text-sm text-muted-foreground font-medium">{stat.title}</p>
                <p className="text-3xl font-bold mt-2 mb-1">{stat.value}</p>
                <p className={cn(
                  "text-xs flex items-center",
                  stat.positive ? "text-green-600" : "text-red-600"
                )}>
                  {stat.change}
                </p>
              </Card>
            ))}
          </div>
          
          {/* Content Management Section */}
          <div className="mb-6">
            <Card className="p-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold">All Customers</h2>
                <p className="text-muted-foreground text-sm">View and manage all registered business customers</p>
              </div>
              
              <div className="overflow-hidden rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Business</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Users</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customerData.map((customer, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">
                          <div>
                            {customer.business}
                            <div className="text-xs text-muted-foreground">{customer.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>{customer.type}</TableCell>
                        <TableCell>{customer.owner}</TableCell>
                        <TableCell>{customer.users}</TableCell>
                        <TableCell>{customer.created}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            asChild
                          >
                            <Link to={`/cms/customers/${customer.business.toLowerCase().replace(/\s+/g, '-')}`}>
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
