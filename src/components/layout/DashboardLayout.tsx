import React from "react";
import { Outlet, Navigate } from "react-router-dom";

import { useAuthStore } from "@/store/authStore";

import TopHeader from "@/components/layout/TopHeader";
import AppSidebar from "./AppSidebar";

interface DashboardLayoutProps {
  title?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ title }) => {
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
