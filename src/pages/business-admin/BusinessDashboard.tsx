
import { useAuth } from "@/context/AuthContext";
import { BusinessSidebar } from "@/components/BusinessDashboard/Sidebar";
import BusinessDashboard from "@/components/BusinessDashboard/Dashboard";

export default function BusinessAdminDashboard() {
  const { signOut } = useAuth();
  
  const handleSignOut = async () => {
    await signOut();
  };
  
  return (
    <div className="flex h-full min-h-screen">
      <BusinessSidebar onSignOut={handleSignOut} />
      
      <main className="flex-1 overflow-auto bg-gray-50">
        <BusinessDashboard />
      </main>
    </div>
  );
}
