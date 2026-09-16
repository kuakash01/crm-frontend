"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/shared/components/Logo";
import { ThemeToggle } from "@/shared/components/ThemeToggle";
import { useAuthSession } from "@/shared/hooks/useAuthSession";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function HeaderPublic() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuthSession();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
        {/* Logo */}

        <Logo href="/" />

        {/* Navigation */}

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative py-5 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}

                <span
                  className={`absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-primary transition-all duration-200 ${
                    isActive
                      ? "w-5 opacity-100"
                      : "w-0 opacity-0 group-hover:w-5 group-hover:opacity-70"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Actions */}

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {isAuthenticated ? (
            <Link href="/dashboard">
              <Button className="gap-2 font-medium shadow-xs">
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="hidden sm:inline-flex"
                >
                  Sign in
                </Button>
              </Link>

              <Link href="/register">
                <Button>
                  Get started
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}