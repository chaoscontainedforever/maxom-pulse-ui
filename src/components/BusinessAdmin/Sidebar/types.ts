
import { ReactNode } from "react";

export type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
  businessTypes?: string[];
  children?: NavItem[];
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

export type CollapsibleSectionProps = {
  title: string;
  items: NavItem[];
  isExpanded: boolean;
  toggleSection: (section: string) => void;
  isActive: (href: string) => boolean;
};

export type NavItemProps = {
  item: NavItem;
  isActive: (href: string) => boolean;
};

export type BusinessAdminSidebarProps = {
  isOpen: boolean;
  closeSidebar: () => void;
};
