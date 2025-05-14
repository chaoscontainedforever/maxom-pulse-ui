
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
              ? "bg-gradient-to-r from-[#800020] to-[#FF6200] text-white"
              : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
          )}
        >
          {item.icon && <span className="h-4 w-4">{item.icon}</span>}
          <span>{item.title}</span>
        </Link>
      ))}
    </nav>
  );
}
