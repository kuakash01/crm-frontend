"use client";
import { useAppSelector } from "@/store/hooks";

export default function Header() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <header className="h-16 border-b flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-muted" />

        <div>
          <p className="text-sm font-medium">{user?.fullname}</p>

          <p className="text-xs text-muted-foreground">{user?.role}</p>
        </div>
      </div>
    </header>
  );
}
