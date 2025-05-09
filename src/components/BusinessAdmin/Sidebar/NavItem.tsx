import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { NavItemProps } from "./types";

// Component for rendering a single navigation item
export const NavItem = ({ item, isActive }: NavItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // If the item has children, render it as a collapsible section
  if (item.children) {
    return (
      <div key={item.title}>
        <Collapsible
          open={isExpanded}
          onOpenChange={setIsExpanded}
          className="w-full"
        >
          <CollapsibleTrigger asChild>
            <button
              className={cn(
                "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive(item.href) 
                  ? "bg-gradient-to-r from-maxom-violet to-maxom-orange text-white"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </div>
              <ChevronDown 
                className={cn(
                  "h-4 w-4 transition-transform", 
                  isExpanded ? "transform rotate-180" : ""
                )}
              />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-9 space-y-1 pt-1">
            {item.children.map((child) => (
              <Link
                key={child.href}
                to={child.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive(child.href)
                    ? "bg-gradient-to-r from-maxom-violet to-maxom-orange text-white"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                )}
              >
                <span>{child.title}</span>
              </Link>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  }

  // Otherwise, render it as a simple link
  return (
    <Link
      to={item.href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        isActive(item.href)
          ? "bg-gradient-to-r from-maxom-violet to-maxom-orange text-white"
          : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
      )}
    >
      <item.icon className="h-5 w-5" />
      <span>{item.title}</span>
    </Link>
  );
};
