"use client";

import Link from "next/link";
import { ArrowRight, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthSession } from "@/shared/hooks/useAuthSession";
import { ComponentProps } from "react";

interface PublicCtaButtonProps extends ComponentProps<typeof Button> {
  guestText?: string;
  authText?: string;
  guestHref?: string;
  authHref?: string;
  showArrow?: boolean;
}

export function PublicCtaButton({
  guestText = "Get started",
  authText = "Go to Dashboard",
  guestHref = "/register",
  authHref = "/dashboard",
  showArrow = true,
  className,
  size = "lg",
  ...props
}: PublicCtaButtonProps) {
  const { isAuthenticated } = useAuthSession();

  const href = isAuthenticated ? authHref : guestHref;
  const text = isAuthenticated ? authText : guestText;

  return (
    <Link href={href}>
      <Button size={size} className={className} {...props}>
        {isAuthenticated && <LayoutDashboard className="mr-2 h-4 w-4" />}
        <span>{text}</span>
        {showArrow && !isAuthenticated && <ArrowRight className="ml-2 h-4 w-4" />}
      </Button>
    </Link>
  );
}
