
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  Phone,
  Settings,
  ChevronLeft,
  CalendarDays,
  BarChart3,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

type DashboardSidebarProps = {
  isOpen: boolean;
  closeSidebar: () => void;
};

type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Calls",
    href: "/dashboard/calls",
    icon: Phone,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Calendar",
    href: "/dashboard/calendar",
    icon: CalendarDays,
  },
  {
    title: "Team",
    href: "/dashboard/team",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

const DashboardSidebar = ({ isOpen, closeSidebar }: DashboardSidebarProps) => {
  const location = useLocation();
  
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
            <Link to="/" className="flex items-center">
              <h1 className="font-bold text-2xl gradient-text">Maxom.ai</h1>
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
            <nav className="px-2 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    location.pathname === item.href
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                  {item.title === "Calls" && (
                    <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                      3
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </ScrollArea>
          
          {/* Sidebar footer */}
          <div className="border-t border-border p-4">
            <div className="rounded-md bg-sidebar-accent/50 p-3">
              <h4 className="text-sm font-medium mb-2 text-sidebar-foreground">Need Help?</h4>
              <p className="text-xs text-sidebar-foreground">
                Contact our support team for assistance with any issues.
              </p>
              <Button variant="outline" size="sm" className="w-full mt-3">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
