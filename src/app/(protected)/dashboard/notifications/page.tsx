"use client";

import { useEffect, useState } from "react";
import { Bell, Check, CheckCheck, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import DataTablePagination from "@/shared/components/pagination/DataTablePagination";
import { usePagination } from "@/shared/hooks/usePagination";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

import {
  markAllNotificationsRead,
  markNotificationRead,
} from "@/store/slices/notification.slice";

import { getNotifications } from "@/features/notifications/notification.service";

import { Notification } from "@/features/notifications/notification.types";

const PAGE_LIMIT = 10;

export default function NotificationsPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { unreadCount } = useAppSelector((state) => state.notifications);

  const [notifications, setNotifications] = useState<Notification[]>([]);

  const [loading, setLoading] = useState(true);

  // Pagination state
  const [pagination, setPagination] = useState({
    page: 1,
    limit: PAGE_LIMIT,
    total: 0,
    totalPages: 0,
  });

  const { currentPage, handlePageChange, handleJump, visiblePages } =
    usePagination({
      totalPages: pagination.totalPages,
    });

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const data = await getNotifications({
        page: currentPage,
        limit: pagination.limit,
      });

      setNotifications(data.data);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [currentPage]);

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.is_read) {
      await dispatch(markNotificationRead(notification.id));

      setNotifications((current) =>
        current.map((item) =>
          item.id === notification.id
            ? {
                ...item,
                is_read: true,
              }
            : item,
        ),
      );
    }

    if (notification.entity_type && notification.entity_id) {
      const routes: Record<string, string> = {
        LEAD: "leads",
        CUSTOMER: "customers",
        DEAL: "deals",
        TASK: "tasks",
        USER: "users",
      };

      const route = routes[notification.entity_type];

      if (route) {
        router.push(`/dashboard/${route}/${notification.entity_id}`);
      }
    }
  };

  const handleMarkAllAsRead = async () => {
    if (unreadCount === 0) return;

    await dispatch(markAllNotificationsRead());

    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        is_read: true,
      })),
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>

          <p className="text-muted-foreground">
            Stay up to date with activity in your CRM
          </p>
        </div>

        {unreadCount > 0 && (
          <Button variant="outline" onClick={handleMarkAllAsRead}>
            <CheckCheck className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
        )}
      </div>

      <Separator />

      {/* Notification list */}

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading notifications...
          </div>
        </div>
      ) : notifications.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-12 text-center">
          <Bell className="h-8 w-8 text-muted-foreground" />

          <h3 className="font-medium">No notifications yet</h3>

          <p className="text-sm text-muted-foreground">You're all caught up.</p>
        </div>
      ) : (
        <>
          <div className="overflow-hidden rounded-lg border">
            {notifications.map((notification) => (
              <NotificationRow
                key={notification.id}
                notification={notification}
                onClick={handleNotificationClick}
              />
            ))}
          </div>

          {/* Pagination */}

          <DataTablePagination
            total={pagination.total}
            limit={pagination.limit}
            totalPages={pagination.totalPages}
            currentPage={currentPage}
            visiblePages={visiblePages}
            itemName="notifications"
            onPageChange={handlePageChange}
            onJump={handleJump}
          />
        </>
      )}
    </div>
  );
}

interface NotificationRowProps {
  notification: Notification;
  onClick: (notification: Notification) => void;
}

function NotificationRow({ notification, onClick }: NotificationRowProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(notification)}
      className={`w-full border-b px-5 py-4 text-left transition-colors last:border-b-0 hover:bg-muted/40 ${
        !notification.is_read ? "bg-muted/20" : "bg-background"
      }`}
    >
      <div className="flex gap-4">
        {/* Unread indicator */}

        <div className="pt-2">
          <span
            className={`block h-2.5 w-2.5 rounded-full ${
              notification.is_read ? "bg-transparent" : "bg-red-600"
            }`}
          />
        </div>

        {/* Content */}

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <h3
              className={`text-sm ${
                notification.is_read ? "font-medium" : "font-semibold"
              }`}
            >
              {notification.title}
            </h3>

            <span className="shrink-0 text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(notification.created_at), {
                addSuffix: true,
              })}
            </span>
          </div>

          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            {notification.message}
          </p>

          {notification.is_read && (
            <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
              <Check className="h-3 w-3" />
              Read
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
