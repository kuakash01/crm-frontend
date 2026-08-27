"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePermission } from "@/shared/hooks/usePermissions";

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

export default function Sidebar({
  collapsed,
  mobile = false,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();
  const { can } = usePermission();

  const menuItems = [
    {
      section: "Overview",
      items: [
        {
          name: "Dashboard",
          href: "/dashboard",
          icon: LayoutDashboard,
          visibility: true,
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
          visibility: can("leads:read"),
        },
        {
          name: "Customers",
          href: "/dashboard/customers",
          icon: Users,
          visibility: can("customers:read"),
        },
        {
          name: "Deals",
          href: "/dashboard/deals",
          icon: Briefcase,
          visibility: can("deals:read"),
        },
        {
          name: "Services",
          href: "/dashboard/services",
          icon: Package,
          visibility: can("services:read"),
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
          visibility: can("tasks:read"),
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
          visibility: can("users:read"),
        },
        {
          name: "Settings",
          href: "/dashboard/settings",
          icon: Settings,
          visibility: true,
        },
      ],
    },
  ];

  return (
    <aside
      className={cn(
        mobile
          ? "flex h-full w-64 flex-col bg-background"
          : "hidden border-r bg-background transition-all duration-300 md:flex md:flex-col",
        !mobile && (collapsed ? "w-20" : "w-64"),
      )}
    >
      {/* Logo */}

      <div className="p-4">
        {collapsed && !mobile ? (
          <div className="flex justify-center text-2xl font-bold">C</div>
        ) : (
          <div>
            <h2 className="text-xl font-bold">CRM Platform</h2>

            <p className="text-xs text-muted-foreground">Sales Management</p>
          </div>
        )}
      </div>

      {/* Menu */}

      <nav className="flex-1 overflow-y-auto p-3">
        {menuItems.map((group) => {
          // Only show items the user has access to
          const visibleItems = group.items.filter((item) => item.visibility);

          // Don't show an empty section
          if (visibleItems.length === 0) {
            return null;
          }

          return (
            <div key={group.section} className="mb-6">
              {(!collapsed || mobile) && (
                <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {group.section}
                </p>
              )}

              <div className="space-y-1">
                {visibleItems.map((item) => {
                  const Icon = item.icon;

                  const active =
                    item.href === "/dashboard"
                      ? pathname === "/dashboard"
                      : pathname === item.href ||
                        pathname.startsWith(`${item.href}/`);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center rounded-lg px-3 py-2.5 text-sm transition-colors",
                        collapsed && !mobile ? "justify-center" : "gap-3",
                        active
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted",
                      )}
                    >
                      <Icon className="h-5 w-5 shrink-0" />

                      {(!collapsed || mobile) && <span>{item.name}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
