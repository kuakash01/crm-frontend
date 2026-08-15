import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/auth.slice";
import notificationReducer from "@/store/slices/notification.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
     notifications: notificationReducer,
  },
});

export type RootState =
  ReturnType<typeof store.getState>;

export type AppDispatch =
  typeof store.dispatch;