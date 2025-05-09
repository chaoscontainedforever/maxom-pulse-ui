
import {
  FileText,
  Utensils,
  CarFront,
  Users,
  List
} from "lucide-react";
import { NavItem } from "../types";

// Restaurant-specific navigation items
export const restaurantNavItems: NavItem[] = [
  {
    title: "Orders",
    href: "/business-admin/orders",
    icon: List,
    businessTypes: ["restaurant"],
  },
  {
    title: "Menu Editor",
    href: "/business-admin/menu",
    icon: Utensils,
    businessTypes: ["restaurant"],
  },
  {
    title: "Drive-Thru Metrics",
    href: "/business-admin/drive-thru",
    icon: CarFront,
    businessTypes: ["restaurant"],
  },
  {
    title: "Customers",
    href: "/business-admin/customers",
    icon: Users,
    businessTypes: ["restaurant"],
  },
];
