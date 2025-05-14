
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Pencil, Bell, BarChart3, ShieldCheck, MonitorSmartphone, FileCode, Archive, FileText, ImageIcon, Settings, Users, LayoutDashboard } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";

interface Page {
  id: string;
  title: string;
  slug: string;
  last_updated: string;
}

export default function CMSPages() {
  const [pages, setPages] = useState<Page[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  useEffect(() => {
    // For this initial version, we'll create mock pages that represent 
    // the main sections of our website that can be edited
    const mockPages = [
      { 
        id: "1", 
        title: "Home Page - Hero Section", 
        slug: "home-hero", 
        last_updated: new Date().toISOString() 
      },
      { 
        id: "2", 
        title: "Home Page - Features Section", 
        slug: "home-features", 
        last_updated: new Date().toISOString() 
      },
      { 
        id: "3", 
        title: "Home Page - Testimonials", 
        slug: "home-testimonials", 
        last_updated: new Date().toISOString() 
      },
      { 
        id: "4", 
        title: "About Page", 
        slug: "about", 
        last_updated: new Date().toISOString() 
      }
    ];
    
    // In the future, this would be replaced with a Supabase fetch
    setTimeout(() => {
      setPages(mockPages);
      setIsLoading(false);
    }, 800);
  }, []);

  return (
    <div className="flex h-full min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-maxom-violet to-[#4B0082] text-white p-6 flex flex-col">
        <div className="mb-8">
          <h2 className="text-xl font-bold flex items-center">
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">Maxom.ai</span>
            <span className="ml-2 text-xs py-0.5 px-2 bg-maxom-orange/90 rounded text-white font-normal">Admin</span>
          </h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">Application</p>
            <nav className="space-y-1">
              <Link to="/cms" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10 text-white/80 hover:text-white">
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </Link>
              <Link to="/cms/pages" className="flex items-center gap-2 px-3 py-2 rounded-md bg-white/10 text-white">
                <FileText size={18} />
                <span>Pages</span>
              </Link>
              <Link to="/cms/media" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10 text-white/80 hover:text-white">
                <ImageIcon size={18} />
                <span>Media Library</span>
              </Link>
              <Link to="/cms/users" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10 text-white/80 hover:text-white">
                <Users size={18} />
                <span>Users</span>
              </Link>
            </nav>
          </div>
          
          <div>
            <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">Platform</p>
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
          </div>
          
          <div>
            <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">Security</p>
            <nav className="space-y-1">
              <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10 text-white/80 hover:text-white">
                <ShieldCheck size={18} />
                <span>Permissions</span>
              </a>
            </nav>
          </div>
          
          <div>
            <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">SRE</p>
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
        </div>
        
        <div className="mt-auto pt-4 border-t border-white/20">
          <div className="mb-2 flex items-center">
            <div className="w-8 h-8 rounded-full bg-purple-300 flex items-center justify-center text-maxom-violet font-semibold mr-2">
              {user?.email?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="text-sm overflow-hidden">
              <p className="font-medium truncate">{user?.email}</p>
              <p className="text-white/60 text-xs">Super Admin Access</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full bg-white/10 hover:bg-white/20 border-white/20 text-white"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </div>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 p-8 bg-gray-50 dark:bg-gray-900">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Website Pages</h1>
          <p className="text-muted-foreground">Edit and manage website content</p>
        </div>
        
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-8 w-20" />
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pages.map((page) => (
              <Card 
                key={page.id}
                className="p-4 border shadow-sm"
              >
                <h3 className="font-medium text-lg mb-1">{page.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">/{page.slug}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    Updated: {new Date(page.last_updated).toLocaleDateString()}
                  </span>
                  <Button 
                    size="sm" 
                    className="bg-maxom-violet hover:bg-maxom-violet/90"
                    onClick={() => navigate(`/cms/pages/edit/${page.slug}`)}
                  >
                    <Pencil size={16} className="mr-1" /> Edit
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
