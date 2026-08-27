"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  CheckCheck,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  useAppDispatch,
  useAppSelector,
} from "@/store/hooks";

import {
  fetchNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from "@/store/slices/notification.slice";

import { Notification } from "../notification.types";

export default function NotificationBell() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    notifications,
    unreadCount,
    loading,
  } = useAppSelector(
    (state) => state.notifications,
  );

  const [open, setOpen] = useState(false);

  /*
   * Load the latest 10 notifications
   * when the popover is opened.
   */
  useEffect(() => {
    if (!open) return;

    dispatch(
      fetchNotifications({
        page: 1,
        limit: 10,
      }),
    );
  }, [open, dispatch]);

  const handleNotificationClick = async (
    notification: Notification,
  ) => {
    /*
     * Mark as read first.
     */
    if (!notification.is_read) {
      await dispatch(
        markNotificationRead(notification.id),
      );
    }

    setOpen(false);

    /*
     * Navigate to related entity.
     */
    if (
      notification.entity_type &&
      notification.entity_id
    ) {
      const routes: Record<string, string> = {
        LEAD: "leads",
        CUSTOMER: "customers",
        DEAL: "deals",
        TASK: "tasks",
        USER: "users",
      };

      const route =
        routes[notification.entity_type];

      if (route) {
        router.push(
          `/dashboard/${route}/${notification.entity_id}`,
        );
      }
    }
  };

  const handleMarkAllAsRead = async () => {
    if (unreadCount === 0) return;

    await dispatch(
      markAllNotificationsRead(),
    );
  };

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />

          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1.5 text-[10px] font-bold leading-none text-white shadow-sm ring-2 ring-background">
              {unreadCount > 99
                ? "99+"
                : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-[380px] p-0"
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <h3 className="text-sm font-semibold">
              Notifications
            </h3>

            {unreadCount > 0 && (
              <p className="text-xs text-muted-foreground">
                {unreadCount} unread
              </p>
            )}
          </div>

          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1.5 text-xs"
              onClick={handleMarkAllAsRead}
            >
              <CheckCheck className="h-3.5 w-3.5" />
              Mark all as read
            </Button>
          )}
        </div>

        <Separator />

        <ScrollArea className="h-[420px]">
          {loading ? (
            <div className="flex h-[250px] items-center justify-center">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading notifications...
              </div>
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex h-[250px] flex-col items-center justify-center px-6 text-center">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <Bell className="h-5 w-5 text-muted-foreground" />
              </div>

              <p className="text-sm font-medium">
                No notifications
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                You're all caught up.
              </p>
            </div>
          ) : (
            <div>
              {notifications.map(
                (notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onClick={
                      handleNotificationClick
                    }
                  />
                ),
              )}
            </div>
          )}
        </ScrollArea>

        <Separator />

        <div className="p-2">
          <Button
            variant="ghost"
            className="w-full text-sm"
            onClick={() => {
              setOpen(false);
              router.push(
                "/dashboard/notifications",
              );
            }}
          >
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

interface NotificationItemProps {
  notification: Notification;
  onClick: (
    notification: Notification,
  ) => void;
}

function NotificationItem({
  notification,
  onClick,
}: NotificationItemProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(notification)}
      className={`w-full border-b px-4 py-3 text-left transition-colors hover:bg-muted/50 ${
        !notification.is_read
          ? "bg-muted/30"
          : ""
      }`}
    >
      <div className="flex gap-3">
        <div className="pt-1.5">
          <span
            className={`block h-2 w-2 rounded-full ${
              notification.is_read
                ? "bg-transparent"
                : "bg-red-600"
            }`}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p
              className={`text-sm ${
                notification.is_read
                  ? "font-medium"
                  : "font-semibold"
              }`}
            >
              {notification.title}
            </p>

            <span className="shrink-0 text-[11px] text-muted-foreground">
              {formatDistanceToNow(
                new Date(
                  notification.created_at,
                ),
                {
                  addSuffix: true,
                },
              )}
            </span>
          </div>

          <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">
            {notification.message}
          </p>
        </div>
      </div>
    </button>
  );
}