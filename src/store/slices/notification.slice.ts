import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import {
  getNotifications,
  getUnreadNotificationCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../../features/notifications/notification.service";

import {
  Notification,
  NotificationsResponse,
} from "../../features/notifications/notification.types";

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;

  loading: boolean;
  unreadLoading: boolean;

  error: string | null;
}

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,

  loading: false,
  unreadLoading: false,

  error: null,
};

export const fetchNotifications = createAsyncThunk<
  NotificationsResponse,
  {
    page?: number;
    limit?: number;
  } | undefined,
  {
    rejectValue: string;
  }
>(
  "notifications/fetchNotifications",
  async (params, { rejectWithValue }) => {
    try {
      // Return the complete response.
      return await getNotifications(params);

    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message ||
        "Failed to load notifications",
      );
    }
  },
);

export const fetchUnreadNotificationCount =
  createAsyncThunk<
    { count: number },
    void,
    {
      rejectValue: string;
    }
  >(
    "notifications/fetchUnreadNotificationCount",
    async (_, { rejectWithValue }) => {
      try {
        return await getUnreadNotificationCount();
      } catch (error: any) {
        return rejectWithValue(
          error?.response?.data?.message ||
          "Failed to load notification count",
        );
      }
    },
  );

export const markNotificationRead =
  createAsyncThunk<
    number,
    number,
    {
      rejectValue: string;
    }
  >(
    "notifications/markNotificationRead",
    async (
      notificationId,
      { rejectWithValue },
    ) => {
      try {
        await markNotificationAsRead(
          notificationId,
        );

        return notificationId;
      } catch (error: any) {
        return rejectWithValue(
          error?.response?.data?.message ||
          "Failed to mark notification as read",
        );
      }
    },
  );

export const markAllNotificationsRead =
  createAsyncThunk<
    void,
    void,
    {
      rejectValue: string;
    }
  >(
    "notifications/markAllNotificationsRead",
    async (_, { rejectWithValue }) => {
      try {
        await markAllNotificationsAsRead();
      } catch (error: any) {
        return rejectWithValue(
          error?.response?.data?.message ||
          "Failed to mark notifications as read",
        );
      }
    },
  );

const notificationSlice = createSlice({
  name: "notifications",

  initialState,

  reducers: {
    // --------------------------------
    // Real-time notification
    // --------------------------------

    addNotification: (
      state,
      action: PayloadAction<Notification>,
    ) => {
      const notification = action.payload;

      const exists = state.notifications.some(
        (item) => item.id === notification.id,
      );

      if (exists) {
        return;
      }

      state.notifications.unshift(
        notification,
      );

      if (!notification.is_read) {
        state.unreadCount += 1;
      }
    },

    // --------------------------------
    // Clear notifications
    // --------------------------------

    clearNotifications: (state) => {
      state.notifications = [];
    },

    // --------------------------------
    // Clear error
    // --------------------------------

    resetNotificationError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    // --------------------------------
    // Fetch notifications
    // --------------------------------

    builder
      .addCase(
        fetchNotifications.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )

      .addCase(
        fetchNotifications.fulfilled,
        (state, action) => {
          state.loading = false;
          /*
           * The full API response is returned
           * by the thunk.
           *
           * Redux only stores the notification
           * array. Pagination stays outside Redux.
           */
          state.notifications =
            action.payload.data;
        },
      )

      .addCase(
        fetchNotifications.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to load notifications";
        },
      );

    // --------------------------------
    // Unread count
    // --------------------------------

    builder
      .addCase(
        fetchUnreadNotificationCount.pending,
        (state) => {
          state.unreadLoading = true;
        },
      )

      .addCase(
        fetchUnreadNotificationCount.fulfilled,
        (state, action) => {
          state.unreadLoading = false;

          state.unreadCount =
            action.payload.count;
        },
      )

      .addCase(
        fetchUnreadNotificationCount.rejected,
        (state) => {
          state.unreadLoading = false;
        },
      );

    // --------------------------------
    // Mark one as read
    // --------------------------------

    builder.addCase(
      markNotificationRead.fulfilled,
      (state, action) => {
        const notification =
          state.notifications.find(
            (item) =>
              item.id === action.payload,
          );

        if (
          notification &&
          !notification.is_read
        ) {
          notification.is_read = true;

          state.unreadCount = Math.max(
            state.unreadCount - 1,
            0,
          );
        }
      },
    );

    // --------------------------------
    // Mark all as read
    // --------------------------------

    builder.addCase(
      markAllNotificationsRead.fulfilled,
      (state) => {
        state.notifications.forEach(
          (notification) => {
            notification.is_read = true;
          },
        );

        state.unreadCount = 0;
      },
    );
  },
});

export const {
  addNotification,
  clearNotifications,
  resetNotificationError,
} = notificationSlice.actions;

export default notificationSlice.reducer;