
import { Business, UserProfile, BusinessType, UserRole } from "@/types/schema";

// Generate a random date within the last 30 days
const generateRecentDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 30));
  return date.toISOString();
};

// Mock businesses data
export const mockBusinesses: Business[] = [
  {
    id: "b1",
    name: "Quantum Foods",
    business_type: "restaurant",
    address: "123 Main St, Austin, TX",
    phone: "(512) 555-1234",
    email: "info@quantumfoods.com",
    website: "quantumfoods.com",
    description: "High-end restaurant chain specializing in fusion cuisine",
    logo_url: "https://placehold.co/100x100?text=QF",
    created_at: generateRecentDate(),
    updated_at: generateRecentDate()
  },
  {
    id: "b2",
    name: "FlexFit Gym",
    business_type: "fitness",
    address: "456 Elm St, Portland, OR",
    phone: "(503) 555-6789",
    email: "contact@flexfitgym.com",
    website: "flexfitgym.com",
    description: "Modern fitness center with locations across the Pacific Northwest",
    logo_url: "https://placehold.co/100x100?text=FF",
    created_at: generateRecentDate(),
    updated_at: generateRecentDate()
  },
  {
    id: "b3",
    name: "Elite Motors",
    business_type: "auto_dealership",
    address: "789 Oak Dr, Miami, FL",
    phone: "(305) 555-4321",
    email: "sales@elitemotors.com",
    website: "elitemotors.com",
    description: "Luxury car dealership specializing in import vehicles",
    logo_url: "https://placehold.co/100x100?text=EM",
    created_at: generateRecentDate(),
    updated_at: generateRecentDate()
  },
  {
    id: "b4",
    name: "Wellness Medical Group",
    business_type: "healthcare",
    address: "321 Pine Ave, Chicago, IL",
    phone: "(312) 555-8765",
    email: "appointments@wellnessmedical.com",
    website: "wellnessmedical.com",
    description: "Family practice medical group with multiple specialties",
    logo_url: "https://placehold.co/100x100?text=WM",
    created_at: generateRecentDate(),
    updated_at: generateRecentDate()
  },
  {
    id: "b5",
    name: "ReadyFix Home Services",
    business_type: "home_services",
    address: "555 Cedar Ln, Denver, CO",
    phone: "(720) 555-3421",
    email: "service@readyfix.com",
    website: "readyfix.com",
    description: "On-demand plumbing and electrical repair services",
    logo_url: "https://placehold.co/100x100?text=RF",
    created_at: generateRecentDate(),
    updated_at: generateRecentDate()
  }
];

// Mock user profiles data
export const mockUserProfiles: UserProfile[] = [
  // Super admin
  {
    id: "u0",
    first_name: "Admin",
    last_name: "User",
    email: "admin@maxom.ai",
    role: "super_admin",
    created_at: generateRecentDate(),
    updated_at: generateRecentDate()
  },
  // Business owners
  {
    id: "u1",
    first_name: "John",
    last_name: "Smith",
    phone: "(512) 555-1235",
    email: "john@quantumfoods.com",
    avatar_url: "https://placehold.co/100x100?text=JS",
    role: "business_owner",
    business_id: "b1",
    created_at: generateRecentDate(),
    updated_at: generateRecentDate()
  },
  {
    id: "u2",
    first_name: "Sarah",
    last_name: "Jones",
    phone: "(503) 555-6790",
    email: "sarah@flexfitgym.com",
    avatar_url: "https://placehold.co/100x100?text=SJ",
    role: "business_owner",
    business_id: "b2",
    created_at: generateRecentDate(),
    updated_at: generateRecentDate()
  },
  {
    id: "u3",
    first_name: "Michael",
    last_name: "Rodriguez",
    phone: "(305) 555-4322",
    email: "michael@elitemotors.com",
    avatar_url: "https://placehold.co/100x100?text=MR",
    role: "business_owner",
    business_id: "b3",
    created_at: generateRecentDate(),
    updated_at: generateRecentDate()
  },
  {
    id: "u4",
    first_name: "Lisa",
    last_name: "Chen",
    phone: "(312) 555-8766",
    email: "lisa@wellnessmedical.com",
    avatar_url: "https://placehold.co/100x100?text=LC",
    role: "business_owner",
    business_id: "b4",
    created_at: generateRecentDate(),
    updated_at: generateRecentDate()
  },
  {
    id: "u5",
    first_name: "Robert",
    last_name: "Johnson",
    phone: "(720) 555-3422",
    email: "robert@readyfix.com",
    avatar_url: "https://placehold.co/100x100?text=RJ",
    role: "business_owner",
    business_id: "b5",
    created_at: generateRecentDate(),
    updated_at: generateRecentDate()
  },
  // Employees
  {
    id: "u6",
    first_name: "Emily",
    last_name: "Wilson",
    phone: "(512) 555-1236",
    email: "emily@quantumfoods.com",
    avatar_url: "https://placehold.co/100x100?text=EW",
    role: "employee",
    business_id: "b1",
    created_at: generateRecentDate(),
    updated_at: generateRecentDate()
  },
  {
    id: "u7",
    first_name: "David",
    last_name: "Brown",
    phone: "(503) 555-6791",
    email: "david@flexfitgym.com",
    avatar_url: "https://placehold.co/100x100?text=DB",
    role: "employee",
    business_id: "b2",
    created_at: generateRecentDate(),
    updated_at: generateRecentDate()
  },
  {
    id: "u8",
    first_name: "Jennifer",
    last_name: "Lopez",
    phone: "(305) 555-4323",
    email: "jennifer@elitemotors.com",
    avatar_url: "https://placehold.co/100x100?text=JL",
    role: "employee",
    business_id: "b3",
    created_at: generateRecentDate(),
    updated_at: generateRecentDate()
  },
  {
    id: "u9",
    first_name: "Andrew",
    last_name: "Kim",
    phone: "(312) 555-8767",
    email: "andrew@wellnessmedical.com",
    avatar_url: "https://placehold.co/100x100?text=AK",
    role: "employee",
    business_id: "b4",
    created_at: generateRecentDate(),
    updated_at: generateRecentDate()
  },
  {
    id: "u10",
    first_name: "Patricia",
    last_name: "Thompson",
    phone: "(720) 555-3423",
    email: "patricia@readyfix.com",
    avatar_url: "https://placehold.co/100x100?text=PT",
    role: "employee",
    business_id: "b5",
    created_at: generateRecentDate(),
    updated_at: generateRecentDate()
  }
];

// Helper function to get business by ID
export const getBusinessById = (id: string): Business | undefined => {
  return mockBusinesses.find(business => business.id === id);
};

// Helper function to get users by business ID
export const getUsersByBusinessId = (businessId: string): UserProfile[] => {
  return mockUserProfiles.filter(user => user.business_id === businessId);
};

// Helper function to get business type label
export const getBusinessTypeLabel = (type: BusinessType): string => {
  const labels: Record<BusinessType, string> = {
    'restaurant': 'Restaurant',
    'fitness': 'Fitness',
    'auto_dealership': 'Auto Dealership',
    'healthcare': 'Healthcare',
    'home_services': 'Home Services'
  };
  return labels[type] || type;
};

// Helper function to get role label
export const getRoleLabel = (role: UserRole): string => {
  const labels: Record<UserRole, string> = {
    'super_admin': 'Super Admin',
    'business_owner': 'Business Owner',
    'employee': 'Employee'
  };
  return labels[role] || role;
};
