"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeft,
  User as UserIcon,
  Mail,
  Phone,
  Shield,
  Pencil,
  Building2,
  Users,
  CheckCircle2,
  Lock,
} from "lucide-react";

import UserForm from "@/features/users/components/UserForm";
import { getUser, updateUser } from "@/features/users/users.service";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FormSkeleton } from "@/shared/components/skeletons/SkeletonLoaders";

export default function EditUserPage() {
  const params = useParams();
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const loadUser = async () => {
    try {
      setLoading(true);
      const data = await getUser(params.userId as string);
      setUser(data);
    } catch {
      toast.error("Failed to load user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, [params.userId]);

  const handleSubmit = async (values: any) => {
    try {
      await updateUser(params.userId as string, values);
      toast.success("User updated successfully");
      setEditing(false);
      await loadUser();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update user");
    }
  };

  if (loading) {
    return (
      <div className="w-full space-y-6">
        <FormSkeleton />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <p className="text-sm text-muted-foreground">User not found.</p>
        <Button variant="outline" onClick={() => router.push("/dashboard/users")}>
          Back to Users
        </Button>
      </div>
    );
  }

  const initials =
    user.fullname
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "US";

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/dashboard/users"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-2 transition-colors font-medium"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Users
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">{user.fullname}</h1>
            <Badge variant="outline">{user.role}</Badge>
            <Badge
              variant={user.is_active ? "outline" : "secondary"}
              className={
                user.is_active
                  ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                  : "bg-muted text-muted-foreground"
              }
            >
              {user.is_active ? "Active" : "Inactive"}
            </Badge>
            {user.is_demo && (
              <Badge variant="secondary" className="text-xs">
                Demo
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground mt-1">
            User ID #{user.id} &bull; Manage member credentials, roles, and reporting chain
          </p>
        </div>
      </div>

      {/* 2-Column Responsive Layout */}
      <div className="grid gap-8 lg:grid-cols-3 items-start">
        {/* Left Column: Details or Edit Form */}
        <div className="lg:col-span-2 space-y-6">
          {editing ? (
            <UserForm
              title="Edit Member Details"
              submitLabel="Save Changes"
              initialValues={{
                fullName: user.fullname,
                email: user.email,
                phone: user.phone,
                roleId: String(user.role_id),
                reportsTo: String(user.reports_to),
              }}
              onCancel={() => setEditing(false)}
              onSubmit={handleSubmit}
            />
          ) : (
            <Card className="border-border/60 shadow-sm">
              <CardHeader className="border-b border-border/60 pb-5 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base">Member Profile</CardTitle>
                  <CardDescription className="mt-0.5">
                    Organizational identity and contact details.
                  </CardDescription>
                </div>

                <Button
                  onClick={() => setEditing(true)}
                  size="sm"
                  className="gap-1.5"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit User
                </Button>
              </CardHeader>

              <CardContent className="pt-6 space-y-6">
                {/* Avatar Banner */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border/40">
                  <div className="h-16 w-16 rounded-full bg-primary/10 text-primary font-bold text-xl flex items-center justify-center border border-primary/20 shrink-0">
                    {initials}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">{user.fullname}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Badge variant="outline" className="text-xs">
                        {user.role}
                      </Badge>
                      <span className="text-xs text-muted-foreground">&bull;</span>
                      <span className="text-xs text-muted-foreground">
                        {user.is_active ? "Active Status" : "Deactivated"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="p-4 rounded-lg border border-border/40 space-y-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-primary" />
                      Email Address
                    </span>
                    <p className="text-sm font-medium text-foreground">{user.email}</p>
                  </div>

                  <div className="p-4 rounded-lg border border-border/40 space-y-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-primary" />
                      Phone Number
                    </span>
                    <p className="text-sm font-medium text-foreground">
                      {user.phone || "No phone number registered"}
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border border-border/40 space-y-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <Shield className="h-3.5 w-3.5 text-primary" />
                      Organizational Role
                    </span>
                    <p className="text-sm font-medium text-foreground">{user.role}</p>
                  </div>

                  <div className="p-4 rounded-lg border border-border/40 space-y-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-primary" />
                      Reporting Line
                    </span>
                    <p className="text-sm font-medium text-foreground">
                      {user.reports_to ? `Reports to User #${user.reports_to}` : "Reports to Organization Head"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column: Sidebar */}
        <div className="space-y-6 lg:sticky lg:top-6">
          <Card className="border-border/60 shadow-sm overflow-hidden">
            <CardHeader className="bg-muted/30 pb-4 border-b border-border/40">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                Account Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-3.5 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-border/40">
                <span className="text-muted-foreground">User ID</span>
                <span className="font-mono text-foreground">USR-{user.id}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-border/40">
                <span className="text-muted-foreground">Role Assignment</span>
                <span className="font-medium text-foreground">{user.role}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-border/40">
                <span className="text-muted-foreground">Status</span>
                <Badge
                  variant={user.is_active ? "outline" : "secondary"}
                  className={
                    user.is_active
                      ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                      : "bg-muted text-muted-foreground"
                  }
                >
                  {user.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-muted-foreground">Role Settings</span>
                <Link
                  href={`/dashboard/settings/roles/${user.role_id}`}
                  className="text-primary hover:underline font-medium"
                >
                  View Permissions &rarr;
                </Link>
              </div>
            </CardContent>
          </Card>

          {user.is_demo && (
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-xs space-y-2 text-amber-900 dark:text-amber-200">
              <div className="flex items-center gap-1.5 font-semibold">
                <Lock className="h-4 w-4 shrink-0" />
                <span>Protected Demo Account</span>
              </div>
              <p className="leading-relaxed opacity-90">
                This account is used for evaluating CRM capabilities. Critical account parameters cannot be mutated.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
