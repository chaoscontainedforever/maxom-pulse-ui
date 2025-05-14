
import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface UnifiedHeaderProps {
  title: string;
  subtitle?: string;
}

export function UnifiedHeader({ title, subtitle }: UnifiedHeaderProps) {
  const { user } = useAuth();

  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-9 w-[250px] md:w-[300px]" />
        </div>
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1.5 h-2 w-2 rounded-full bg-red-600"></span>
        </Button>
        
        <div className="flex items-center">
          <Link to="/cms/profile" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-[#800020] flex items-center justify-center text-white">
              {user?.email?.charAt(0).toUpperCase() || 'A'}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
