
import {
  Dumbbell,
  Calendar,
  Users,
  Car,
  CarFront,
  Hospital,
  Home,
  FileText
} from "lucide-react";
import { NavItem } from "../types";

// Business-specific navigation items for other business types
export const businessSpecificNavItems: NavItem[] = [
  // Fitness-specific items
  {
    title: "Classes",
    href: "/business-admin/classes",
    icon: Dumbbell,
    businessTypes: ["fitness"],
  },
  {
    title: "Appointments",
    href: "/business-admin/appointments",
    icon: Calendar,
    businessTypes: ["fitness", "healthcare"],
  },
  {
    title: "Customers",
    href: "/business-admin/customers",
    icon: Users,
    businessTypes: ["fitness", "healthcare", "homeservices"],
  },
  
  // Auto dealership-specific items
  {
    title: "Test Drives",
    href: "/business-admin/test-drives",
    icon: Car,
    businessTypes: ["auto"],
  },
  {
    title: "Service Reservations",
    href: "/business-admin/service",
    icon: CarFront,
    businessTypes: ["auto"],
  },
  {
    title: "Customers",
    href: "/business-admin/customers",
    icon: Users,
    businessTypes: ["auto"],
  },
  
  // Healthcare-specific items
  {
    title: "Patients",
    href: "/business-admin/patients",
    icon: Hospital,
    businessTypes: ["healthcare"],
  },
  
  // Home Services-specific items
  {
    title: "Jobs",
    href: "/business-admin/jobs",
    icon: Home,
    businessTypes: ["homeservices"],
  },
  {
    title: "Business Details",
    href: "/business-admin/business-details",
    icon: FileText,
    businessTypes: ["homeservices"],
  },
];
