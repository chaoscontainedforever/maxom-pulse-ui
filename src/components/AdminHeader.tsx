
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Menu, Search } from "lucide-react";

type AdminHeaderProps = {
  openSidebar: () => void;
};

const AdminHeader = ({ openSidebar }: AdminHeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={openSidebar}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="relative max-w-md hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              type="search" 
              placeholder="Search..." 
              className="pl-9 w-[300px]" 
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <div className="w-8 h-8 rounded-full bg-gradient-card1 flex items-center justify-center text-white">
            AD
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
