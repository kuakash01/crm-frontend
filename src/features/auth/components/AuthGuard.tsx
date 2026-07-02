"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getCurrentUser } from "@/features/auth/services/auth.service";

import {
  setUser,
  finishLoading,
  logout,
} from "@/store/slices/authSlice";

import {
  useAppDispatch,
  useAppSelector,
} from "@/store/hooks";

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [authorized, setAuthorized] =
  useState(false);

  const user = useAppSelector(
    (state) => state.auth.user
  );

  const loading = useAppSelector(
    (state) => state.auth.loading
  );

  useEffect(() => {
    const initAuth = async () => {
      if (user) {
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

  if (loading || !authorized) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}