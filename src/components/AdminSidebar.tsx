
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Phone, 
  Users, 
  Settings, 
  BarChart2, 
  HelpCircle, 
  X, 
  LogOut,
  Calendar
} from "lucide-react";

type AdminSidebarProps = {
  isOpen: boolean;
  closeSidebar: () => void;
};

const AdminSidebar = ({ isOpen, closeSidebar }: AdminSidebarProps) => {
  const location = useLocation();
  const pathName = location.pathname;

  const isActive = (path: string) => {
    return pathName === path;
  };

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
        className={`fixed md:sticky top-0 left-0 h-screen bg-background border-r border-border z-30 transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } w-64 md:w-64 flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Link to="/" className="text-lg font-bold">
            Maxom<span className="text-maxom-orange">.ai</span> <span className="text-sm font-normal text-muted-foreground">Admin</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={closeSidebar} className="md:hidden">
            <X size={20} />
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <Button 
            variant="ghost" 
            className={`w-full justify-start ${isActive("/admin") ? "bg-gradient-to-r from-maxom-violet to-maxom-orange text-white hover:opacity-90" : ""}`}
            asChild
          >
            <Link to="/admin">
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </Button>

          <Button 
            variant="ghost" 
            className={`w-full justify-start ${isActive("/admin/call-analytics") ? "bg-gradient-to-r from-maxom-violet to-maxom-orange text-white hover:opacity-90" : ""}`}
            asChild
          >
            <Link to="/admin/call-analytics">
              <Phone className="mr-2 h-4 w-4" />
              Call Analytics
            </Link>
          </Button>

          <Button 
            variant="ghost" 
            className={`w-full justify-start ${isActive("/admin/reports") ? "bg-gradient-to-r from-maxom-violet to-maxom-orange text-white hover:opacity-90" : ""}`}
            asChild
          >
            <Link to="/admin/reports">
              <BarChart2 className="mr-2 h-4 w-4" />
              Reports
            </Link>
          </Button>

          <Button 
            variant="ghost" 
            className={`w-full justify-start ${isActive("/admin/businesses") ? "bg-gradient-to-r from-maxom-violet to-maxom-orange text-white hover:opacity-90" : ""}`}
            asChild
          >
            <Link to="/admin/businesses">
              <Users className="mr-2 h-4 w-4" />
              Businesses
            </Link>
          </Button>

          <Button 
            variant="ghost" 
            className={`w-full justify-start ${isActive("/admin/restaurant-orders") ? "bg-gradient-to-r from-maxom-violet to-maxom-orange text-white hover:opacity-90" : ""}`}
            asChild
          >
            <Link to="/admin/restaurant-orders">
              <Users className="mr-2 h-4 w-4" />
              Orders
            </Link>
          </Button>

          <Button 
            variant="ghost" 
            className={`w-full justify-start ${isActive("/admin/reservations") ? "bg-gradient-to-r from-maxom-violet to-maxom-orange text-white hover:opacity-90" : ""}`}
            asChild
          >
            <Link to="/admin/reservations">
              <Calendar className="mr-2 h-4 w-4" />
              Reservations
            </Link>
          </Button>

          <Button 
            variant="ghost" 
            className={`w-full justify-start ${isActive("/admin/settings") ? "bg-gradient-to-r from-maxom-violet to-maxom-orange text-white hover:opacity-90" : ""}`}
            asChild
          >
            <Link to="/admin/settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </Button>

          <Button 
            variant="ghost" 
            className={`w-full justify-start ${isActive("/admin/help") ? "bg-gradient-to-r from-maxom-violet to-maxom-orange text-white hover:opacity-90" : ""}`}
            asChild
          >
            <Link to="/admin/help">
              <HelpCircle className="mr-2 h-4 w-4" />
              Help & Support
            </Link>
          </Button>
        </nav>
        
        <div className="p-4 border-t border-border">
          <Button variant="ghost" className="w-full justify-start text-red-500" asChild>
            <Link to="/login">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Link>
          </Button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
