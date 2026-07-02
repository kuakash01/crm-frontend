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
    description:
      "Manage organization information",
    href: "/dashboard/settings/organization",
  },
  {
    title: "Roles & Permissions",
    description:
      "Manage roles and access control",
    href: "/dashboard/settings/roles",
  },
  {
    title: "Profile",
    description:
      "Update your profile information",
    href: "/dashboard/settings/profile",
  },
  {
    title: "Security",
    description:
      "Password and security settings",
    href: "/dashboard/settings/security",
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="text-muted-foreground">
          Manage your CRM configuration
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {settingsItems.map(
          (item) => (
            <Link
              key={item.href}
              href={item.href}
            >
              <Card className="cursor-pointer transition hover:border-primary">
                <CardHeader>
                  <CardTitle>
                    {item.title}
                  </CardTitle>

                  <CardDescription>
                    {
                      item.description
                    }
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  Open Settings
                </CardContent>
              </Card>
            </Link>
          ),
        )}
      </div>
    </div>
  );
}