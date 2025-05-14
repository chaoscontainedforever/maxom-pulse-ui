
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  positive?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({ title, value, change, positive, icon, className }: StatCardProps) {
  return (
    <Card className={cn("p-6 shadow-sm", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2 mb-1">{value}</p>
          {change && (
            <p className={cn(
              "text-xs flex items-center",
              positive ? "text-green-600" : "text-red-600"
            )}>
              {change}
            </p>
          )}
        </div>
        {icon && (
          <div className="ml-auto text-gray-400">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}

export function StatCardGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {children}
    </div>
  );
}
