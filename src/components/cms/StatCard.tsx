
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface StatCardProps {
  title: string;
  value: string;
  change: string;
  positive: boolean;
}

export const StatCard = ({ title, value, change, positive }: StatCardProps) => {
  return (
    <Card className="p-6 shadow-sm">
      <p className="text-sm text-muted-foreground font-medium">{title}</p>
      <p className="text-3xl font-bold mt-2 mb-1">{value}</p>
      <p className={cn(
        "text-xs flex items-center",
        positive ? "text-green-600" : "text-red-600"
      )}>
        {change}
      </p>
    </Card>
  );
};

export const StatCardGrid: React.FC<{ stats: StatCardProps[] }> = ({ stats }) => {
  return (
    <div className="grid gap-6 md:grid-cols-3 mb-8">
      {stats.map((stat, i) => (
        <StatCard key={i} {...stat} />
      ))}
    </div>
  );
};
