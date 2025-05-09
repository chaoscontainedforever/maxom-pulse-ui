
import {
  LayoutDashboard,
  FileText,
  Settings,
  CreditCard,
  UserRound,
  KeyRound,
  BotMessageSquare,
  ArrowUpRightFromCircle
} from "lucide-react";
import { NavSection } from "../types";

// Function to get the main navigation sections
export const getMainNavSections = (): NavSection[] => {
  return [
    {
      title: "Overview",
      items: [
        {
          title: "Dashboard",
          href: "/business-admin",
          icon: LayoutDashboard,
        },
        {
          title: "Logs",
          href: "/business-admin/logs",
          icon: FileText,
        }
      ]
    },
    // Business Tools section will have dynamic items added based on business type
    {
      title: "Business Tools",
      items: [
        // Empty initially - business specific items will be added dynamically
      ]
    },
    {
      title: "Account Settings",
      items: [
        {
          title: "AI Assistants",
          href: "/business-admin/ai-assistants",
          icon: BotMessageSquare,
        },
        {
          title: "Billing",
          href: "/business-admin/billing",
          icon: CreditCard,
        },
        {
          title: "Profile",
          href: "/business-admin/profile",
          icon: UserRound,
        },
        {
          title: "API Keys",
          href: "/business-admin/api-keys",
          icon: KeyRound,
        }
      ]
    },
    {
      title: "Support",
      items: [
        {
          title: "Help & Resources",
          href: "/business-admin/help",
          icon: ArrowUpRightFromCircle,
          external: true
        }
      ]
    }
  ];
};
