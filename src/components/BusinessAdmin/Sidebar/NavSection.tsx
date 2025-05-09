
import { NavItem } from "./NavItem";
import { NavSection as NavSectionType } from "./types";

type NavSectionProps = {
  section: NavSectionType;
  isActive: (href: string) => boolean;
};

// Component for rendering a section of navigation items
export const NavSection = ({ section, isActive }: NavSectionProps) => {
  return (
    <div key={section.title} className="space-y-1">
      <h3 className="px-4 text-sm font-medium text-muted-foreground mb-2">{section.title}</h3>
      
      {section.items.map((item) => (
        <div key={item.title}>
          <NavItem item={item} isActive={isActive} />
        </div>
      ))}
    </div>
  );
};
