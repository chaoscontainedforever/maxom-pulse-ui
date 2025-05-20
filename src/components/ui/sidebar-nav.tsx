
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    icon?: React.ReactNode;
    active?: boolean;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  return (
    <nav className={cn("flex space-y-1 lg:space-y-2", className)} {...props}>
      {items.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            item.active
              ? "bg-gradient-to-r from-maxom-violet to-maxom-orange/80 text-white border-l-2 border-maxom-violet"
              : "text-gray-700 hover:bg-gray-100"
          )}
        >
          {item.icon && <span className={cn("h-5 w-5", item.active ? "text-white" : "")}>{item.icon}</span>}
          <span>{item.title}</span>
        </Link>
      ))}
    </nav>
  );
}
