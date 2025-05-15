
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, Save, ImageIcon, FileImage, Layout, Type, 
  Link as LinkIcon, Youtube
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from "@/context/AuthContext";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Define component types for different page sections
interface HeroSectionContent {
  badgeText: string;
  heading: string;
  subheading: string;
  backgroundImage?: string;
}

interface FeatureSectionContent {
  title: string;
  description: string;
  features: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
}

interface TestimonialSectionContent {
  title: string;
  testimonials: Array<{
    name: string;
    role: string;
    company: string;
    quote: string;
    avatar?: string;
  }>;
}

export default function PageEditor() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [pageTitle, setPageTitle] = useState("");
  const [activeTab, setActiveTab] = useState("content");
  const { user, signOut } = useAuth();
  
  // State for hero section content
  const [heroContent, setHeroContent] = useState<HeroSectionContent>({
    badgeText: "Introducing Voice AI",
    heading: "The Voice AI That Talks Like Your Team",
    subheading: "Automate calls, bookings, and customer support with voice AI that sounds natural and handles real conversations like a human."
  });

  // State for features section content
  const [featureContent, setFeatureContent] = useState<FeatureSectionContent>({
    title: "Features",
    description: "Our platform offers a range of powerful features to help your business succeed.",
    features: [
      {
        title: "Natural Voice",
        description: "AI voice that sounds completely natural and human-like",
        icon: "voice"
      },
      {
        title: "Smart Responses",
        description: "Handles complex conversations with context awareness",
        icon: "brain"
      },
      {
        title: "Easy Integration",
        description: "Integrates with your existing systems in minutes",
        icon: "integration"
      }
    ]
  });

  // State for testimonials section content
  const [testimonialContent, setTestimonialContent] = useState<TestimonialSectionContent>({
    title: "What Our Customers Say",
    testimonials: [
      {
        name: "Jane Smith",
        role: "CEO",
        company: "TechCorp",
        quote: "This voice AI has transformed our customer service experience.",
        avatar: ""
      },
      {
        name: "John Doe",
        role: "Operations Director",
        company: "Global Solutions",
        quote: "We've seen a 40% increase in customer satisfaction since implementing this solution.",
        avatar: ""
      }
    ]
  });

  const handleSignOut = async () => {
    await signOut();
  };

  useEffect(() => {
    // In a real implementation, we would fetch the content from Supabase
    // For now, we'll simulate loading and set default values based on the slug
    setTimeout(() => {
      if (slug) {
        if (slug === 'home-hero') {
          setPageTitle("Home Page - Hero Section");
          // Try to load existing content from localStorage if available
          const savedContent = localStorage.getItem('cms_hero_content');
          if (savedContent) {
            setHeroContent(JSON.parse(savedContent));
          }
        } else if (slug === 'features') {
          setPageTitle("Features Section");
          const savedContent = localStorage.getItem('cms_features_content');
          if (savedContent) {
            setFeatureContent(JSON.parse(savedContent));
          }
        } else if (slug === 'testimonials') {
          setPageTitle("Testimonials Section");
          const savedContent = localStorage.getItem('cms_testimonials_content');
          if (savedContent) {
            setTestimonialContent(JSON.parse(savedContent));
          }
        } else {
          setPageTitle(slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()));
        }
      }
      setIsLoading(false);
    }, 800);
  }, [slug]);

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // For this first version, we'll directly update component content via localStorage
      // In a full implementation, we would save to Supabase and load from there
      
      // Simulate a network request
      await new Promise(r => setTimeout(r, 1000));
      
      // Update content in localStorage based on section type
      if (slug === 'home-hero') {
        localStorage.setItem('cms_hero_content', JSON.stringify(heroContent));
      } else if (slug === 'features') {
        localStorage.setItem('cms_features_content', JSON.stringify(featureContent));
      } else if (slug === 'testimonials') {
        localStorage.setItem('cms_testimonials_content', JSON.stringify(testimonialContent));
      }
      
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

  // Render editor based on section type
  const renderSectionEditor = () => {
    if (slug === 'home-hero') {
      return (
        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="content">
                <Type className="mr-1 h-4 w-4" /> Content
              </TabsTrigger>
              <TabsTrigger value="layout">
                <Layout className="mr-1 h-4 w-4" /> Layout
              </TabsTrigger>
              <TabsTrigger value="media">
                <FileImage className="mr-1 h-4 w-4" /> Media
              </TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-6">
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
            </TabsContent>

            <TabsContent value="media" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="backgroundImage">Background Image</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="backgroundImage"
                    value={heroContent.backgroundImage || ''}
                    onChange={(e) => setHeroContent({...heroContent, backgroundImage: e.target.value})}
                    placeholder="Enter image URL or select from media library"
                  />
                  <Button type="button" variant="outline" size="icon">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </div>
                
                {heroContent.backgroundImage && (
                  <div className="border rounded-md p-2 mt-2">
                    <AspectRatio ratio={16/9}>
                      <img
                        src={heroContent.backgroundImage}
                        alt="Background preview"
                        className="rounded object-cover w-full h-full"
                      />
                    </AspectRatio>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="layout" className="space-y-4">
              <p className="text-sm text-muted-foreground">Layout options will be available in the next update.</p>
            </TabsContent>
          </Tabs>
        </div>
      );
    } else if (slug === 'features') {
      return (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="featureTitle">Section Title</Label>
            <Input
              id="featureTitle"
              value={featureContent.title}
              onChange={(e) => setFeatureContent({...featureContent, title: e.target.value})}
              placeholder="Enter section title"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="featureDescription">Section Description</Label>
            <Textarea
              id="featureDescription"
              value={featureContent.description}
              onChange={(e) => setFeatureContent({...featureContent, description: e.target.value})}
              placeholder="Enter section description"
              rows={2}
            />
          </div>
          
          <div className="space-y-3">
            <Label>Features</Label>
            {featureContent.features.map((feature, index) => (
              <Card key={index} className="p-4">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label htmlFor={`featureTitle-${index}`}>Title</Label>
                    <Input
                      id={`featureTitle-${index}`}
                      value={feature.title}
                      onChange={(e) => {
                        const updatedFeatures = [...featureContent.features];
                        updatedFeatures[index].title = e.target.value;
                        setFeatureContent({...featureContent, features: updatedFeatures});
                      }}
                      placeholder="Feature title"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor={`featureDesc-${index}`}>Description</Label>
                    <Textarea
                      id={`featureDesc-${index}`}
                      value={feature.description}
                      onChange={(e) => {
                        const updatedFeatures = [...featureContent.features];
                        updatedFeatures[index].description = e.target.value;
                        setFeatureContent({...featureContent, features: updatedFeatures});
                      }}
                      placeholder="Feature description"
                      rows={2}
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor={`featureIcon-${index}`}>Icon</Label>
                    <Input
                      id={`featureIcon-${index}`}
                      value={feature.icon || ''}
                      onChange={(e) => {
                        const updatedFeatures = [...featureContent.features];
                        updatedFeatures[index].icon = e.target.value;
                        setFeatureContent({...featureContent, features: updatedFeatures});
                      }}
                      placeholder="Icon name"
                    />
                  </div>
                </div>
              </Card>
            ))}
            
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                setFeatureContent({
                  ...featureContent, 
                  features: [...featureContent.features, {
                    title: '', 
                    description: '',
                    icon: ''
                  }]
                });
              }}
            >
              Add Feature
            </Button>
          </div>
        </div>
      );
    } else if (slug === 'testimonials') {
      return (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="testimonialTitle">Section Title</Label>
            <Input
              id="testimonialTitle"
              value={testimonialContent.title}
              onChange={(e) => setTestimonialContent({...testimonialContent, title: e.target.value})}
              placeholder="Enter section title"
            />
          </div>
          
          <div className="space-y-3">
            <Label>Testimonials</Label>
            {testimonialContent.testimonials.map((testimonial, index) => (
              <Card key={index} className="p-4">
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor={`testimonialName-${index}`}>Name</Label>
                      <Input
                        id={`testimonialName-${index}`}
                        value={testimonial.name}
                        onChange={(e) => {
                          const updated = [...testimonialContent.testimonials];
                          updated[index].name = e.target.value;
                          setTestimonialContent({...testimonialContent, testimonials: updated});
                        }}
                        placeholder="Person's name"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <Label htmlFor={`testimonialRole-${index}`}>Role</Label>
                      <Input
                        id={`testimonialRole-${index}`}
                        value={testimonial.role}
                        onChange={(e) => {
                          const updated = [...testimonialContent.testimonials];
                          updated[index].role = e.target.value;
                          setTestimonialContent({...testimonialContent, testimonials: updated});
                        }}
                        placeholder="Job title"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor={`testimonialCompany-${index}`}>Company</Label>
                    <Input
                      id={`testimonialCompany-${index}`}
                      value={testimonial.company}
                      onChange={(e) => {
                        const updated = [...testimonialContent.testimonials];
                        updated[index].company = e.target.value;
                        setTestimonialContent({...testimonialContent, testimonials: updated});
                      }}
                      placeholder="Company name"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor={`testimonialQuote-${index}`}>Quote</Label>
                    <Textarea
                      id={`testimonialQuote-${index}`}
                      value={testimonial.quote}
                      onChange={(e) => {
                        const updated = [...testimonialContent.testimonials];
                        updated[index].quote = e.target.value;
                        setTestimonialContent({...testimonialContent, testimonials: updated});
                      }}
                      placeholder="Testimonial quote"
                      rows={2}
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor={`testimonialAvatar-${index}`}>Avatar Image</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id={`testimonialAvatar-${index}`}
                        value={testimonial.avatar || ''}
                        onChange={(e) => {
                          const updated = [...testimonialContent.testimonials];
                          updated[index].avatar = e.target.value;
                          setTestimonialContent({...testimonialContent, testimonials: updated});
                        }}
                        placeholder="Avatar URL"
                      />
                      <Button type="button" variant="outline" size="icon">
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                setTestimonialContent({
                  ...testimonialContent, 
                  testimonials: [...testimonialContent.testimonials, {
                    name: '', 
                    role: '',
                    company: '',
                    quote: '',
                    avatar: ''
                  }]
                });
              }}
            >
              Add Testimonial
            </Button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="text-center py-8">
          <p>Editor for this section type is not yet implemented.</p>
          <p className="text-sm text-muted-foreground mt-2">Please check back soon for updates.</p>
        </div>
      );
    }
  };

  return (
    <div className="flex h-full min-h-screen">
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
            ) : renderSectionEditor()}
            
            <div className="pt-4 border-t flex justify-end mt-6">
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
          </Card>
        </div>
      </main>
    </div>
  );
}
