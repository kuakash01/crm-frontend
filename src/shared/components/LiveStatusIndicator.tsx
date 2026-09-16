"use client";

import { useEffect, useState } from "react";
import { socket } from "@/features/socket/socket";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function LiveStatusIndicator() {
  const [connected, setConnected] = useState(socket.connected);

  useEffect(() => {
    setConnected(socket.connected);

    const onConnect = () => setConnected(true);
    const onDisconnect = () => setConnected(false);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted/70">
          <span className="relative flex h-2 w-2">
            {connected && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            )}
            <span
              className={`relative inline-flex h-2 w-2 rounded-full ${
                connected ? "bg-emerald-500" : "bg-amber-500"
              }`}
            />
          </span>
          <span className="hidden font-medium md:inline">
            {connected ? "Live" : "Syncing"}
          </span>
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p className="text-xs font-normal">
          {connected
            ? "Real-time updates active via Socket.IO"
            : "Connecting to real-time notification service..."}
        </p>
      </TooltipContent>
    </Tooltip>
  );
}
