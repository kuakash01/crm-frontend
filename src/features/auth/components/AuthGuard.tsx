"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { getCurrentUser } from "@/features/auth/services/auth.service";

import {
  setUser,
  finishLoading,
  logout,
} from "@/store/slices/auth.slice";

import {
  useAppDispatch,
  useAppSelector,
} from "@/store/hooks";

import { usePermission } from "@/shared/hooks/usePermissions";

const routePermissions = [
  {
    prefix: "/dashboard/leads",
    permission: "leads:read",
  },
  {
    prefix: "/dashboard/customers",
    permission: "customers:read",
  },
  {
    prefix: "/dashboard/deals",
    permission: "deals:read",
  },
  {
    prefix: "/dashboard/services",
    permission: "services:read",
  },
  {
    prefix: "/dashboard/tasks",
    permission: "tasks:read",
  },
  {
    prefix: "/dashboard/users",
    permission: "users:read",
  },
];

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const dispatch = useAppDispatch();

  const user = useAppSelector(
    (state) => state.auth.user,
  );

  const loading = useAppSelector(
    (state) => state.auth.loading,
  );

  const { can } = usePermission();

  const [authorized, setAuthorized] =
    useState(false);

  const [routeAuthorized, setRouteAuthorized] =
    useState(false);

  /*
   * --------------------------------
   * Authentication
   * --------------------------------
   */

  useEffect(() => {
    const initAuth = async () => {
      if (user) {
        setAuthorized(true);
        dispatch(finishLoading());
        return;
      }

      try {
        const currentUser =
          await getCurrentUser();

        dispatch(setUser(currentUser));
        setAuthorized(true);
      } catch {
        dispatch(logout());
        router.replace("/login");
      } finally {
        dispatch(finishLoading());
      }
    };

    initAuth();
  }, [dispatch, router, user]);

  /*
   * --------------------------------
   * Route authorization
   * --------------------------------
   */

  useEffect(() => {
    if (
      loading ||
      !authorized ||
      !user
    ) {
      return;
    }

    /*
     * Dashboard home is accessible
     * to every authenticated user.
     */
    if (pathname === "/dashboard") {
      setRouteAuthorized(true);
      return;
    }

    /*
     * Find the permission required
     * by the current route.
     */
    const matchedRoute =
      routePermissions.find((route) =>
        pathname.startsWith(route.prefix),
      );

    /*
     * No permission rule means the
     * route does not need extra
     * module permission.
     */
    if (!matchedRoute) {
      setRouteAuthorized(true);
      return;
    }

    /*
     * Check the user's permission.
     */
    if (can(matchedRoute.permission)) {
      setRouteAuthorized(true);
      return;
    }

    /*
     * User is authenticated but
     * does not have access.
     */
    setRouteAuthorized(false);

    router.replace("/dashboard");
  }, [
    pathname,
    loading,
    authorized,
    user,
    can,
    router,
  ]);

  /*
   * --------------------------------
   * Loading / authorization state
   * --------------------------------
   */

  if (
    loading ||
    !authorized ||
    !routeAuthorized
  ) {
    return <AuthLoadingScreen />;
  }

  return <>{children}</>;
}

function AuthLoadingScreen() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6 bg-background">
      {/* Mark */}

      <div className="relative flex h-14 w-14 items-center justify-center">
        <div className="absolute inset-0 animate-ping rounded-xl bg-primary/20" />

        <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-primary shadow-sm">
          <span className="text-lg font-semibold text-primary-foreground">
            C
          </span>
        </div>
      </div>

      {/* Spinner + label */}

      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />

          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />

          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
        </div>

        <p className="text-sm text-muted-foreground">
          Checking your session…
        </p>
      </div>
    </div>
  );
}