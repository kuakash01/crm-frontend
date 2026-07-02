// src/app/dashboard/layout.tsx

import Sidebar from "@/shared/components/Sidebar";
import Header from "@/shared/components/Header";
import AuthGuard from "@/features/auth/components/AuthGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <AuthGuard>
        <>
          <Sidebar />

          <div className="flex-1">
            <Header />

            <main className="p-6">{children}</main>
          </div>
        </>
      </AuthGuard>
    </div>
  );
}
