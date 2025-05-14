
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Bell, BarChart3, ShieldCheck, MonitorSmartphone, FileCode, Archive, FileText, ImageIcon, Settings, Users, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from "@/context/AuthContext";
import { Card } from "@/components/ui/card";

// Define component types for different page sections
interface HeroSectionContent {
  badgeText: string;
  heading: string;
  subheading: string;
}

export default function PageEditor() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [pageTitle, setPageTitle] = useState("");
  const { user, signOut } = useAuth();
  
  // State for hero section content
  const [heroContent, setHeroContent] = useState<HeroSectionContent>({
    badgeText: "Introducing Voice AI",
    heading: "The Voice AI That Talks Like Your Team",
    subheading: "Automate calls, bookings, and customer support with voice AI that sounds natural and handles real conversations like a human."
  });

  const handleSignOut = async () => {
    await signOut();
  };

  useEffect(() => {
    // In a real implementation, we would fetch the content from Supabase
    // For now, we'll simulate loading and set default values based on the slug
    setTimeout(() => {
      if (slug === 'home-hero') {
        setPageTitle("Home Page - Hero Section");
        // Try to load existing content from localStorage if available
        const savedContent = localStorage.getItem('cms_hero_content');
        if (savedContent) {
          setHeroContent(JSON.parse(savedContent));
        }
      }
      setIsLoading(false);
    }, 800);
  }, [slug]);

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // For this first version, we'll directly update the HeroSection component content
      // In a full implementation, we would save to Supabase and load from there
      
      // Simulate a network request
      await new Promise(r => setTimeout(r, 1000));
      
      // Update content in localStorage so our HeroSection component can use it
      localStorage.setItem('cms_hero_content', JSON.stringify(heroContent));
      
      toast.success("Page content updated successfully!");
      
      // Navigate back to pages list
      navigate('/cms/pages');
    } catch (error) {
      console.error("Error saving page:", error);
      toast.error("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

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
        <div className="max-w-4xl mx-auto">
          <Button
            variant="outline"
            className="mb-4 text-maxom-violet"
            onClick={() => navigate('/cms/pages')}
          >
            <ArrowLeft size={16} className="mr-1" /> Back to Pages
          </Button>
          
          <Card className="p-6 mb-8 border shadow-sm">
            <h1 className="text-2xl font-bold mb-2">{pageTitle}</h1>
            <p className="text-muted-foreground mb-6">Edit the page content below</p>
            
            {isLoading ? (
              <div className="flex items-center justify-center h-32">
                <p>Loading page content...</p>
              </div>
            ) : slug === 'home-hero' ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="badgeText">Badge Text</Label>
                  <Input
                    id="badgeText"
                    value={heroContent.badgeText}
                    onChange={(e) => setHeroContent({...heroContent, badgeText: e.target.value})}
                    placeholder="Enter badge text"
                    className="max-w-md"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="heading">Heading</Label>
                  <Input
                    id="heading"
                    value={heroContent.heading}
                    onChange={(e) => setHeroContent({...heroContent, heading: e.target.value})}
                    placeholder="Enter heading text"
                  />
                  <p className="text-xs text-muted-foreground">
                    Use <code>{`<span class="gradient-text">text</span>`}</code> for gradient text
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subheading">Subheading</Label>
                  <Textarea
                    id="subheading"
                    value={heroContent.subheading}
                    onChange={(e) => setHeroContent({...heroContent, subheading: e.target.value})}
                    placeholder="Enter subheading text"
                    rows={3}
                  />
                </div>
                
                <div className="pt-4 border-t flex justify-end">
                  <Button 
                    onClick={handleSave} 
                    disabled={isSaving}
                    className="bg-maxom-violet hover:bg-maxom-violet/90"
                  >
                    {isSaving ? "Saving..." : (
                      <>
                        <Save size={16} className="mr-1" /> Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p>Editor for this page type is not yet implemented.</p>
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
}
