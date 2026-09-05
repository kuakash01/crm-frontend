"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/features/auth/services/auth.service";

export default function GuestGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getCurrentUser();

        router.replace("/dashboard");
      } catch {
        setChecking(false);
      }
    };

    checkAuth();
  }, [router]);

  if (checking) {
    return (
      <AuthLoadingScreen />
    );
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