"use client";

import { useEffect } from "react";

import { socket } from "../socket";

import { useAppDispatch } from "@/store/hooks";

import {
  addNotification,
  fetchUnreadNotificationCount,
} from "@/store/slices/notification.slice";

import { Notification } from "@/features/notifications/notification.types";

export default function SocketInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleConnect = () => {
      console.log("Connected to Socket.IO:", socket.id);

      // Re-sync unread count after connection/reconnection
      dispatch(fetchUnreadNotificationCount());
    };

    const handleDisconnect = () => {
      console.log("Disconnected from Socket.IO");
    };

    const handleNewNotification = (notification: Notification) => {
      console.log("New notification received:", notification);

      dispatch(addNotification(notification));
    };

    socket.on("connect", handleConnect);

    socket.on("disconnect", handleDisconnect);

    socket.on("notification:new", handleNewNotification);

    socket.connect();

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("notification:new", handleNewNotification);

      socket.disconnect();
    };
  }, [dispatch]);

  return null;
}
