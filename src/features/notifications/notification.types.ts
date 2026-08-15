export type NotificationType =
  | "LEAD"
  | "CUSTOMER"
  | "DEAL"
  | "TASK"
  | "USER"
  | "SERVICE"
  | "SYSTEM";

export type NotificationAction =
  | "CREATED"
  | "UPDATED"
  | "ASSIGNED"
  | "COMPLETED"
  | "CONVERTED"
  | "STATUS_CHANGED"
  | "STAGE_CHANGED"
  | "WON"
  | "LOST"
  | "DUE"
  | "OVERDUE";

export interface Notification {
  id: number;
  type: NotificationType;
  action: NotificationAction;
  title: string;
  message: string;
  entity_type: "LEAD" | "CUSTOMER" | "DEAL" | "TASK" | "USER" | null;
  entity_id: number | null;
  is_read: boolean;
  created_at: string;
}

export interface NotificationPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface NotificationsResponse {
  data: Notification[];
  pagination: NotificationPagination;
}

export interface UnreadNotificationCount {
  count: number;
}