import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/context/auth";
import { useState, useEffect } from "react";
import { NavSection } from "./Sidebar/NavSection";
import { SupportWidget } from "./Sidebar/SupportWidget";
import { getMainNavSections, restaurantNavItems, businessSpecificNavItems } from "./Sidebar/navigation";
import { NavSection as NavSectionType } from "./Sidebar/types";

type BusinessAdminSidebarProps = {
  isOpen: boolean;
  closeSidebar: () => void;
};

const BusinessAdminSidebar = ({ isOpen, closeSidebar }: BusinessAdminSidebarProps) => {
  const location = useLocation();
  const { profile } = useAuth();
  
  // Enhanced logging to debug the issue
  console.log("BusinessAdminSidebar profile:", profile);
  
  // Track expanded state for collapsible sections
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    "Logs": false,
    "Campaign": false
  });

  // State to hold the navigation sections
  const [navSections, setNavSections] = useState<NavSectionType[]>([]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  // Check if the current path is active
  const isActive = (href: string) => {
    if (href === "/business-admin") {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };
  
  // Get business type from profile - ensure lowercase for consistent comparison
  const businessType = profile?.business_type?.toLowerCase() || '';
  console.log(`Current business type: ${businessType}`);
  
  // Effect to add business specific section when profile loads
  useEffect(() => {
    // Create a new array to avoid mutation issues
    const updatedSections = [...getMainNavSections()];
    
    if (businessType === "restaurant") {
      console.log("Adding restaurant-specific navigation items");
      const restaurantSection = {
        title: "Business Tools",
        items: [...restaurantNavItems]
      };
      
      // Find if Business Tools section already exists
      const businessToolsIndex = updatedSections.findIndex(section => section.title === "Business Tools");
      
      if (businessToolsIndex !== -1) {
        // If it exists, add our items to it
        console.log("Business Tools section found, adding restaurant items");
        updatedSections[businessToolsIndex].items = [
          ...updatedSections[businessToolsIndex].items,
          ...restaurantNavItems
        ];
      } else {
        // Otherwise add new section
        console.log("Adding new Business Tools section with restaurant items");
        updatedSections.push(restaurantSection);
      }
    } else if (businessType) {
      console.log("Adding other business-specific items for", businessType);
      const specificItems = businessSpecificNavItems.filter(
        item => item.businessTypes?.includes(businessType)
      );
      
      if (specificItems.length > 0) {
        // Similar logic for other business types
        const businessSection = {
          title: `${businessType.charAt(0).toUpperCase() + businessType.slice(1)} Features`,
          items: specificItems
        };
        
        updatedSections.push(businessSection);
      }
    }
    
    setNavSections(updatedSections);
    console.log("Updated nav sections:", updatedSections);
  }, [businessType]);

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
              {/* Render all navigation sections */}
              {navSections.map((section) => (
                <NavSection 
                  key={section.title} 
                  section={section} 
                  isActive={isActive} 
                />
              ))}
            </nav>
          </ScrollArea>
          
          {/* Sidebar footer */}
          <div className="border-t border-border p-4">
            <SupportWidget />
          </div>
        </div>
      </aside>
    </>
  );
};

export default BusinessAdminSidebar;
