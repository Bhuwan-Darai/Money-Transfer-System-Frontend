import type {
  Company,
  DashboardStats,
  Permission,
  Plan,
  Role,
} from "@/types/types";

export const mockCompanies: Company[] = [
  {
    id: "comp_1",
    name: "Acme Corporation",
    email: "contact@acme.com",
    status: "active",
    planId: "plan_2",
    employeeCount: 45,
    createdAt: "2024-01-15",
  },
  {
    id: "comp_2",
    name: "TechStart Inc",
    email: "hello@techstart.io",
    status: "active",
    planId: "plan_3",
    employeeCount: 120,
    createdAt: "2024-02-20",
  },
  {
    id: "comp_3",
    name: "Global Solutions",
    email: "info@globalsol.com",
    status: "active",
    planId: "plan_1",
    employeeCount: 12,
    createdAt: "2024-03-10",
  },
  {
    id: "comp_4",
    name: "Innovation Labs",
    email: "team@innolabs.co",
    status: "inactive",
    planId: "plan_2",
    employeeCount: 28,
    createdAt: "2024-04-05",
  },
  {
    id: "comp_5",
    name: "Digital Dynamics",
    email: "contact@digidyn.com",
    status: "active",
    planId: "plan_3",
    employeeCount: 85,
    createdAt: "2024-05-01",
  },
];

export const mockPlans: Plan[] = [
  {
    id: "plan_1",
    name: "Starter",
    price: 29,
    billingCycle: "monthly",
    maxUsers: 5,
    storageGB: 10,
    features: ["Basic Analytics", "Email Support", "5 Projects", "API Access"],
  },
  {
    id: "plan_2",
    name: "Professional",
    price: 79,
    billingCycle: "monthly",
    maxUsers: 25,
    storageGB: 50,
    features: [
      "Advanced Analytics",
      "Priority Support",
      "Unlimited Projects",
      "API Access",
      "Custom Integrations",
      "Team Collaboration",
    ],
    isPopular: true,
  },
  {
    id: "plan_3",
    name: "Enterprise",
    price: 199,
    billingCycle: "monthly",
    maxUsers: 100,
    storageGB: 500,
    features: [
      "Full Analytics Suite",
      "24/7 Support",
      "Unlimited Everything",
      "Dedicated Account Manager",
      "Custom Development",
      "SLA Guarantee",
      "SSO & SAML",
    ],
  },
];

// export const mockUsers: User[] = [
//   {
//     id: 'user_1',
//     email: 'john@acme.com',
//     name: 'John Smith',
//     role: 'client',
//     companyId: '',
//     status: 'active',
//     createdAt: '2024-01-15',
//   },
//   {
//     id: 'user_2',
//     email: 'jane@acme.com',
//     name: 'Jane Doe',
//     role: 'employee',
//     companyId: 'comp_1',
//     status: 'active',
//     createdAt: '2024-01-20',
//   },
//   {
//     id: 'user_3',
//     email: 'mike@techstart.io',
//     name: 'Mike Johnson',
//     role: 'company_admin',
//     companyId: 'comp_2',
//     status: 'active',
//     createdAt: '2024-02-20',
//   },
//   {
//     id: 'user_4',
//     email: 'sarah@techstart.io',
//     name: 'Sarah Wilson',
//     role: 'employee',
//     companyId: 'comp_2',
//     status: 'active',
//     createdAt: '2024-02-25',
//   },
//   {
//     id: 'user_5',
//     email: 'tom@globalsol.com',
//     name: 'Tom Brown',
//     role: 'company_admin',
//     companyId: 'comp_3',
//     status: 'inactive',
//     createdAt: '2024-03-10',
//   },
// ];

export const mockPermissions: Permission[] = [
  {
    id: "perm_1",
    name: "view_dashboard",
    description: "View dashboard",
    category: "Dashboard",
  },
  {
    id: "perm_2",
    name: "manage_users",
    description: "Manage users",
    category: "Users",
  },
  {
    id: "perm_3",
    name: "view_users",
    description: "View users",
    category: "Users",
  },
  {
    id: "perm_4",
    name: "manage_roles",
    description: "Manage roles",
    category: "Roles",
  },
  {
    id: "perm_5",
    name: "view_reports",
    description: "View reports",
    category: "Reports",
  },
  {
    id: "perm_6",
    name: "export_data",
    description: "Export data",
    category: "Data",
  },
  {
    id: "perm_7",
    name: "manage_billing",
    description: "Manage billing",
    category: "Billing",
  },
  {
    id: "perm_8",
    name: "manage_settings",
    description: "Manage settings",
    category: "Settings",
  },
];

export const mockRoles: Role[] = [
  {
    id: "role_1",
    name: "Admin",
    description: "Full access to all features",
    permissions: [
      "perm_1",
      "perm_2",
      "perm_3",
      "perm_4",
      "perm_5",
      "perm_6",
      "perm_7",
      "perm_8",
    ],
    companyId: "comp_1",
  },
  {
    id: "role_2",
    name: "Manager",
    description: "Can manage users and view reports",
    permissions: ["perm_1", "perm_2", "perm_3", "perm_5"],
    companyId: "comp_1",
  },
  {
    id: "role_3",
    name: "Viewer",
    description: "Read-only access",
    permissions: ["perm_1", "perm_3", "perm_5"],
    companyId: "comp_1",
  },
];

export const mockDashboardStats: DashboardStats = {
  totalCompanies: 156,
  totalUsers: 2847,
  activeSubscriptions: 142,
  monthlyRevenue: 45890,
  growthPercentage: 12.5,
};

export default {
  mockRoles,
  mockDashboardStats,
  mockPermissions,
  mockPlans,
  mockCompanies,
};
