"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePermission } from "@/shared/hooks/usePermissions";
import { Logo, LogoExpanded } from "@/shared/components/Logo";

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
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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
          : "hidden border-r bg-background/95 backdrop-blur-xs transition-all duration-300 md:flex md:flex-col",
        !mobile && (collapsed ? "w-20" : "w-64"),
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center px-4 border-b border-border/50">
        {collapsed && !mobile ? (
          <div className="flex w-full justify-center">
            <Logo collapsed={true} showText={false} href={undefined} />
          </div>
        ) : (
          <Link href="/dashboard" className="block hover:opacity-85 transition">
            <LogoExpanded />
          </Link>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-4">
        {menuItems.map((group) => {
          // Only show items the user has access to
          const visibleItems = group.items.filter((item) => item.visibility);

          // Don't show an empty section
          if (visibleItems.length === 0) {
            return null;
          }

          return (
            <div key={group.section} className="space-y-1">
              {(!collapsed || mobile) && (
                <p className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">
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

                  const linkContent = (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "group relative flex min-h-[44px] items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                        collapsed && !mobile
                          ? "justify-center px-2 py-2.5"
                          : "gap-3 hover:translate-x-1",
                        active
                          ? "bg-primary text-primary-foreground shadow-sm font-semibold"
                          : "text-muted-foreground hover:bg-muted/80 hover:text-foreground active:scale-[0.98]",
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110",
                          active
                            ? "text-primary-foreground"
                            : "text-muted-foreground group-hover:text-foreground",
                        )}
                      />

                      {(!collapsed || mobile) && (
                        <span className="truncate">{item.name}</span>
                      )}

                      {/* Active indicator dot on collapsed view */}
                      {collapsed && !mobile && active && (
                        <span className="absolute right-1.5 top-2.5 h-2 w-2 rounded-full bg-primary-foreground shadow-sm animate-pulse" />
                      )}
                    </Link>
                  );

                  if (collapsed && !mobile) {
                    return (
                      <Tooltip key={item.href}>
                        <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                        <TooltipContent side="right" sideOffset={10}>
                          {item.name}
                        </TooltipContent>
                      </Tooltip>
                    );
                  }

                  return <div key={item.href}>{linkContent}</div>;
                })}
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
