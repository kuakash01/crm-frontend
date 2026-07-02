"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getRoles } from "@/features/roles/services/roles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUsers } from "@/features/users/users.service";
import {
  createUserSchema,
  updateUserSchema,
  CreateUserFormValues,
  UpdateUserFormValues,
} from "../users.schema";
import { ChevronsUpDown, Check } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import { cn } from "@/lib/utils";

type Role = {
  id: number;
  name: string;
};
type User = {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  is_active: boolean;
  role: string;
};

type UserFormProps = {
  title: string;
  submitLabel: string;
  loading?: boolean;

  initialValues?: UpdateUserFormValues;

  onSubmit: (
    values: CreateUserFormValues | UpdateUserFormValues,
  ) => Promise<void>;
};

export default function UserForm({
  title,
  submitLabel,
  loading,
  initialValues,
  onSubmit,
}: UserFormProps) {
  const [roles, setRoles] = useState<Role[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const [reportsToOpen, setReportsToOpen] = useState(false);
  const isEditMode = !!initialValues;

  const userForm = useForm<CreateUserFormValues | UpdateUserFormValues>({
    resolver: zodResolver(isEditMode ? updateUserSchema : createUserSchema),

    mode: "onChange",

    defaultValues: {
      fullName: initialValues?.fullName ?? "",
      email: initialValues?.email ?? "",
      phone: initialValues?.phone ?? "",
      roleId: initialValues?.roleId ?? "",
      reportsTo: initialValues?.reportsTo ?? "",

      ...(isEditMode
        ? {}
        : {
            password: "",
          }),
    },
  });

  useEffect(() => {
    console.log("initial values" ,initialValues);
    loadUsers();
    loadRoles();
  }, []);

  const loadRoles = async () => {
    const data = await getRoles();
    // data.name.toLowerCase() !== "admin";
    const assignableRoles = data.filter(
      (role: {
        id: string;
        name: string;
        description: string;
        created_at: Date;
      }) => role.name.toLowerCase() !== "admin",
    );

    setRoles(assignableRoles);
  };

  const loadUsers = async () => {
    const data = await getUsers();
    const activeUsers = data.filter((user: User) => {
      return user.is_active === true;
    });
    setUsers(activeUsers);
  };

  const handleFormSubmit = async (
    values: CreateUserFormValues | UpdateUserFormValues,
  ) => {
    await onSubmit(values);
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>

        <p className="text-sm text-muted-foreground">
          {isEditMode
            ? "Update user information and role"
            : "Create a new user for your organization"}
        </p>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={userForm.handleSubmit(handleFormSubmit)}
          className="space-y-6"
        >
          <div className="grid gap-2">
            <Label>Full Name</Label>

            <Input {...userForm.register("fullName")} />

            {userForm.formState.errors.fullName && (
              <p className="text-sm text-red-500">
                {userForm.formState.errors.fullName.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label>Email</Label>

            <Input type="email" {...userForm.register("email")} />

            {userForm.formState.errors.email && (
              <p className="text-sm text-red-500">
                {userForm.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label>Phone</Label>

            <Input {...userForm.register("phone")} />

            {userForm.formState.errors.phone && (
              <p className="text-sm text-red-500">
                {userForm.formState.errors.phone.message}
              </p>
            )}
          </div>

          {!initialValues && (
            <div className="grid gap-2">
              <Label>Password</Label>

              <Input type="password" {...userForm.register("password")} />

              {userForm.formState.errors.password && (
                <p className="text-sm text-red-500">
                  {userForm.formState.errors.password.message}
                </p>
              )}
            </div>
          )}

          <div className="grid gap-2">
            <Label>Role</Label>

            <Select
              value={userForm.watch("roleId")}
              onValueChange={(value) =>
                userForm.setValue("roleId", value, {
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>

              <SelectContent>
                {roles
                  .filter((role) => role.name.toLowerCase() !== "admin")
                  .map((role) => (
                    <SelectItem key={role.id} value={String(role.id)}>
                      {role.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            {userForm.formState.errors.roleId && (
              <p className="text-sm text-red-500">
                {userForm.formState.errors.roleId.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label>Reports To</Label>

            <Popover open={reportsToOpen} onOpenChange={setReportsToOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="justify-between font-normal"
                >
                  {userForm.watch("reportsTo")
                    ? users.find(
                        (user) =>
                          String(user.id) === userForm.watch("reportsTo"),
                      )?.fullname
                    : "Select User"}

                  <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search user..." />

                  <CommandEmpty>No user found.</CommandEmpty>

                  <CommandGroup>
                    {users.map((user) => (
                      <CommandItem
                        key={user.id}
                        value={`${user.fullname} ${user.role}`}
                        onSelect={() => {
                          userForm.setValue("reportsTo", String(user.id), {
                            shouldValidate: true,
                          });

                          setReportsToOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            userForm.watch("reportsTo") === String(user.id)
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />

                        <div>
                          <div>{user.fullname}</div>

                          <div className="text-xs text-muted-foreground">
                            {user.role}
                          </div>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : submitLabel}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
