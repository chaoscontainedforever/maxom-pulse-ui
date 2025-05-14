
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  Image,
  Menu,
  Megaphone,
  Settings,
  LogOut 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  onSignOut: () => Promise<void>;
}

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  active?: boolean;
}

const NavItem = ({ icon: Icon, label, to, active }: NavItemProps) => (
  <Link 
    to={to} 
    className={cn(
      "flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors",
      active 
        ? "bg-gradient-to-r from-[#800020] to-[#FF6200] text-white" 
        : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
    )}
  >
    <Icon size={18} />
    <span>{label}</span>
  </Link>
);

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

export const CMSSidebar = ({ onSignOut }: SidebarProps) => {
  const { user } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;
  
  return (
    <aside className="w-64 bg-gradient-to-b from-[#800020] to-[#FF6200] text-white fixed h-full">
      <div className="p-4 flex items-center">
        <h2 className="text-xl font-bold flex items-center">
          <span className="text-white">Maxom.ai</span>
          <span className="ml-2 text-xs py-0.5 px-2 bg-orange-300/90 rounded text-[#800020] font-normal">Admin</span>
        </h2>
      </div>
      
      <div className="px-3 py-2">
        <p className="text-xs font-semibold text-white/70 uppercase tracking-wider pl-3 mb-1">CONTENT</p>
        <nav className="space-y-1">
          <NavItem 
            icon={LayoutDashboard} 
            label="Dashboard" 
            to="/cms" 
            active={currentPath === "/cms"} 
          />
          <NavItem 
            icon={FileText} 
            label="Pages" 
            to="/cms/pages" 
            active={currentPath === "/cms/pages" || currentPath.includes("/cms/pages/")} 
          />
          <NavItem 
            icon={Image} 
            label="Media Library" 
            to="/cms/media" 
            active={currentPath === "/cms/media"} 
          />
          <NavItem 
            icon={Menu} 
            label="Navigation" 
            to="/cms/navigation" 
            active={currentPath === "/cms/navigation"} 
          />
          <NavItem 
            icon={Megaphone} 
            label="Announcement Ribbon" 
            to="/cms/ribbon" 
            active={currentPath === "/cms/ribbon"} 
          />
          <NavItem 
            icon={Settings} 
            label="Site Settings" 
            to="/cms/settings" 
            active={currentPath === "/cms/settings"} 
          />
        </nav>
      </div>
      
      <div className="absolute bottom-0 w-64 p-4 border-t border-white/20">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#800020] font-semibold mr-2">
            {user?.email?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div className="text-sm overflow-hidden">
            <p className="font-medium truncate">{user?.email || 'Admin User'}</p>
            <p className="text-white/60 text-xs">CMS Admin</p>
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
      </div>
    </aside>
  );
}
