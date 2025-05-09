
import {
  LayoutDashboard,
  Headphones,
  Phone,
  FileText,
  Bell,
  Network,
  CreditCard as BillingIcon,
  User,
  Key,
  BookOpen,
  Layers,
  FileText as Template
} from "lucide-react";
import { NavSection } from "../types";

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
