
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';

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
  
  // State for hero section content
  const [heroContent, setHeroContent] = useState<HeroSectionContent>({
    badgeText: "Introducing Voice AI",
    heading: "The Voice AI That Talks Like Your Team",
    subheading: "Automate calls, bookings, and customer support with voice AI that sounds natural and handles real conversations like a human."
  });

  useEffect(() => {
    // In a real implementation, we would fetch the content from Supabase
    // For now, we'll simulate loading and set default values based on the slug
    setTimeout(() => {
      if (slug === 'home-hero') {
        setPageTitle("Home Page - Hero Section");
        // We would normally fetch this from the database
        // Here we're just using the default state we already set
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
      {/* Sidebar - using the same styles as other CMS pages */}
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
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            className="mb-4 text-maxom-violet"
            onClick={() => navigate('/cms/pages')}
          >
            <ArrowLeft size={16} className="mr-1" /> Back to Pages
          </Button>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
            <h1 className="text-3xl font-bold mb-2">{pageTitle}</h1>
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
          </div>
        </div>
      </main>
    </div>
  );
}
