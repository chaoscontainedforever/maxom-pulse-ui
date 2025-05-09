
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
  ChevronDown,
  BookOpen,
  Layers,
  Bell,
  FileText as Template,
  Settings as SettingsIcon,
  Network,
  CreditCard as BillingIcon,
  User,
  Key,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/context/auth";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

type BusinessAdminSidebarProps = {
  isOpen: boolean;
  closeSidebar: () => void;
};

type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
  businessTypes?: string[];
  children?: NavItem[];
};

type NavSection = {
  title: string;
  items: NavItem[];
};

const BusinessAdminSidebar = ({ isOpen, closeSidebar }: BusinessAdminSidebarProps) => {
  const location = useLocation();
  const { profile } = useAuth();
  
  console.log("BusinessAdminSidebar profile:", profile); // Enhanced logging
  
  // Track expanded state for collapsible sections
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    "Logs": false,
    "Campaign": false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  // Define navigation structure with sections
  const navSections: NavSection[] = [
    {
      title: "Main feature",
      items: [
        {
          title: "Dashboard",
          href: "/business-admin",
          icon: LayoutDashboard,
        },
        {
          title: "AI Assistants",
          href: "/business-admin/voice-settings",
          icon: Headphones,
        },
        {
          title: "Knowledge Base",
          href: "/business-admin/analytics",
          icon: BookOpen,
        },
        {
          title: "Phone Numbers",
          href: "/business-admin/call-logs",
          icon: Phone,
        },
        {
          title: "Logs",
          href: "/business-admin/logs",
          icon: Layers,
          children: [
            {
              title: "Call Logs",
              href: "/business-admin/call-logs",
              icon: Phone,
            },
            {
              title: "Activity Logs",
              href: "/business-admin/activity-logs",
              icon: FileText,
            }
          ]
        },
        {
          title: "Campaign",
          href: "/business-admin/campaign",
          icon: Bell,
          children: [
            {
              title: "Email Campaigns",
              href: "/business-admin/email-campaigns",
              icon: Bell,
            },
            {
              title: "SMS Campaigns",
              href: "/business-admin/sms-campaigns",
              icon: Bell,
            }
          ]
        },
        {
          title: "Templates",
          href: "/business-admin/templates",
          icon: Template
        },
      ]
    },
    {
      title: "Settings",
      items: [
        {
          title: "RUTH® Connect",
          href: "/business-admin/ruth-connect",
          icon: Network
        },
        {
          title: "Billing",
          href: "/business-admin/billing",
          icon: BillingIcon,
        },
        {
          title: "Profile",
          href: "/business-admin/profile",
          icon: User,
        },
        {
          title: "API Keys",
          href: "/business-admin/api-keys",
          icon: Key,
        }
      ]
    }
  ];

  // Restaurant-specific navigation items
  const restaurantNavItems: NavItem[] = [
    {
      title: "Orders",
      href: "/business-admin/orders",
      icon: FileText,
      businessTypes: ["restaurant"],
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
      title: "Customers",
      href: "/business-admin/customers",
      icon: Users,
      businessTypes: ["restaurant"],
    },
  ];

  // Business-specific navigation items for other business types
  const businessSpecificNavItems: NavItem[] = [
    // Fitness-specific items
    {
      title: "Classes",
      href: "/business-admin/classes",
      icon: Dumbbell,
      businessTypes: ["fitness"],
    },
    {
      title: "Appointments",
      href: "/business-admin/appointments",
      icon: Calendar,
      businessTypes: ["fitness", "healthcare"],
    },
    {
      title: "Customers",
      href: "/business-admin/customers",
      icon: Users,
      businessTypes: ["fitness", "healthcare", "homeservices"],
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
    {
      title: "Customers",
      href: "/business-admin/customers",
      icon: Users,
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
  const businessType = profile?.business_type || '';
  console.log(`Current business type: ${businessType}`);
  
  // Add business specific section if user has a business type
  if (businessType) {
    // Filter items based on business type
    let businessSpecificItems = [];
    if (businessType === "restaurant") {
      businessSpecificItems = restaurantNavItems;
    } else {
      businessSpecificItems = businessSpecificNavItems.filter(
        item => item.businessTypes?.includes(businessType)
      );
    }
    
    // Only add the business section if there are items for this business type
    if (businessSpecificItems.length > 0) {
      navSections.splice(1, 0, {
        title: `${businessType.charAt(0).toUpperCase() + businessType.slice(1)} Features`,
        items: businessSpecificItems
      });
    }
  }
  
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
          "fixed inset-y-0 left-0 z-30 w-72 transform bg-sidebar border-r border-border transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
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
            <nav className="px-3 space-y-6">
              {navSections.map((section) => (
                <div key={section.title} className="space-y-1">
                  <h3 className="px-4 text-sm font-medium text-muted-foreground mb-2">{section.title}</h3>
                  
                  {section.items.map((item) => (
                    <div key={item.title}>
                      {item.children ? (
                        <Collapsible
                          open={expandedSections[item.title]}
                          onOpenChange={() => toggleSection(item.title)}
                          className="w-full"
                        >
                          <CollapsibleTrigger asChild>
                            <button
                              className={cn(
                                "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                isActive(item.href) 
                                  ? "bg-gradient-to-r from-maxom-violet to-maxom-orange text-white"
                                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                              )}
                            >
                              <div className="flex items-center gap-3">
                                <item.icon className="h-5 w-5" />
                                <span>{item.title}</span>
                              </div>
                              <ChevronDown 
                                className={cn(
                                  "h-4 w-4 transition-transform", 
                                  expandedSections[item.title] ? "transform rotate-180" : ""
                                )}
                              />
                            </button>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="pl-9 space-y-1 pt-1">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                to={child.href}
                                className={cn(
                                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                  isActive(child.href)
                                    ? "bg-gradient-to-r from-maxom-violet to-maxom-orange text-white"
                                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                                )}
                              >
                                <span>{child.title}</span>
                              </Link>
                            ))}
                          </CollapsibleContent>
                        </Collapsible>
                      ) : (
                        <Link
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
                      )}
                    </div>
                  ))}
                </div>
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
