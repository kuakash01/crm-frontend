"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Phone, Shield, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getRoles } from "@/features/roles/services/roles";
import { userSchema, UserFormValues } from "@/features/users/users.schema";
import UserSelect from "@/shared/components/user-assignment/UserSelect";

type Role = {
  id: number;
  name: string;
};

type UserFormProps = {
  title: string;
  submitLabel: string;
  loading?: boolean;
  initialValues?: Partial<UserFormValues>;
  onCancel?: () => void;
  onSubmit: (values: UserFormValues) => Promise<void>;
};

export default function UserForm({
  title,
  submitLabel,
  loading = false,
  initialValues,
  onCancel,
  onSubmit,
}: UserFormProps) {
  const [roles, setRoles] = useState<Role[]>([]);
  const isEditMode = Boolean(initialValues);

  const userForm = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    mode: "onChange",
    defaultValues: {
      fullName: initialValues?.fullName ?? "",
      email: initialValues?.email ?? "",
      phone: initialValues?.phone ?? "",
      roleId: initialValues?.roleId ?? "",
      reportsTo: initialValues?.reportsTo ?? "",
    },
  });

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    try {
      const data = await getRoles();
      const assignableRoles = data.filter(
        (role: { id: string; name: string }) => role.name.toLowerCase() !== "admin"
      );
      setRoles(assignableRoles);
    } catch (error) {
      console.error("Failed to load roles:", error);
    }
  };

  const handleFormSubmit = async (values: UserFormValues) => {
    if (isEditMode) {
      await onSubmit({
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        roleId: values.roleId,
        reportsTo: values.reportsTo,
      });
      return;
    }
    await onSubmit(values);
  };

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-4 border-b border-border/40">
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="mt-1">
          {isEditMode
            ? "Update team member details and reporting structure."
            : "Invite a new member to collaborate in your organization."}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-6">
        <form
          onSubmit={userForm.handleSubmit(handleFormSubmit)}
          className="space-y-6"
        >
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Full Name <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="fullName"
                placeholder="Sarah Connor"
                className="pl-9 h-10"
                {...userForm.register("fullName")}
              />
            </div>
            {userForm.formState.errors.fullName && (
              <p className="text-sm text-destructive">
                {userForm.formState.errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Email Address <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="sarah@example.com"
                disabled={isEditMode}
                className={`pl-9 h-10 ${isEditMode ? "bg-muted/40 cursor-not-allowed" : ""}`}
                {...userForm.register("email")}
              />
            </div>
            {isEditMode ? (
              <p className="text-xs text-muted-foreground">
                Email address is permanently bound to the user profile and cannot be changed here.
              </p>
            ) : (
              <p className="text-xs text-muted-foreground">
                An invitation email will be delivered to this address to set up password and credentials.
              </p>
            )}
            {userForm.formState.errors.email && (
              <p className="text-sm text-destructive">
                {userForm.formState.errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Phone Number <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                placeholder="+1 (555) 234-5678"
                className="pl-9 h-10"
                {...userForm.register("phone")}
              />
            </div>
            {userForm.formState.errors.phone && (
              <p className="text-sm text-destructive">
                {userForm.formState.errors.phone.message}
              </p>
            )}
          </div>

          {/* Role & Reports To Grid */}
          <div className="grid gap-6 md:grid-cols-2 pt-2 border-t border-border/40">
            {/* Role */}
            <div className="space-y-2">
              <Label htmlFor="role" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Assigned Role <span className="text-destructive">*</span>
              </Label>
              <Select
                value={userForm.watch("roleId") || undefined}
                onValueChange={(value) => {
                  userForm.setValue("roleId", value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
              >
                <SelectTrigger id="role" className="h-10">
                  <SelectValue placeholder="Select team role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={String(role.id)}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {userForm.formState.errors.roleId && (
                <p className="text-sm text-destructive">
                  {userForm.formState.errors.roleId.message}
                </p>
              )}
            </div>

            {/* Reports To */}
            <div className="space-y-2">
              <Label htmlFor="reportsTo" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Reporting Manager
              </Label>
              <UserSelect
                value={
                  userForm.watch("reportsTo")
                    ? Number(userForm.watch("reportsTo"))
                    : undefined
                }
                onChange={(user) => {
                  userForm.setValue("reportsTo", String(user.id), {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
                canAssign={true}
              />
              {userForm.formState.errors.reportsTo && (
                <p className="text-sm text-destructive">
                  {userForm.formState.errors.reportsTo.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-border/40">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={loading} className="min-w-[130px]">
              {loading ? "Saving..." : submitLabel}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
