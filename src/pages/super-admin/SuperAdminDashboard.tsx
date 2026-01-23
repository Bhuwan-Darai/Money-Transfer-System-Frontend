import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building2,
  Users,
  CreditCard,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

import { mockDashboardStats, mockCompanies } from "@/data/mockData";

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { StatsCard } from "@/components/dashboard/StatsCard";

export const SuperAdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const stats = mockDashboardStats;

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <Button onClick={() => navigate("/super-admin/companies")}>
          View All Companies
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Companies"
          value={stats.totalCompanies}
          icon={Building2}
          trend={8.2}
          trendLabel="vs last month"
        />
        <StatsCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          icon={Users}
          trend={12.5}
          trendLabel="vs last month"
        />
        <StatsCard
          title="Active Subscriptions"
          value={stats.activeSubscriptions}
          icon={CreditCard}
          trend={4.1}
          trendLabel="vs last month"
        />
        <StatsCard
          title="Monthly Revenue"
          value={`$${stats.monthlyRevenue.toLocaleString()}`}
          icon={DollarSign}
          trend={15.3}
          trendLabel="vs last month"
        />
      </div>

      {/* Charts and Tables */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Companies */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              Recent Companies
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/super-admin/companies")}
            >
              View all
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockCompanies.slice(0, 5).map((company) => (
                <div
                  key={company.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{company.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {company.employeeCount} employees
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={company.status} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              Recent Users
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/super-admin/users")}
            >
              View all
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>User's</p>
              {/* {mockUsers.slice(0, 5).map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <StatusBadge status={user.status} />
                </div>
              ))} */}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                action: "New company registered",
                company: "Digital Dynamics",
                time: "2 hours ago",
                icon: Building2,
                positive: true,
              },
              {
                action: "Subscription upgraded",
                company: "TechStart Inc",
                time: "4 hours ago",
                icon: TrendingUp,
                positive: true,
              },
              {
                action: "User account deactivated",
                company: "Global Solutions",
                time: "6 hours ago",
                icon: Users,
                positive: false,
              },
              {
                action: "New subscription started",
                company: "Innovation Labs",
                time: "1 day ago",
                icon: CreditCard,
                positive: true,
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div
                  className={`p-2 rounded-lg ${activity.positive ? "bg-success/10" : "bg-destructive/10"}`}
                >
                  <activity.icon
                    className={`w-4 h-4 ${activity.positive ? "text-success" : "text-destructive"}`}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.company}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {activity.positive ? (
                    <ArrowUpRight className="w-3 h-3 text-success" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 text-destructive" />
                  )}
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
