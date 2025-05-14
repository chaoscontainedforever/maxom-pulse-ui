
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

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
      {/* Sidebar - using the same styles as Dashboard */}
      <aside className="w-64 bg-maxom-violet text-white p-6 flex flex-col">
        <div className="mb-8">
          <h2 className="text-xl font-bold">CMS Admin</h2>
          <p className="text-sm text-gray-300 mt-1">Content Management System</p>
        </div>
        
        <nav className="space-y-1 flex-1">
          <a href="/cms" className="flex items-center gap-2 px-3 py-2 rounded text-white/80 hover:text-white hover:bg-maxom-violet/70">
            <span>Dashboard</span>
          </a>
          <a href="/cms/pages" className="flex items-center gap-2 px-3 py-2 bg-maxom-violet/70 rounded text-white">
            <span>Pages</span>
          </a>
          <a href="/cms/media" className="flex items-center gap-2 px-3 py-2 hover:bg-maxom-violet/70 rounded text-white/80 hover:text-white">
            <span>Media Library</span>
          </a>
          <a href="/cms/settings" className="flex items-center gap-2 px-3 py-2 hover:bg-maxom-violet/70 rounded text-white/80 hover:text-white">
            <span>Settings</span>
          </a>
        </nav>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 p-8 bg-gray-50 dark:bg-gray-900">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Website Pages</h1>
          <p className="text-muted-foreground">Edit and manage website content</p>
        </div>
        
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border rounded-lg p-4 bg-white dark:bg-gray-800">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-8 w-20" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pages.map((page) => (
              <div 
                key={page.id}
                className="border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm"
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
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
