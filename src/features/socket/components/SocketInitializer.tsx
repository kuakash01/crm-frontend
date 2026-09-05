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
    let isMounted = true;

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

    // Fetch a short-lived socket token via the Next.js proxy (/api/* → Render).
    // This is needed in production because Socket.IO connects directly to
    // the Render backend URL, so cross-domain HttpOnly cookies are never sent.
    // The token endpoint reads the cookie server-side (same domain, so it works)
    // and returns the JWT as JSON, which we pass as socket.auth.token.
    const connectSocket = async () => {
      try {
        const res = await fetch("/api/auth/socket-token", {
          credentials: "include",
        });

        if (!res.ok) {
          console.warn("Socket token fetch failed:", res.status);
          return;
        }

        const data = await res.json();

        if (!isMounted) return;

        socket.auth = { token: data.token };
        socket.connect();
      } catch (err) {
        console.warn("Socket connection error:", err);
      }
    };

    connectSocket();

    return () => {
      isMounted = false;
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("notification:new", handleNewNotification);

      socket.disconnect();
    };
  }, [dispatch]);

  return null;
}
