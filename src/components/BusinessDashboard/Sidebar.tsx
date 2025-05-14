
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { 
  LayoutDashboard, 
  FileText, 
  ChefHat,
  BarChart3,
  Users,
  Bot,
  CreditCard,
  User,
  Key,
  HelpCircle,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  onSignOut: () => Promise<void>;
}

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  active?: boolean;
}

const NavItem = ({ icon: Icon, label, to, active }: NavItemProps) => (
  <Link 
    to={to} 
    className={cn(
      "flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors text-white",
      active 
        ? "bg-white/20" 
        : "hover:bg-white/10"
    )}
  >
    <Icon size={18} />
    <span>{label}</span>
  </Link>
);

const NavSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-6">
    <h3 className="px-4 mb-1 text-xs font-semibold text-white/80 uppercase tracking-wider">
      {title}
    </h3>
    <div className="space-y-1">
      {children}
    </div>
  </div>
);

export const BusinessSidebar = ({ onSignOut }: SidebarProps) => {
  const { user } = useAuth();
  
  return (
    <aside className="w-60 bg-gradient-to-b from-[#800020] to-[#FF6200] h-full flex flex-col">
      <div className="p-4 border-b border-white/10">
        <h2 className="text-xl font-bold flex items-center text-white">
          <span>Maxom.ai</span>
          <span className="ml-2 text-xs py-0.5 px-2 bg-orange-100 rounded text-orange-700 font-normal">
            Business
          </span>
        </h2>
      </div>
      
      <div className="flex-1 py-4 overflow-y-auto">
        <NavSection title="Overview">
          <NavItem icon={LayoutDashboard} label="Dashboard" to="/" active />
          <NavItem icon={FileText} label="Logs" to="/logs" />
        </NavSection>
        
        <NavSection title="Business Tools">
          <NavItem icon={ChefHat} label="Orders" to="/orders" />
          <NavItem icon={BarChart3} label="Menu Editor" to="/menu" />
          <NavItem icon={BarChart3} label="Drive-Thru Metrics" to="/metrics" />
          <NavItem icon={Users} label="Customers" to="/customers" />
        </NavSection>
        
        <NavSection title="Account Settings">
          <NavItem icon={Bot} label="AI Assistants" to="/ai-assistants" />
          <NavItem icon={CreditCard} label="Billing" to="/billing" />
          <NavItem icon={User} label="Profile" to="/profile" />
          <NavItem icon={Key} label="API Keys" to="/api-keys" />
        </NavSection>
        
        <NavSection title="Support">
          <NavItem icon={HelpCircle} label="Help & Resources" to="/help" />
        </NavSection>
      </div>
      
      <div className="p-4 border-t border-white/10 mt-auto">
        <button 
          className="flex items-center gap-3 text-white hover:bg-white/10 w-full rounded-md px-4 py-2 text-sm font-medium transition-colors"
          onClick={onSignOut}
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
