"use client";

import { useEffect } from "react";

import { socket } from "../socket";

export default function SocketInitializer() {
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log(
        "Connected to Socket.IO:",
        socket.id
      );
    });

    socket.on("disconnect", () => {
      console.log(
        "Disconnected from Socket.IO"
      );
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.disconnect();
    };
  }, []);

  return null;
}