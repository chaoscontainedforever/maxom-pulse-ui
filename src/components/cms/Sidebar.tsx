
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  FileText, 
  Users,
  Bell,
  BarChart3,
  ShieldCheck,
  MonitorSmartphone,
  FileCode,
  Archive,
  LogOut,
  Settings,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface SidebarProps {
  onSignOut: () => Promise<void>;
}

export const CMSSidebar = ({ onSignOut }: SidebarProps) => {
  const { user } = useAuth();
  
  return (
    <aside className="w-64 bg-gradient-to-b from-[#800020] to-[#FF6200] text-white fixed h-full">
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
            <Settings size={18} />
            <span>Voice Settings</span>
          </Link>
          <Link to="/cms/call-analytics" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10 text-white/80 hover:text-white">
            <BarChart3 size={18} />
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
            <p className="font-medium truncate">{user?.email || 'Admin User'}</p>
            <p className="text-white/60 text-xs">Super Admin Access</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border-white/20 text-white"
          onClick={onSignOut}
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </Button>
        <div className="text-xs text-white/50 mt-1 text-center">
          You have full system administrator privileges.
        </div>
      </div>
    </aside>
  );
};
