"use client";

import { Dispatch, SetStateAction, useState } from "react";
import {
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  User,
  LogOut,
  Globe,
  Search,
  Command,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import NotificationBell from "@/features/notifications/components/NotificationBell";
import { ThemeToggle } from "@/shared/components/ThemeToggle";
import CommandPalette from "@/shared/components/CommandPalette";
import QuickActionDock from "@/shared/components/QuickActionDock";
import LiveStatusIndicator from "@/shared/components/LiveStatusIndicator";

import { logout } from "@/features/auth/services/auth.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { socket } from "@/features/socket/socket";
import { logout as logoutUser } from "@/store/slices/auth.slice";

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
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [commandOpen, setCommandOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      socket.disconnect();
      dispatch(logoutUser());
      try {
        localStorage.removeItem("crm_session_active");
      } catch {}
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error) {
      toast.error("Failed to logout");
      console.error("Error: ", error);
    }
  };

  const initials = user?.fullname
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-border/60 bg-background/80 px-2.5 backdrop-blur-md transition-all sm:px-6">
        {/* Left Side */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-9 w-9 shrink-0"
            onClick={() => setMobileOpen(true)}
            aria-label="Open mobile menu"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Desktop Collapse Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex h-9 w-9"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <PanelLeftOpen className="h-5 w-5" />
            ) : (
              <PanelLeftClose className="h-5 w-5" />
            )}
          </Button>

          {/* Search / Command Palette Trigger */}
          <button
            type="button"
            onClick={() => setCommandOpen(true)}
            className="group flex h-9 w-28 xs:w-36 items-center justify-between rounded-lg border border-border/70 bg-muted/40 px-2 text-xs text-muted-foreground shadow-xs transition-all hover:border-primary/40 hover:bg-muted/70 sm:w-56 sm:px-2.5 md:w-64 lg:w-72"
          >
            <div className="flex items-center gap-2 truncate">
              <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
              <span className="hidden truncate sm:inline">Search CRM or action...</span>
              <span className="truncate sm:hidden">Search...</span>
            </div>
            <kbd className="hidden rounded bg-background/90 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground shadow-xs ring-1 ring-border/80 group-hover:text-foreground sm:inline-flex items-center gap-0.5">
              <Command className="h-2.5 w-2.5" /> K
            </kbd>
          </button>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          <LiveStatusIndicator />
          <QuickActionDock />
          <NotificationBell />
          <ThemeToggle />

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-auto gap-2.5 rounded-full p-1 transition-all hover:bg-muted sm:rounded-lg sm:px-2.5 sm:py-1.5"
              >
                {/* Avatar */}
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-primary to-primary/80 text-xs font-semibold text-primary-foreground shadow-xs sm:h-9 sm:w-9 sm:text-sm">
                  {initials || "U"}
                </div>

                {/* User Info */}
                <div className="hidden text-left md:block">
                  <p className="max-w-[120px] truncate text-sm font-medium leading-tight lg:max-w-[150px]">
                    {user?.fullname}
                  </p>
                  <p className="text-[11px] capitalize text-muted-foreground">
                    {user?.role?.replace("_", " ").toLowerCase()}
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56 shadow-lg">
              <DropdownMenuLabel>
                <div>
                  <p className="truncate text-sm font-medium">{user?.fullname}</p>
                  <p className="truncate text-xs font-normal text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => router.push("/dashboard/settings/profile")}
              >
                <User className="mr-2 h-4 w-4 text-muted-foreground" />
                Profile & Account
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => router.push("/")}
              >
                <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                View Website
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-destructive focus:text-destructive"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Global Command Palette */}
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  );
}

