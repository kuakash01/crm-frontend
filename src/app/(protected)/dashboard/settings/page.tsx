"use client";

import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const settingsItems = [
  {
    title: "Organization",
    description: "Manage organization information",
    href: "/dashboard/settings/organization",
    onProgress: true,
  },
  {
    title: "Roles & Permissions",
    description: "Manage roles and access control",
    href: "/dashboard/settings/roles",
    onProgress: false,
  },
  {
    title: "Profile",
    description: "Update your profile information",
    href: "/dashboard/settings/profile",
    onProgress: false,
  },
  {
    title: "Security",
    description: "Password and security settings",
    href: "/dashboard/settings/security",
    onProgress: true,
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>

        <p className="text-muted-foreground">Manage your CRM configuration</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {settingsItems.map((item) => (
          <Link href={item.href} key={item.href}>
            <Card
              className={`relative transition ${
                item.onProgress
                  ? "cursor-not-allowed opacity-60"
                  : "cursor-pointer hover:border-primary"
              }`}
            >
              {item.onProgress ? (
                <div className="absolute right-4 top-4 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                  Coming Soon
                </div>
              ) : null}

              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>

              <CardContent>
                {item.onProgress ? "Not available yet" : "Open Settings"}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
