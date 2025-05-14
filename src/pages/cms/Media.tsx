
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Image, FileText, FileVideo, File, Upload } from "lucide-react";

// Mock data for media files
const mockMedia = [
  { id: '1', fileName: 'hero-image.jpg', type: 'image', url: '/placeholder.svg', createdAt: '2025-05-10' },
  { id: '2', fileName: 'team.jpg', type: 'image', url: '/placeholder.svg', createdAt: '2025-05-08' },
  { id: '3', fileName: 'product-demo.mp4', type: 'video', url: '/placeholder.svg', createdAt: '2025-05-05' },
  { id: '4', fileName: 'brochure.pdf', type: 'document', url: '/placeholder.svg', createdAt: '2025-05-01' },
  { id: '5', fileName: 'background.jpg', type: 'image', url: '/placeholder.svg', createdAt: '2025-04-28' },
  { id: '6', fileName: 'testimonial.jpg', type: 'image', url: '/placeholder.svg', createdAt: '2025-04-25' },
];

export default function CMSMedia() {
  const [media, setMedia] = useState(mockMedia);
  const [activeTab, setActiveTab] = useState('all');
  const [uploading, setUploading] = useState(false);

  const filteredMedia = activeTab === 'all' 
    ? media 
    : media.filter(item => item.type === activeTab);

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      toast.success("Files uploaded successfully");
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold">Media Library</h2>
          <p className="text-muted-foreground">Manage your images, videos, and documents</p>
        </div>
        
        <Card className="w-full md:w-auto p-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Input type="file" multiple className="w-full sm:w-auto" />
            <Button onClick={handleUpload} disabled={uploading}>
              {uploading ? (
                <>Uploading...</>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" /> Upload
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
      
      <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Files</TabsTrigger>
          <TabsTrigger value="image">Images</TabsTrigger>
          <TabsTrigger value="video">Videos</TabsTrigger>
          <TabsTrigger value="document">Documents</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredMedia.map(item => (
          <MediaItem key={item.id} media={item} />
        ))}
      </div>
    </div>
  );
}

interface MediaItemProps {
  media: {
    id: string;
    fileName: string;
    type: string;
    url: string;
    createdAt: string;
  };
}

function MediaItem({ media }: MediaItemProps) {
  const getIcon = () => {
    switch(media.type) {
      case 'image':
        return <Image className="h-5 w-5" />;
      case 'video':
        return <FileVideo className="h-5 w-5" />;
      case 'document':
        return <FileText className="h-5 w-5" />;
      default:
        return <File className="h-5 w-5" />;
    }
  };
  
  return (
    <div className="border rounded-md overflow-hidden group relative">
      <div className="aspect-square bg-gray-100 flex items-center justify-center">
        {media.type === 'image' ? (
          <img src={media.url} alt={media.fileName} className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            {getIcon()}
            <span className="text-xs text-gray-500 mt-2">{media.fileName.split('.').pop()}</span>
          </div>
        )}
      </div>
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
        <Button variant="outline" size="sm" className="text-white border-white">
          Select
        </Button>
      </div>
      <div className="p-2">
        <p className="text-sm font-medium truncate">{media.fileName}</p>
        <p className="text-xs text-muted-foreground">{media.createdAt}</p>
      </div>
    </div>
  );
}
