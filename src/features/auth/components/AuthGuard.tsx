// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// import { getCurrentUser } from "@/features/auth/services/auth.service";

// import {
//   setUser,
//   finishLoading,
//   logout,
// } from "@/store/slices/authSlice";

// import {
//   useAppDispatch,
//   useAppSelector,
// } from "@/store/hooks";

// export default function AuthGuard({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const router = useRouter();
//   const dispatch = useAppDispatch();

//   const [authorized, setAuthorized] =
//   useState(false);

//   const user = useAppSelector(
//     (state) => state.auth.user
//   );

//   const loading = useAppSelector(
//     (state) => state.auth.loading
//   );

//   useEffect(() => {
//     const initAuth = async () => {
//       if (user) {
//         dispatch(finishLoading());
//         return;
//       }

//       try {
//         const currentUser =
//           await getCurrentUser();

//         dispatch(setUser(currentUser));
//         setAuthorized(true);
//       } catch {
//         dispatch(logout());

//         router.replace("/login");
//       } finally {
//         dispatch(finishLoading());
//       }
//     };

//     initAuth();
//   }, [dispatch, router, user]);

//   if (loading || !authorized) {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   return <>{children}</>;
// }


"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getCurrentUser } from "@/features/auth/services/auth.service";

import { setUser, finishLoading, logout } from "@/store/slices/auth.slice";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [authorized, setAuthorized] = useState(false);

  const user = useAppSelector((state) => state.auth.user);
  const loading = useAppSelector((state) => state.auth.loading);

  useEffect(() => {
    const initAuth = async () => {
      if (user) {
        setAuthorized(true);
        dispatch(finishLoading());
        return;
      }

      try {
        const currentUser = await getCurrentUser();

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

