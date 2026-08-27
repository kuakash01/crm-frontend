"use client";

import { Dispatch, SetStateAction } from "react";

import {
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  User,
  LogOut,
  Globe
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

import { useAppSelector } from "@/store/hooks";
import NotificationBell from "@/features/notifications/components/NotificationBell";

import { logout } from "@/features/auth/services/auth.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { socket } from "@/features/socket/socket";
import { useAppDispatch } from "@/store/hooks";
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

  const handleLogout = async () => {
    try {
      await logout();

      socket.disconnect();

      dispatch(logoutUser());

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
    .slice(0, 2);

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

      {/* Right */}
      <div className="flex items-center gap-4">
        <NotificationBell />

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-auto gap-3 px-2 py-1.5 hover:bg-muted"
            >
              {/* Avatar */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {initials}
              </div>

              {/* User Info */}
              <div className="hidden text-left md:block">
                <p className="text-sm font-medium">{user?.fullname}</p>

                <p className="text-xs capitalize text-muted-foreground">
                  {user?.role?.replace("_", " ").toLowerCase()}
                </p>
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div>
                <p className="text-sm font-medium">{user?.fullname}</p>

                <p className="text-xs font-normal text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => router.push("/dashboard/settings/profile")}
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>

  
            <DropdownMenuItem
              
               onClick={() => router.push("/")}
            >
              <Globe className="mr-2 h-4 w-4" />
              View Website 
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="text-destructive focus:text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
