

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  UserRound,
  Users,
  Briefcase,
  Package,
  CheckSquare,
  Settings,
  Shield,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface SidebarProps {
  collapsed: boolean;
  mobile?: boolean;
  onClose?: () => void;
}

const menuItems = [
  {
    section: "Overview",
    items: [
      {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    section: "Sales",
    items: [
      {
        name: "Leads",
        href: "/dashboard/leads",
        icon: UserRound,
      },
      {
        name: "Customers",
        href: "/dashboard/customers",
        icon: Users,
      },
      {
        name: "Deals",
        href: "/dashboard/deals",
        icon: Briefcase,
      },
      {
        name: "Services",
        href: "/dashboard/services",
        icon: Package,
      },
    ],
  },
  {
    section: "Workspace",
    items: [
      {
        name: "Tasks",
        href: "/dashboard/tasks",
        icon: CheckSquare,
      },
    ],
  },
  {
    section: "Administration",
    items: [
      {
        name: "Users",
        href: "/dashboard/users",
        icon: Shield,
      },
      {
        name: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
      },
    ],
  },
];

export default function Sidebar({
  collapsed,
  mobile = false,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        mobile
          ? "flex h-full w-64 flex-col bg-background"
          : "hidden border-r bg-background transition-all duration-300 md:flex md:flex-col",
        !mobile && (collapsed ? "w-20" : "w-64")
      )}
    >
      {/* Logo */}
      <div className=" p-4">
        {collapsed && !mobile ? (
          <div className="flex justify-center text-2xl font-bold">
            C
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold">
              CRM Platform
            </h2>

            <p className="text-xs text-muted-foreground">
              Sales Management
            </p>
          </div>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto p-3">
        {menuItems.map((group) => (
          <div
            key={group.section}
            className="mb-6"
          >
            {(!collapsed || mobile) && (
              <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {group.section}
              </p>
            )}

            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;

                const active =
                  pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center rounded-lg px-3 py-2.5 text-sm transition-colors",
                      collapsed && !mobile
                        ? "justify-center"
                        : "gap-3",
                      active
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    )}
                  >
                    <Icon className="h-5 w-5 shrink-0" />

                    {(!collapsed || mobile) && (
                      <span>{item.name}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}