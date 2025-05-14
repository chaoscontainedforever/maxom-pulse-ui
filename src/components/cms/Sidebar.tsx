
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
      icon: <LayoutDashboard size={20} className="text-gray-700" />,
      active: currentPath === "/cms"
    },
    {
      href: "/cms/pages",
      title: "Pages",
      icon: <FileText size={20} className="text-gray-700" />,
      active: currentPath === "/cms/pages" || currentPath.includes("/cms/pages/")
    },
    {
      href: "/cms/media",
      title: "Media Library",
      icon: <Image size={20} className="text-gray-700" />,
      active: currentPath === "/cms/media"
    },
    {
      href: "/cms/navigation",
      title: "Navigation",
      icon: <Menu size={20} className="text-gray-700" />,
      active: currentPath === "/cms/navigation"
    },
    {
      href: "/cms/ribbon",
      title: "Announcement Ribbon",
      icon: <Megaphone size={20} className="text-gray-700" />,
      active: currentPath === "/cms/ribbon"
    },
    {
      href: "/cms/settings",
      title: "Site Settings",
      icon: <Settings size={20} className="text-gray-700" />,
      active: currentPath === "/cms/settings"
    }
  ];
  
  return (
    <aside className="w-64 bg-white fixed h-full shadow-sm border-r border-gray-200">
      <div className="p-4 flex items-center border-b border-gray-200">
        <h2 className="text-xl font-bold flex items-center text-gray-800">
          <span>Maxom.ai</span>
          <span className="ml-2 text-xs py-0.5 px-2 bg-orange-100 rounded text-orange-700 font-normal">Admin</span>
        </h2>
      </div>
      
      <div className="px-3 py-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider pl-3 mb-2">CONTENT</p>
        <SidebarNav items={sidebarItems} className="flex-col space-y-1" />
      </div>
      
      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold mr-2">
            {user?.email?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div className="text-sm overflow-hidden">
            <p className="font-medium truncate text-gray-800">{user?.email || 'Admin User'}</p>
            <p className="text-gray-500 text-xs">CMS Admin</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full flex items-center justify-center gap-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
          onClick={onSignOut}
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </Button>
      </div>
    </aside>
  );
};
