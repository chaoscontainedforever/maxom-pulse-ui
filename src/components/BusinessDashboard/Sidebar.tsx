
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { 
  LayoutDashboard, 
  FileText, 
  ChefHat,
  BarChart3,
  Users,
  Bot,
  CreditCard,
  User,
  Key,
  HelpCircle,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  onSignOut: () => Promise<void>;
}

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  active?: boolean;
}

const NavItem = ({ icon: Icon, label, to, active }: NavItemProps) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors",
        active 
          ? "bg-gradient-to-r from-maxom-violet to-maxom-orange/80 text-white" 
          : "text-gray-700 hover:bg-gray-100"
      )}
    >
      <Icon size={18} className={active ? "text-white" : ""} />
      <span>{label}</span>
    </Link>
  );
};

const NavSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-6">
    <h3 className="px-4 mb-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
      {title}
    </h3>
    <div className="space-y-1">
      {children}
    </div>
  </div>
);

export const BusinessSidebar = ({ onSignOut }: SidebarProps) => {
  const { user } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;
  
  return (
    <aside className="w-60 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold flex items-center text-gray-800">
          <span>Maxom.ai</span>
          <span className="ml-2 text-xs py-0.5 px-2 bg-orange-100 rounded text-orange-700 font-normal">
            Admin
          </span>
        </h2>
      </div>
      
      <div className="flex-1 py-4 overflow-y-auto">
        <NavSection title="APPLICATION">
          <NavItem icon={LayoutDashboard} label="Dashboard" to="/" active={currentPath === "/"} />
          <NavItem icon={Users} label="Customers" to="/customers" active={currentPath === "/customers"} />
          <NavItem icon={User} label="User Management" to="/users" active={currentPath === "/users"} />
          <NavItem icon={FileText} label="Voice Settings" to="/voice-settings" active={currentPath === "/voice-settings"} />
          <NavItem icon={BarChart3} label="Call Analytics" to="/call-analytics" active={currentPath === "/call-analytics"} />
        </NavSection>
        
        <NavSection title="PLATFORM">
          <NavItem icon={Bot} label="Notifications" to="/notifications" active={currentPath === "/notifications"} />
          <NavItem icon={CreditCard} label="System Settings" to="/system-settings" active={currentPath === "/system-settings"} />
          <NavItem icon={BarChart3} label="Reports" to="/reports" active={currentPath === "/reports"} />
        </NavSection>
        
        <NavSection title="SECURITY">
          <NavItem icon={Key} label="Permissions" to="/permissions" active={currentPath === "/permissions"} />
        </NavSection>
        
        <NavSection title="SRE">
          <NavItem icon={ChefHat} label="Monitoring" to="/monitoring" active={currentPath === "/monitoring"} />
          <NavItem icon={FileText} label="Logs" to="/logs" active={currentPath === "/logs"} />
          <NavItem icon={HelpCircle} label="Deployments" to="/deployments" active={currentPath === "/deployments"} />
        </NavSection>
      </div>
      
      <div className="p-4 border-t border-gray-200 mt-auto">
        <div className="mb-3 px-4">
          <h3 className="text-sm font-medium">Super Admin Access</h3>
          <p className="text-xs text-gray-500">You have full system administrator privileges.</p>
        </div>
        <button 
          className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 w-full rounded-md px-4 py-2 text-sm font-medium transition-colors"
          onClick={onSignOut}
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
