
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
  Archive
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";

const statsCards = [
  {
    title: "Total Pages",
    value: "24",
    change: "+3 this month",
    positive: true
  },
  {
    title: "Active Users",
    value: "18",
    change: "+5 this month",
    positive: true
  },
  {
    title: "Content Updates",
    value: "147",
    change: "+32 this month",
    positive: true
  }
];

const recentPages = [
  {
    title: "Home Page",
    type: "Landing Page",
    owner: "Admin Team",
    users: 2,
    updated: "4/15/2025"
  },
  {
    title: "About Us",
    type: "Info Page",
    owner: "Marketing",
    users: 1,
    updated: "4/18/2025"
  },
  {
    title: "Solutions",
    type: "Product Page",
    owner: "Product Team",
    users: 2,
    updated: "4/20/2025"
  },
  {
    title: "Contact",
    type: "Form Page",
    owner: "Support Team",
    users: 1,
    updated: "4/21/2025"
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
      <aside className="w-64 bg-gradient-to-b from-maxom-violet to-[#4B0082] text-white p-6 flex flex-col">
        <div className="mb-8">
          <h2 className="text-xl font-bold flex items-center">
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">Maxom.ai</span>
            <span className="ml-2 text-xs py-0.5 px-2 bg-maxom-orange/90 rounded text-white font-normal">Admin</span>
          </h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">Application</p>
            <nav className="space-y-1">
              <Link to="/cms" className="flex items-center gap-2 px-3 py-2 rounded-md bg-white/10 text-white">
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </Link>
              <Link to="/cms/pages" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10 text-white/80 hover:text-white">
                <FileText size={18} />
                <span>Pages</span>
              </Link>
              <Link to="/cms/media" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10 text-white/80 hover:text-white">
                <ImageIcon size={18} />
                <span>Media Library</span>
              </Link>
              <Link to="/cms/users" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10 text-white/80 hover:text-white">
                <Users size={18} />
                <span>Users</span>
              </Link>
            </nav>
          </div>
          
          <div>
            <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">Platform</p>
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
          </div>
          
          <div>
            <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">Security</p>
            <nav className="space-y-1">
              <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10 text-white/80 hover:text-white">
                <ShieldCheck size={18} />
                <span>Permissions</span>
              </a>
            </nav>
          </div>
          
          <div>
            <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">SRE</p>
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
        </div>
        
        <div className="mt-auto pt-4 border-t border-white/20">
          <div className="mb-2 flex items-center">
            <div className="w-8 h-8 rounded-full bg-purple-300 flex items-center justify-center text-maxom-violet font-semibold mr-2">
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
            className="w-full bg-white/10 hover:bg-white/20 border-white/20 text-white"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </div>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 p-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-2xl font-bold">Super Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage all content and system settings</p>
          </header>
          
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
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">All Pages</h2>
              <Link to="/cms/pages">
                <Button variant="outline" className="h-9">View All</Button>
              </Link>
            </div>
            
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Users</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentPages.map((page, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{page.title}</TableCell>
                      <TableCell>{page.type}</TableCell>
                      <TableCell>{page.owner}</TableCell>
                      <TableCell>{page.users}</TableCell>
                      <TableCell>{page.updated}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          asChild
                        >
                          <Link to={`/cms/pages/edit/${page.title.toLowerCase().replace(/\s+/g, '-')}`}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
          
          {/* Quick Actions */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <Link to="/cms/pages" className="block">
                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center gap-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-maxom-violet hover:dark:border-maxom-violet">
                  <FileText size={20} className="text-maxom-violet" />
                  <span>Manage Pages</span>
                </Button>
              </Link>
              <Link to="/cms/media" className="block">
                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center gap-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-maxom-violet hover:dark:border-maxom-violet">
                  <ImageIcon size={20} className="text-maxom-orange" />
                  <span>Upload Media</span>
                </Button>
              </Link>
              <Link to="/cms/settings" className="block">
                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center gap-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-maxom-violet hover:dark:border-maxom-violet">
                  <Settings size={20} className="text-maxom-orange" />
                  <span>System Settings</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
