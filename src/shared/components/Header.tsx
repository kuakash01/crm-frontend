"use client";

import { Dispatch, SetStateAction } from "react";

import {
  Bell,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useAppSelector } from "@/store/hooks";

import NotificationBell from "@/features/notifications/components/NotificationBell";

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  setMobileOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Header({
  collapsed,
  setCollapsed,
  setMobileOpen,
}: HeaderProps) {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <header className="flex h-16 items-center justify-between border-b px-6">
      {/* Left */}
      <div className="flex items-center gap-2">
        {/* Mobile Menu */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Desktop Collapse */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <PanelLeftOpen className="h-5 w-5" />
          ) : (
            <PanelLeftClose className="h-5 w-5" />
          )}
        </Button>

        <h1 className="text-xl font-semibold">Dashboard</h1>
      </div>

      {/* Center */}
      {/* <div className="hidden w-full max-w-md md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search..."
            className="pl-9"
          />
        </div>
      </div> */}

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* <Button
          variant="ghost"
          size="icon"
        >
          <Bell className="h-5 w-5" />
        </Button> */}
        <NotificationBell />

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
            {user?.fullname
              ?.split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>

          <div className="hidden md:block">
            <p className="text-sm font-medium">{user?.fullname}</p>

            <p className="text-xs capitalize text-muted-foreground">
              {user?.role?.replace("_", " ").toLowerCase()}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
