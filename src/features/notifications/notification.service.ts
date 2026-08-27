import axios from "@/shared/lib/axios";

export interface NotificationPaginationOptions {
  page?: number;
  limit?: number;
}

export const getNotifications = async (
  options?: NotificationPaginationOptions
) => {
  const response = await axios.get("/notifications", {
    params: options,
  });

  return response.data.data;
};

export const getUnreadNotificationCount = async () => {
  const response = await axios.get(
    "/notifications/unread-count"
  );

  return response.data.data;
};

export const markNotificationAsRead = async (
  notificationId: number
) => {
  const response = await axios.patch(
    `/notifications/${notificationId}/read`
  );

  return response.data.data;
};

export const markAllNotificationsAsRead = async () => {
  const response = await axios.patch(
    "/notifications/read-all"
  );

  return response.data.data;
};