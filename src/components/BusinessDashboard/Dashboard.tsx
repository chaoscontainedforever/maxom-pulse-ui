
import { Search } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { 
  BarChart3,
  Calendar,
  Phone,
  ShoppingBag
} from "lucide-react";

interface StatCardProps {
  title: string;
  subtitle: string;
  value: string;
  secondaryValue?: string;
  secondaryLabel?: string;
  icon?: React.ReactNode;
}

const StatCard = ({ title, subtitle, value, secondaryValue, secondaryLabel, icon }: StatCardProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          <p className="text-xs text-gray-500">{subtitle}</p>
          <p className="text-3xl font-bold mt-3">{value}</p>
          <p className="text-sm text-gray-600">{secondaryLabel}</p>
        </div>
        <div className="ml-auto">
          {icon}
        </div>
      </div>
      {secondaryValue && (
        <div className="mt-2 text-right text-xl font-semibold text-green-600">
          {secondaryValue}
        </div>
      )}
    </Card>
  );
};

const ChartCard = ({ title, subtitle }: { title: string; subtitle: string }) => {
  // Mock chart data - in a real app, this would be a proper chart component
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <div className="text-xs text-gray-500">
          <BarChart3 className="h-5 w-5" />
        </div>
      </div>
      <div className="h-64 flex items-end space-x-2">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
          const height = [30, 45, 35, 65, 55, 25, 20][i];
          return (
            <div key={day} className="flex flex-col items-center flex-1">
              <div 
                className="w-full rounded-t-sm bg-gradient-to-t from-[#800020] to-[#FF6200]" 
                style={{ height: `${height}%` }}
              />
              <span className="text-xs mt-1 text-gray-500">{day}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

const RecentInteraction = () => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold">Recent Interactions</h3>
          <p className="text-sm text-gray-500">Recent customer calls and actions</p>
        </div>
        <div className="text-xs text-green-600 flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
          All handled by AI
        </div>
      </div>
      
      <div className="border-t pt-4">
        <div className="mb-4">
          <p className="font-medium">John Smith - (555) 123-4567</p>
          <p className="text-sm text-gray-600">Requested appointment for tomorrow @ 2:30 PM</p>
          <p className="text-xs text-green-600 mt-1">Today, 10:24 AM</p>
        </div>
      </div>
    </Card>
  );
};

export default function BusinessDashboard() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="text-gray-600">Here's an overview of your business's performance</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard 
          title="Call Activity" 
          subtitle="Last 7 days summary"
          value="105"
          secondaryValue="98"
          secondaryLabel="Total Calls"
          icon={<Phone className="h-5 w-5 text-gray-400" />}
        />
        
        <StatCard 
          title="Appointments" 
          subtitle="Upcoming schedule"
          value="42"
          secondaryValue="8"
          secondaryLabel="Total"
          icon={<Calendar className="h-5 w-5 text-gray-400" />}
        />
        
        <StatCard 
          title="Orders Summary" 
          subtitle="Last 7 days order summary"
          value="37"
          secondaryValue="$1,285.75"
          secondaryLabel="Total Orders"
          icon={<ShoppingBag className="h-5 w-5 text-gray-400" />}
        />
      </div>
      
      <div className="grid grid-cols-1 gap-6 mb-6">
        <ChartCard 
          title="Call Analytics" 
          subtitle="Calls received per day"
        />
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <RecentInteraction />
      </div>
    </div>
  );
}
