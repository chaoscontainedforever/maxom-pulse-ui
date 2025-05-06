
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, Phone, Users, Settings, BarChart2, HelpCircle, X, LogOut } from "lucide-react";

type AdminSidebarProps = {
  isOpen: boolean;
  closeSidebar: () => void;
};

const AdminSidebar = ({ isOpen, closeSidebar }: AdminSidebarProps) => {
  const [activeItem, setActiveItem] = useState("dashboard");

  return (
    <>
      {/* Mobile sidebar backdrop */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden transition-opacity duration-200 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`} 
        onClick={closeSidebar}
      />

      {/* Sidebar */}
      <aside 
        className={`fixed md:sticky top-0 left-0 h-screen bg-white border-r border-gray-200 z-30 transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } w-64 md:w-64 flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <Link to="/" className="text-lg font-bold">
            Maxom<span className="text-maxom-orange">.ai</span> <span className="text-sm font-normal text-gray-500">Admin</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={closeSidebar} className="md:hidden">
            <X size={20} />
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <Button 
            variant={activeItem === "dashboard" ? "secondary" : "ghost"} 
            className="w-full justify-start" 
            onClick={() => setActiveItem("dashboard")}
          >
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Button>

          <Button 
            variant={activeItem === "calls" ? "secondary" : "ghost"} 
            className="w-full justify-start" 
            onClick={() => setActiveItem("calls")}
          >
            <Phone className="mr-2 h-4 w-4" />
            Call Analytics
          </Button>

          <Button 
            variant={activeItem === "businesses" ? "secondary" : "ghost"} 
            className="w-full justify-start" 
            onClick={() => setActiveItem("businesses")}
          >
            <Users className="mr-2 h-4 w-4" />
            Businesses
          </Button>

          <Button 
            variant={activeItem === "reports" ? "secondary" : "ghost"} 
            className="w-full justify-start" 
            onClick={() => setActiveItem("reports")}
          >
            <BarChart2 className="mr-2 h-4 w-4" />
            Reports
          </Button>

          <Button 
            variant={activeItem === "settings" ? "secondary" : "ghost"} 
            className="w-full justify-start" 
            onClick={() => setActiveItem("settings")}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>

          <Button 
            variant={activeItem === "help" ? "secondary" : "ghost"} 
            className="w-full justify-start" 
            onClick={() => setActiveItem("help")}
          >
            <HelpCircle className="mr-2 h-4 w-4" />
            Help & Support
          </Button>
        </nav>
        
        <div className="p-4 border-t">
          <Button variant="ghost" className="w-full justify-start text-red-500">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
