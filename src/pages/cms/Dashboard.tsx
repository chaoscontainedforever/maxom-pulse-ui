
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LucideLayoutDashboard, LucidePage, LucideImage, LucideSettings, LucideUsers } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function CMSDashboard() {
  const { user, signOut } = useAuth();
  
  const handleSignOut = async () => {
    await signOut();
  };
  
  return (
    <div className="flex h-full min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 text-white p-6 flex flex-col">
        <div className="mb-8">
          <h2 className="text-xl font-bold">CMS Admin</h2>
          <p className="text-sm text-gray-400 mt-1">Content Management System</p>
        </div>
        
        <nav className="space-y-1 flex-1">
          <Link to="/cms" className="flex items-center gap-2 px-3 py-2 bg-slate-700 rounded text-white">
            <LucideLayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>
          <Link to="/cms/pages" className="flex items-center gap-2 px-3 py-2 hover:bg-slate-700 rounded text-white/80 hover:text-white">
            <LucidePage size={18} />
            <span>Pages</span>
          </Link>
          <Link to="/cms/media" className="flex items-center gap-2 px-3 py-2 hover:bg-slate-700 rounded text-white/80 hover:text-white">
            <LucideImage size={18} />
            <span>Media Library</span>
          </Link>
          <Link to="/cms/users" className="flex items-center gap-2 px-3 py-2 hover:bg-slate-700 rounded text-white/80 hover:text-white">
            <LucideUsers size={18} />
            <span>Users</span>
          </Link>
          <Link to="/cms/settings" className="flex items-center gap-2 px-3 py-2 hover:bg-slate-700 rounded text-white/80 hover:text-white">
            <LucideSettings size={18} />
            <span>Settings</span>
          </Link>
        </nav>
        
        <div className="mt-auto pt-4 border-t border-slate-700">
          <div className="text-sm mb-2">
            <p className="text-gray-400">Logged in as:</p>
            <p className="font-medium">{user?.email}</p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full bg-slate-700 hover:bg-slate-600 border-slate-600"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </div>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Content Management</h1>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Link to="/cms/pages">
            <Button variant="outline" className="w-full h-32 flex flex-col gap-2">
              <LucidePage size={24} className="text-blue-500" />
              <span className="text-lg font-medium">Pages</span>
              <span className="text-sm text-muted-foreground">Manage website pages and content</span>
            </Button>
          </Link>
          
          <Link to="/cms/media">
            <Button variant="outline" className="w-full h-32 flex flex-col gap-2">
              <LucideImage size={24} className="text-green-500" />
              <span className="text-lg font-medium">Media</span>
              <span className="text-sm text-muted-foreground">Upload and manage media files</span>
            </Button>
          </Link>
          
          <Link to="/cms/settings">
            <Button variant="outline" className="w-full h-32 flex flex-col gap-2">
              <LucideSettings size={24} className="text-amber-500" />
              <span className="text-lg font-medium">Settings</span>
              <span className="text-sm text-muted-foreground">Configure site-wide settings</span>
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
