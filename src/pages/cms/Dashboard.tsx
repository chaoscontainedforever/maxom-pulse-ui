
import { FileText, Image, Menu, Megaphone } from "lucide-react";
import { StatCard, StatCardGrid } from "@/components/cms/dashboard/stat-card";
import { Card } from "@/components/ui/card";

export default function CMSDashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Stats Cards */}
      <StatCardGrid>
        <StatCard 
          title="Total Pages" 
          value="24" 
          change="+2 this month" 
          positive={true}
          icon={<FileText size={24} />} 
        />
        <StatCard 
          title="Media Files" 
          value="156" 
          change="+14 this month" 
          positive={true}
          icon={<Image size={24} />} 
        />
        <StatCard 
          title="Navigation Items" 
          value="12" 
          change="Last updated 3 days ago" 
          icon={<Menu size={24} />} 
        />
      </StatCardGrid>

      {/* Quick Actions */}
      <Card className="p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickActionCard 
            title="Create New Page" 
            description="Add a new page to your website" 
            link="/cms/pages/new" 
          />
          <QuickActionCard 
            title="Upload Media" 
            description="Add images, videos or documents" 
            link="/cms/media" 
          />
          <QuickActionCard 
            title="Edit Announcement" 
            description="Update your site's ribbon message" 
            link="/cms/ribbon" 
          />
        </div>
      </Card>
      
      {/* Recent Activity */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <ActivityItem 
            action="Updated page" 
            target="Home" 
            time="2 hours ago" 
            user="admin@example.com" 
          />
          <ActivityItem 
            action="Uploaded new image" 
            target="hero-banner.jpg" 
            time="Yesterday" 
            user="admin@example.com" 
          />
          <ActivityItem 
            action="Modified navigation" 
            target="Added 'Blog' link" 
            time="3 days ago" 
            user="admin@example.com" 
          />
        </div>
      </Card>
    </div>
  );
}

interface QuickActionCardProps {
  title: string;
  description: string;
  link: string;
}

function QuickActionCard({ title, description, link }: QuickActionCardProps) {
  return (
    <a 
      href={link} 
      className="block p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
    >
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </a>
  );
}

interface ActivityItemProps {
  action: string;
  target: string;
  time: string;
  user: string;
}

function ActivityItem({ action, target, time, user }: ActivityItemProps) {
  return (
    <div className="flex items-start border-b pb-3 last:border-0 last:pb-0">
      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 mr-3">
        {user.charAt(0).toUpperCase()}
      </div>
      <div className="flex-1">
        <p className="text-sm">
          <span className="font-medium">{action}</span>: {target}
        </p>
        <p className="text-xs text-muted-foreground">{time} by {user}</p>
      </div>
    </div>
  );
}
