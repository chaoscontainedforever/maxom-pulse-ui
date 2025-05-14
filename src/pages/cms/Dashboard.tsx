
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function CMSDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Content Management</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link to="/cms/pages">
          <Button variant="outline" className="w-full h-32 flex flex-col gap-2">
            <span className="text-lg font-medium">Pages</span>
            <span className="text-sm text-muted-foreground">Manage website pages and content</span>
          </Button>
        </Link>
        
        <Link to="/cms/media">
          <Button variant="outline" className="w-full h-32 flex flex-col gap-2">
            <span className="text-lg font-medium">Media</span>
            <span className="text-sm text-muted-foreground">Upload and manage media files</span>
          </Button>
        </Link>
        
        <Link to="/cms/settings">
          <Button variant="outline" className="w-full h-32 flex flex-col gap-2">
            <span className="text-lg font-medium">Settings</span>
            <span className="text-sm text-muted-foreground">Configure site-wide settings</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
