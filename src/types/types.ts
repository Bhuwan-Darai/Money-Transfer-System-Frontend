export type UserRole = "super_admin" | "client";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  // companyId?: string;
  // avatar?: string;
  // status: 'active' | 'inactive';
  // createdAt: string;
}

export interface Company {
  id: string;
  name: string;
  email: string;
  logo?: string;
  status: "active" | "inactive";
  planId: string;
  employeeCount: number;
  createdAt: string;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  billingCycle: "monthly" | "yearly";
  maxUsers: number;
  storageGB: number;
  features: string[];
  isPopular?: boolean;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  companyId?: string;
}

export interface DashboardStats {
  totalCompanies: number;
  totalUsers: number;
  activeSubscriptions: number;
  monthlyRevenue: number;
  growthPercentage: number;
}
