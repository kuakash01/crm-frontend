"use client";

import Link from "next/link";
import { Zap } from "lucide-react";

interface LogoProps {
  href?: string;
  collapsed?: boolean;
  showText?: boolean;
}

export function Logo({ href = "/", collapsed = false, showText = true }: LogoProps) {
  const content = (
    <div className="flex items-center gap-2">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg">
        <Zap className="h-5 w-5" />
      </div>
      {!collapsed && showText && (
        <div>
          <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            CRM Pro
          </span>
        </div>
      )}
    </div>
  );

//   if (href) {
//     return (
//       <Link href={href}>
//         <div className="flex items-center gap-2">
//           {content}
//         </div>
//       </Link>
//     );
//   }

  return content;
}

export function LogoExpanded() {
  return (
    <div className="flex flex-col gap-1">
      <Logo showText={true} collapsed={false} href={undefined} />
      <p className="text-xs text-muted-foreground">Sales Management</p>
    </div>
  );
}
