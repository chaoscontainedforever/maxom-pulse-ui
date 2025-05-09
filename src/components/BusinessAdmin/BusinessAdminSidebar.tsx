import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Phone,
  ChevronLeft,
  Headphones,
  CreditCard,
  BarChart,
  Utensils,
  Users,
  FileText,
  Car,
  Calendar,
  CarFront,
  Hospital,
  Home,
  Dumbbell,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/context/auth";

type BusinessAdminSidebarProps = {
  isOpen: boolean;
  closeSidebar: () => void;
};

type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
  businessTypes?: string[];
};

const BusinessAdminSidebar = ({ isOpen, closeSidebar }: BusinessAdminSidebarProps) => {
  const location = useLocation();
  const { profile } = useAuth();
  
  console.log("Current business profile:", profile); // Add this to debug
  
  // Common navigation items for all business types
  const commonNavItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/business-admin",
      icon: LayoutDashboard,
    },
    {
      title: "Voice Settings",
      href: "/business-admin/voice-settings",
      icon: Headphones,
    },
    {
      title: "Call Logs",
      href: "/business-admin/call-logs",
      icon: Phone,
    },
    {
      title: "Billing Info",
      href: "/business-admin/billing",
      icon: CreditCard,
    },
    {
      title: "Analytics",
      href: "/business-admin/analytics",
      icon: BarChart,
    },
  ];

  // Business-specific navigation items
  const businessSpecificNavItems: NavItem[] = [
    // Restaurant-specific items
    {
      title: "Orders",
      href: "/business-admin/orders",
      icon: FileText,
      businessTypes: ["restaurant"],
    },
    {
      title: "Customers",
      href: "/business-admin/customers",
      icon: Users,
      businessTypes: ["restaurant", "fitness", "auto", "healthcare", "homeservices"],
    },
    {
      title: "Menu Editor",
      href: "/business-admin/menu",
      icon: Utensils,
      businessTypes: ["restaurant"],
    },
    {
      title: "Drive-Thru Metrics",
      href: "/business-admin/drive-thru",
      icon: CarFront,
      businessTypes: ["restaurant"],
    },
    {
      title: "Employee Portal",
      href: "/business-admin/employees",
      icon: Users,
      businessTypes: ["restaurant"],
    },
    
    // Fitness-specific items
    {
      title: "Appointments",
      href: "/business-admin/appointments",
      icon: Calendar,
      businessTypes: ["fitness", "healthcare"],
    },
    {
      title: "Classes",
      href: "/business-admin/classes",
      icon: Dumbbell,
      businessTypes: ["fitness"],
    },
    
    // Auto dealership-specific items
    {
      title: "Test Drives",
      href: "/business-admin/test-drives",
      icon: Car,
      businessTypes: ["auto"],
    },
    {
      title: "Service Reservations",
      href: "/business-admin/service",
      icon: CarFront,
      businessTypes: ["auto"],
    },
    
    // Healthcare-specific items
    {
      title: "Patients",
      href: "/business-admin/patients",
      icon: Hospital,
      businessTypes: ["healthcare"],
    },
    
    // Home Services-specific items
    {
      title: "Jobs",
      href: "/business-admin/jobs",
      icon: Home,
      businessTypes: ["homeservices"],
    },
    {
      title: "Business Details",
      href: "/business-admin/business-details",
      icon: FileText,
      businessTypes: ["homeservices"],
    },
  ];

  // Filter business-specific items based on current business type
  const filteredBusinessItems = businessSpecificNavItems.filter(
    item => item.businessTypes?.includes(profile?.business_type || '')
  );
  
  const allNavItems = [...commonNavItems, ...filteredBusinessItems];
  
  // Check if the current path is active
  const isActive = (href: string) => {
    if (href === "/business-admin") {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };
  
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
            <Link to="/business-admin" className="flex items-center">
              <h1 className="font-bold text-2xl gradient-text">Maxom.ai</h1>
              <span className="ml-2 text-xs bg-primary/20 text-primary rounded px-1.5 py-0.5">
                Business
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
            <nav className="px-2 space-y-1">
              {allNavItems.map((item) => (
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

export default BusinessAdminSidebar;
