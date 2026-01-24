import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  LayoutDashboard,
  Building2,
  Users,
  CreditCard,
  Settings,
  LogOut,
  Shield,
  Briefcase,
  FileText,
  UserCircle,
  HelpCircle,
  ChevronDown,
  UserPlus,
  UserCog,
  ListChecks,
  Receipt,
  Bell,
  Lock,
  Palette,
  Mail,
  Phone,
} from "lucide-react";

interface SubNavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

interface NavItem {
  title: string;
  href?: string;
  icon: React.ElementType;
  subItems?: SubNavItem[];
}

const superAdminNav: NavItem[] = [
  { title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  {
    title: "Users",
    icon: Users,
    subItems: [{ title: "All Users", href: "/admin/users", icon: Users }],
  },
  {
    title: "Senders",
    icon: CreditCard,
    subItems: [
      { title: "All Senders", href: "/admin/senders", icon: CreditCard },
    ],
  },
  {
    title: "Receivers",
    icon: CreditCard,
    subItems: [
      { title: "All Receivers", href: "/admin/receivers", icon: CreditCard },
    ],
  },
  {
    title: "Transactions",
    icon: CreditCard,
    subItems: [
      {
        title: "All Transactions",
        href: "/admin/transactions",
        icon: CreditCard,
      },
    ],
  },
];

const clientNav: NavItem[] = [
  { title: "Dashboard", href: "/client/dashboard", icon: LayoutDashboard },
  {
    title: "Services",
    icon: Briefcase,
    subItems: [
      { title: "All Services", href: "/client/services", icon: Briefcase },
      {
        title: "My Requests",
        href: "/client/services/requests",
        icon: FileText,
      },
    ],
  },
  {
    title: "Support",
    icon: HelpCircle,
    subItems: [
      { title: "Help Center", href: "/client/support", icon: HelpCircle },
      { title: "Contact Us", href: "/client/support/contact", icon: Mail },
    ],
  },
  { title: "Profile", href: "/client/profile", icon: UserCircle },
];

export default function AppSidebar() {
  const { user, logout } = useAuthStore();
  // const user = {
  //   role: "super_admin",
  //   name: "John Doe",
  // };
  const location = useLocation();
  const navigate = useNavigate();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const getNavItems = (): NavItem[] => {
    switch (user?.role) {
      case "bank_admin":
        return superAdminNav;
      case "client":
        return clientNav;
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getRoleLabel = () => {
    switch (user?.role) {
      case "bank_admin":
        return "Bank Admin";
      case "client":
        return "Client";
      default:
        return "User";
    }
  };

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title],
    );
  };

  const isMenuOpen = (title: string) => openMenus.includes(title);

  const isSubItemActive = (item: NavItem) => {
    if (item.subItems) {
      return item.subItems.some((sub) => location.pathname === sub.href);
    }
    return false;
  };

  return (
    <aside className="flex flex-col bg-sidebar text-sidebar-foreground h-screen sticky top-0 w-64">
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-lg">Banking System</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const hasSubItems = item.subItems && item.subItems.length > 0;
          const isActive = item.href
            ? location.pathname === item.href
            : isSubItemActive(item);
          const isOpen = isMenuOpen(item.title) || isSubItemActive(item);

          if (hasSubItems) {
            return (
              <Collapsible
                key={item.title}
                open={isOpen}
                onOpenChange={() => toggleMenu(item.title)}
              >
                <CollapsibleTrigger asChild>
                  <button
                    className={cn(
                      "flex items-center justify-between w-full px-3 py-2.5 rounded-lg transition-all duration-200",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-foreground"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium text-sm">{item.title}</span>
                    </div>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform duration-200",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-1 ml-4 space-y-1">
                  {item.subItems?.map((subItem) => {
                    const isSubActive = location.pathname === subItem.href;
                    return (
                      <Link
                        key={subItem.href}
                        to={subItem.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm",
                          isSubActive
                            ? "bg-sidebar-primary text-sidebar-primary-foreground"
                            : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                        )}
                      >
                        <subItem.icon className="w-4 h-4 flex-shrink-0" />
                        <span>{subItem.title}</span>
                      </Link>
                    );
                  })}
                </CollapsibleContent>
              </Collapsible>
            );
          }

          return (
            <Link
              key={item.href}
              to={item.href!}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium text-sm">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="p-3 border-t border-sidebar-border">
        <div className="px-3 py-2 mb-2">
          <p className="text-sm font-medium truncate">{`${user?.first_name} ${user?.last_name}`}</p>
          <p className="text-xs text-sidebar-muted">{getRoleLabel()}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="w-full justify-start gap-3 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Button>
      </div>
    </aside>
  );
}
