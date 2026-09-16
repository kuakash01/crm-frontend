"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getCurrentUser } from "@/features/auth/services/auth.service";
import { setUser, finishLoading } from "@/store/slices/auth.slice";

let inFlightPromise: Promise<any> | null = null;

export function useAuthSession() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, loading } = useAppSelector((state) => state.auth);

  const [mounted, setMounted] = useState(false);
  const [localActive, setLocalActive] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    setMounted(true);
    let isSubscribed = true;

    try {
      if (localStorage.getItem("crm_session_active") === "true") {
        setLocalActive(true);
      }
    } catch {}

    // If Redux already knows user is authenticated
    if (user || isAuthenticated) {
      try {
        localStorage.setItem("crm_session_active", "true");
      } catch {}
      setLocalActive(true);
      setHasChecked(true);
      return;
    }

    // Call /api/auth/me with deduplication
    if (!inFlightPromise) {
      inFlightPromise = getCurrentUser()
        .catch(() => null)
        .finally(() => {
          inFlightPromise = null;
        });
    }

    inFlightPromise.then((userData) => {
      if (!isSubscribed) return;
      setHasChecked(true);

      if (userData && (userData.id || userData.email)) {
        dispatch(setUser(userData));
        setLocalActive(true);
        try {
          localStorage.setItem("crm_session_active", "true");
        } catch {}
      } else {
        dispatch(finishLoading());
        setLocalActive(false);
        try {
          localStorage.removeItem("crm_session_active");
        } catch {}
      }
    });

    return () => {
      isSubscribed = false;
    };
  }, [user, isAuthenticated, dispatch]);

  const active = mounted && Boolean(user || isAuthenticated || (localActive && !hasChecked));

  return {
    user,
    isAuthenticated: active,
    loading: loading && !hasChecked,
    mounted,
  };
}
