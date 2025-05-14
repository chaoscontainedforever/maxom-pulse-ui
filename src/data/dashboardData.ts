
import { StatCardProps } from "@/components/cms/StatCard";
import { CustomerData } from "@/components/cms/CustomerTable";

export const statsCards: StatCardProps[] = [
  {
    title: "Total Customers",
    value: "247",
    change: "+12 this month",
    positive: true
  },
  {
    title: "Active Users",
    value: "1,382",
    change: "+78 this month",
    positive: true
  },
  {
    title: "Voice Minutes Used",
    value: "32,847",
    change: "+3,254 this month",
    positive: true
  }
];

export const customerData: CustomerData[] = [
  {
    business: "Quantum Foods",
    email: "info@quantumfoods.com",
    type: "Restaurant",
    owner: "John Smith",
    users: 2,
    created: "4/15/2025"
  },
  {
    business: "FlexFit Gym",
    email: "contact@flexfitgym.com",
    type: "Fitness",
    owner: "Sarah Jones",
    users: 2,
    created: "4/18/2025"
  },
  {
    business: "Elite Motors",
    email: "sales@elitemotors.com",
    type: "Auto Dealership",
    owner: "Michael Rodriguez",
    users: 2,
    created: "4/20/2025"
  },
  {
    business: "Wellness Medical Group",
    email: "appointments@wellnessmedical.com",
    type: "Healthcare",
    owner: "Lisa Chen",
    users: 2,
    created: "5/8/2025"
  },
  {
    business: "ReadyFix Home Services",
    email: "service@readyfix.com",
    type: "Home Services",
    owner: "Robert Johnson",
    users: 2,
    created: "4/21/2025"
  }
];
