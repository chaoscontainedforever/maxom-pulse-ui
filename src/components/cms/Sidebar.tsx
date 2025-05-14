
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
import { SidebarNav } from "@/components/ui/sidebar-nav";

interface SidebarProps {
  onSignOut: () => Promise<void>;
}

export const CMSSidebar = ({ onSignOut }: SidebarProps) => {
  const { user } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;
  
  const sidebarItems = [
    {
      href: "/cms",
      title: "Dashboard",
      icon: <LayoutDashboard size={20} className="text-white" />,
      active: currentPath === "/cms"
    },
    {
      href: "/cms/pages",
      title: "Pages",
      icon: <FileText size={20} className="text-white" />,
      active: currentPath === "/cms/pages" || currentPath.includes("/cms/pages/")
    },
    {
      href: "/cms/media",
      title: "Media Library",
      icon: <Image size={20} className="text-white" />,
      active: currentPath === "/cms/media"
    },
    {
      href: "/cms/navigation",
      title: "Navigation",
      icon: <Menu size={20} className="text-white" />,
      active: currentPath === "/cms/navigation"
    },
    {
      href: "/cms/ribbon",
      title: "Announcement Ribbon",
      icon: <Megaphone size={20} className="text-white" />,
      active: currentPath === "/cms/ribbon"
    },
    {
      href: "/cms/settings",
      title: "Site Settings",
      icon: <Settings size={20} className="text-white" />,
      active: currentPath === "/cms/settings"
    }
  ];
  
  return (
    <aside className="w-64 bg-gradient-to-b from-[#800020] to-[#FF6200] fixed h-full shadow-md">
      <div className="p-4 flex items-center border-b border-white/10">
        <h2 className="text-xl font-bold flex items-center text-white">
          <span>Maxom.ai</span>
          <span className="ml-2 text-xs py-0.5 px-2 bg-orange-100 rounded text-orange-700 font-normal">Admin</span>
        </h2>
      </div>
      
      <div className="px-3 py-4">
        <p className="text-xs font-semibold text-white/80 uppercase tracking-wider pl-3 mb-2">CONTENT</p>
        <SidebarNav items={sidebarItems} className="flex-col space-y-1" />
      </div>
      
      <div className="absolute bottom-0 w-64 p-4 border-t border-white/10 bg-gradient-to-r from-[#800020] to-[#FF6200]">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold mr-2">
            {user?.email?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div className="text-sm overflow-hidden">
            <p className="font-medium truncate text-white">{user?.email || 'Admin User'}</p>
            <p className="text-white/80 text-xs">CMS Admin</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full flex items-center justify-center gap-2 border-white/20 bg-white/10 text-white hover:bg-white/20"
          onClick={onSignOut}
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </Button>
      </div>
    </aside>
  );
};
