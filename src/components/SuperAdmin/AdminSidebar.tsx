
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  LayoutDashboard,
  Users,
  Settings,
  BarChart3,
  Building,
  Phone,
  Bell,
  Lock,
  Headphones,
  Monitor,
  Database,
  Shield,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

type AdminSidebarProps = {
  isOpen: boolean;
  closeSidebar: () => void;
};

type NavSection = {
  title: string;
  items: NavItem[];
};

type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
};

const AdminSidebar = ({ isOpen, closeSidebar }: AdminSidebarProps) => {
  const location = useLocation();
  
  // Check if the current path is active or a sub-path is active
  const isActive = (href: string) => {
    if (href === "/super-admin") {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };
  
  // Admin navigation grouped into sections
  const adminNavSections: NavSection[] = [
    {
      title: "Application",
      items: [
        {
          title: "Dashboard",
          href: "/super-admin",
          icon: LayoutDashboard,
        },
        {
          title: "Customers",
          href: "/super-admin/customers",
          icon: Building,
        },
        {
          title: "User Management",
          href: "/super-admin/users",
          icon: Users,
        },
        {
          title: "Voice Settings",
          href: "/super-admin/voice",
          icon: Headphones,
        },
        {
          title: "Call Analytics",
          href: "/super-admin/call-analytics",
          icon: Phone,
        },
      ]
    },
    {
      title: "Platform",
      items: [
        {
          title: "Notifications",
          href: "/super-admin/notifications",
          icon: Bell,
        },
        {
          title: "System Settings",
          href: "/super-admin/settings",
          icon: Settings,
        },
        {
          title: "Reports",
          href: "/super-admin/reports",
          icon: BarChart3,
        },
      ]
    },
    {
      title: "Security",
      items: [
        {
          title: "Permissions",
          href: "/super-admin/permissions",
          icon: Lock,
        },
      ]
    },
    {
      title: "SRE",
      items: [
        {
          title: "Monitoring",
          href: "/super-admin/monitoring",
          icon: Monitor,
        },
        {
          title: "Logs",
          href: "/super-admin/logs",
          icon: Database,
        },
        {
          title: "Deployments",
          href: "/super-admin/deployments",
          icon: Shield,
        },
      ]
    }
  ];
  
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
          onClick={closeSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 transform bg-sidebar border-r border-border transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="border-b border-border h-16 flex items-center px-6 justify-between">
            <Link to="/super-admin" className="flex items-center">
              <h1 className="font-bold text-2xl gradient-text">Maxom.ai</h1>
              <span className="ml-2 text-xs bg-primary/20 text-primary rounded px-1.5 py-0.5">
                Admin
              </span>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden" 
              onClick={closeSidebar}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Navigation */}
          <ScrollArea className="flex-1 py-4">
            <nav className="px-2 space-y-6">
              {adminNavSections.map((section) => (
                <div key={section.title} className="space-y-1">
                  <h3 className="px-3 text-xs font-medium uppercase text-muted-foreground mb-2">
                    {section.title}
                  </h3>
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        isActive(item.href)
                          ? "bg-gradient-to-r from-maxom-violet to-maxom-orange text-white"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </div>
              ))}
            </nav>
          </ScrollArea>
          
          {/* Sidebar footer */}
          <div className="border-t border-border p-4">
            <div className="rounded-md bg-sidebar-accent/50 p-3">
              <h4 className="text-sm font-medium mb-2 text-sidebar-foreground">Super Admin Access</h4>
              <p className="text-xs text-sidebar-foreground">
                You have full system administrator privileges.
              </p>
              <Button variant="outline" size="sm" className="w-full mt-3">
                Help & Documentation
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
