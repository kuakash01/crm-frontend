"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeft,
  UserPlus,
  ShieldCheck,
  Mail,
  CheckCircle2,
  Users,
  Sparkles,
} from "lucide-react";

import UserForm from "@/features/users/components/UserForm";
import { createUser } from "@/features/users/users.service";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CreateUserPage() {
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    try {
      await createUser(values);
      toast.success("User invitation sent successfully");
      router.push("/dashboard/users");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to create user");
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <Link
          href="/dashboard/users"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-2 transition-colors font-medium"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Users
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Create User</h1>
        <p className="text-muted-foreground mt-1">
          Add a new member to your organization and send an invitation to complete account setup.
        </p>
      </div>

      {/* 2-Column Responsive Layout */}
      <div className="grid gap-8 lg:grid-cols-3 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-2 space-y-6">
          <UserForm
            title="Member Information"
            submitLabel="Send Invitation"
            onCancel={() => router.push("/dashboard/users")}
            onSubmit={handleSubmit}
          />
        </div>

        {/* Right Column: Guidance Sidebar */}
        <div className="space-y-6 lg:sticky lg:top-6">
          {/* Invitation Process Card */}
          <Card className="border-border/60 shadow-sm overflow-hidden">
            <CardHeader className="bg-muted/30 pb-4 border-b border-border/40">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                Invitation Workflow
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-5 space-y-3.5 text-xs text-muted-foreground">
              <div className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px] shrink-0">
                  1
                </div>
                <div>
                  <span className="font-semibold text-foreground">Invitation Dispatched</span>
                  <p className="text-[11px] mt-0.5">An activation email containing a secure link is sent to the user.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px] shrink-0">
                  2
                </div>
                <div>
                  <span className="font-semibold text-foreground">Credential Setup</span>
                  <p className="text-[11px] mt-0.5">User defines their personal password and verifies account identity.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px] shrink-0">
                  3
                </div>
                <div>
                  <span className="font-semibold text-foreground">Workspace Onboarding</span>
                  <p className="text-[11px] mt-0.5">Member gains immediate access to assigned leads, deals, and activities.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Role Governance Card */}
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-3 border-b border-border/40">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Role & Access Governance
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-2.5 text-xs text-muted-foreground leading-relaxed">
              <p>
                Assigned roles dictate granular module permissions for Leads, Deals, Customers, and Services.
              </p>
              <p>
                You can customize role permissions anytime in <strong>Settings &rarr; Roles & Permissions</strong>.
              </p>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-primary">
              <Sparkles className="h-4 w-4 shrink-0" />
              <span>Seat & License Allocation</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              New team members are assigned standard organizational seat permissions upon accepting their invitation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
