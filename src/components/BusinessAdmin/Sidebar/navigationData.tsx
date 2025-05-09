import {
  LayoutDashboard,
  Phone,
  Headphones,
  FileText,
  Car,
  Calendar,
  CarFront,
  Hospital,
  Home,
  Dumbbell,
  Bell,
  FileText as Template,
  Network,
  CreditCard as BillingIcon,
  User,
  Key,
  BookOpen,
  Layers,
  Utensils,
  Users
} from "lucide-react";
import { NavItem, NavSection } from "./types";

// Main navigation sections
export const getMainNavSections = (): NavSection[] => {
  return [
    {
      title: "Business Tools",
      items: [
        {
          title: "Dashboard",
          href: "/business-admin",
          icon: LayoutDashboard,
        },
        {
          title: "AI Assistants",
          href: "/business-admin/voice-settings",
          icon: Headphones,
        },
        {
          title: "Knowledge Base",
          href: "/business-admin/analytics",
          icon: BookOpen,
        },
        {
          title: "Phone Numbers",
          href: "/business-admin/call-logs",
          icon: Phone,
        },
        {
          title: "Logs",
          href: "/business-admin/logs",
          icon: Layers,
          children: [
            {
              title: "Call Logs",
              href: "/business-admin/call-logs",
              icon: Phone,
            },
            {
              title: "Activity Logs",
              href: "/business-admin/activity-logs",
              icon: FileText,
            }
          ]
        },
        {
          title: "Campaign",
          href: "/business-admin/campaign",
          icon: Bell,
          children: [
            {
              title: "Email Campaigns",
              href: "/business-admin/email-campaigns",
              icon: Bell,
            },
            {
              title: "SMS Campaigns",
              href: "/business-admin/sms-campaigns",
              icon: Bell,
            }
          ]
        },
        {
          title: "Templates",
          href: "/business-admin/templates",
          icon: Template
        },
      ]
    },
    {
      title: "Account Settings",
      items: [
        {
          title: "RUTH® Connect",
          href: "/business-admin/ruth-connect",
          icon: Network
        },
        {
          title: "Billing",
          href: "/business-admin/billing",
          icon: BillingIcon,
        },
        {
          title: "Profile",
          href: "/business-admin/profile",
          icon: User,
        },
        {
          title: "API Keys",
          href: "/business-admin/api-keys",
          icon: Key,
        }
      ]
    }
  ];
};

// Restaurant-specific navigation items
export const restaurantNavItems: NavItem[] = [
  {
    title: "Orders",
    href: "/business-admin/orders",
    icon: FileText,
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
