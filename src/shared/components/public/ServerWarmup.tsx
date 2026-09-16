"use client";

import { useEffect, useRef } from "react";

/**
 * ServerWarmup Component
 * Non-blocking background trigger to wake up backend instances deployed
 * on free-tier hosting platforms (such as Render or Railway) that spin
 * down during periods of inactivity.
 *
 * Runs automatically when the landing page mounts, ensuring the backend
 * is warm and responsive by the time the visitor interacts with auth or dashboard routes.
 */
export function ServerWarmup() {
  const warmedRef = useRef(false);

  useEffect(() => {
    if (warmedRef.current) return;
    warmedRef.current = true;

    const warmServer = async () => {
      try {
        // Ping relative /api/health which proxies through Next.js rewrites
        fetch("/api/health", {
          method: "GET",
          cache: "no-store",
          headers: {
            "x-warmup-request": "true",
          },
          // Generous timeout to allow Render's 30-50s cold boot to succeed
          signal: AbortSignal.timeout(60000),
        }).catch(() => {
          // Silently catch in background during cold-start boot sequence
        });

        // If an explicit backend URL is provided via public environment variable, ping it directly as well
        const directBackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL;
        if (directBackendUrl) {
          const directEndpoint = directBackendUrl.replace(/\/+$/, "") + (directBackendUrl.endsWith("/api") ? "/health" : "/api/health");
          fetch(directEndpoint, {
            method: "GET",
            cache: "no-store",
            mode: "cors",
            signal: AbortSignal.timeout(60000),
          }).catch(() => {
            // Silently catch
          });
        }
      } catch {
        // Suppress any uncaught background initialization errors
      }
    };

    // Dispatch when browser main-thread is idle to preserve 100% lighthouse & CWV score
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      window.requestIdleCallback(() => warmServer(), { timeout: 1000 });
    } else {
      setTimeout(warmServer, 200);
    }
  }, []);

  return null;
}
