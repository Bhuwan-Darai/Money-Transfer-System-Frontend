import React from "react";
import { Outlet, Navigate } from "react-router-dom";

import { useAuthStore } from "@/store/authStore";
import type { UserRole } from "@/types/types";

import TopHeader from "@/components/layout/TopHeader";
import AppSidebar from "./AppSidebar";

interface DashboardLayoutProps {
  allowedRoles: UserRole[];
  title?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  allowedRoles,
  title,
}) => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    const redirectPath = {
      super_admin: "/super-admin",
      client: "/client",
    }[user.role];
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <TopHeader title={title} />
        <main className="flex-1 p-6 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
