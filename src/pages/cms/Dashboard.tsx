
import { Search } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { CMSSidebar } from "@/components/cms/Sidebar";
import { StatCardGrid } from "@/components/cms/StatCard";
import { CustomerTable } from "@/components/cms/CustomerTable";
import { statsCards, customerData } from "@/data/dashboardData";

export default function CMSDashboard() {
  const { signOut } = useAuth();
  
  const handleSignOut = async () => {
    await signOut();
  };
  
  return (
    <div className="flex h-full min-h-screen">
      <CMSSidebar onSignOut={handleSignOut} />
      
      {/* Main content */}
      <main className="flex-1 ml-64 p-8 bg-gray-50 dark:bg-gray-900 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Super Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage all customers and system settings</p>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-9 w-[300px]" />
            </div>
          </div>
          
          {/* Stats */}
          <StatCardGrid stats={statsCards} />
          
          {/* Content Management Section */}
          <div className="mb-6">
            <CustomerTable customers={customerData} />
          </div>
        </div>
      </main>
    </div>
  );
}
