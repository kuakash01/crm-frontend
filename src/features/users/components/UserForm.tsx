// "use client";

// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import { getRoles } from "@/features/roles/services/roles";

// import {
//   createUserSchema,
//   updateUserSchema,
//   CreateUserFormValues,
//   UpdateUserFormValues,
// } from "@/features/users/users.schema";

// import UserSelect from "@/shared/components/user-assignment/UserSelect";

// type Role = {
//   id: number;
//   name: string;
// };

// type UserFormProps = {
//   title: string;
//   submitLabel: string;
//   loading?: boolean;

//   initialValues?: UpdateUserFormValues;

//   onSubmit: (
//     values: CreateUserFormValues | UpdateUserFormValues,
//   ) => Promise<void>;
// };

// export default function UserForm({
//   title,
//   submitLabel,
//   loading,
//   initialValues,
//   onSubmit,
// }: UserFormProps) {
//   const [roles, setRoles] = useState<Role[]>([]);

//   const isEditMode = !!initialValues;

//   const userForm = useForm<CreateUserFormValues | UpdateUserFormValues>({
//     resolver: zodResolver(isEditMode ? updateUserSchema : createUserSchema),

//     mode: "onChange",

//     defaultValues: {
//       fullName: initialValues?.fullName ?? "",
//       email: initialValues?.email ?? "",
//       phone: initialValues?.phone ?? "",
//       roleId: initialValues?.roleId ?? "",
//       reportsTo: initialValues?.reportsTo ?? "",

//       ...(isEditMode
//         ? {}
//         : {
//             password: "",
//           }),
//     },
//   });

//   useEffect(() => {
//     loadRoles();
//   }, []);

//   const loadRoles = async () => {
//     try {
//       const data = await getRoles();

//       const assignableRoles = data.filter(
//         (role: {
//           id: string;
//           name: string;
//           description: string;
//           created_at: Date;
//         }) => role.name.toLowerCase() !== "admin",
//       );

//       setRoles(assignableRoles);
//     } catch (error) {
//       console.error("Failed to load roles:", error);
//     }
//   };

//   const handleFormSubmit = async (
//     values: CreateUserFormValues | UpdateUserFormValues,
//   ) => {
//     await onSubmit(values);
//   };

//   return (
//     <Card className="mx-auto max-w-4xl">
//       <CardHeader>
//         <CardTitle className="text-2xl">{title}</CardTitle>

//         <p className="text-sm text-muted-foreground">
//           {isEditMode
//             ? "Update user information and role"
//             : "Create a new user for your organization"}
//         </p>
//       </CardHeader>

//       <CardContent>
//         <form
//           onSubmit={userForm.handleSubmit(handleFormSubmit)}
//           className="space-y-6"
//         >
//           {/* Full Name */}

//           <div className="grid gap-2">
//             <Label htmlFor="fullName">Full Name</Label>

//             <Input id="fullName" {...userForm.register("fullName")} />

//             {userForm.formState.errors.fullName && (
//               <p className="text-sm text-red-500">
//                 {userForm.formState.errors.fullName.message}
//               </p>
//             )}
//           </div>

//           {/* Email */}

//           <div className="grid gap-2">
//             <Label htmlFor="email">Email</Label>

//             <Input id="email" type="email" {...userForm.register("email")} />

//             {userForm.formState.errors.email && (
//               <p className="text-sm text-red-500">
//                 {userForm.formState.errors.email.message}
//               </p>
//             )}
//           </div>

//           {/* Phone */}

//           <div className="grid gap-2">
//             <Label htmlFor="phone">Phone</Label>

//             <Input id="phone" {...userForm.register("phone")} />

//             {userForm.formState.errors.phone && (
//               <p className="text-sm text-red-500">
//                 {userForm.formState.errors.phone.message}
//               </p>
//             )}
//           </div>

//           {/* Password */}

//           {!isEditMode && (
//             <div className="grid gap-2">
//               <Label htmlFor="password">Password</Label>

//               <Input
//                 id="password"
//                 type="password"
//                 {...userForm.register("password")}
//               />

//               {userForm.formState.errors.password && (
//                 <p className="text-sm text-red-500">
//                   {userForm.formState.errors.password.message}
//                 </p>
//               )}
//             </div>
//           )}

//           {/* Role */}

//           <div className="grid gap-2">
//             <Label>Role</Label>

//             <Select
//               value={userForm.watch("roleId")}
//               onValueChange={(value) => {
//                 userForm.setValue("roleId", value, {
//                   shouldValidate: true,
//                   shouldDirty: true,
//                 });
//               }}
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Select role" />
//               </SelectTrigger>

//               <SelectContent>
//                 {roles.map((role) => (
//                   <SelectItem key={role.id} value={String(role.id)}>
//                     {role.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             {userForm.formState.errors.roleId && (
//               <p className="text-sm text-red-500">
//                 {userForm.formState.errors.roleId.message}
//               </p>
//             )}
//           </div>

//           {/* Reports To */}

//           <div className="grid gap-2">
//             <Label>Reports To</Label>

//             <UserSelect
//               value={
//                 userForm.watch("reportsTo")
//                   ? Number(userForm.watch("reportsTo"))
//                   : undefined
//               }
//               onChange={(user) => {
//                 userForm.setValue("reportsTo", String(user.id), {
//                   shouldValidate: true,
//                   shouldDirty: true,
//                 });
//               }}
//               canAssign={true}
//             />

//             {userForm.formState.errors.reportsTo && (
//               <p className="text-sm text-red-500">
//                 {userForm.formState.errors.reportsTo.message}
//               </p>
//             )}
//           </div>

//           {/* Submit */}

//           <div className="flex justify-end">
//             <Button type="submit" disabled={loading}>
//               {loading ? "Saving..." : submitLabel}
//             </Button>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }









"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

  onSubmit: (values: UserFormValues) => Promise<void>;
};

export default function UserForm({
  title,
  submitLabel,
  loading = false,
  initialValues,
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
        (role: {
          id: string;
          name: string;
          description: string;
          created_at: Date;
        }) => role.name.toLowerCase() !== "admin",
      );

      setRoles(assignableRoles);
    } catch (error) {
      console.error("Failed to load roles:", error);
    }
  };

  const handleFormSubmit = async (values: UserFormValues) => {
    if (isEditMode) {
      // Email is intentionally NOT sent in update API.
      await onSubmit({
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        roleId: values.roleId,
        reportsTo: values.reportsTo,
      });

      return;
    }

    // Create user → email is included.
    await onSubmit(values);
  };

  return (
    <Card className="max-w-4xl">
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
          {/* Full Name */}
          <div className="grid gap-2">
            <Label htmlFor="fullName">Full Name</Label>

            <Input id="fullName" {...userForm.register("fullName")} />

            {userForm.formState.errors.fullName && (
              <p className="text-sm text-red-500">
                {userForm.formState.errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              type="email"
              disabled={isEditMode}
              {...userForm.register("email")}
            />

            {isEditMode && (
              <p className="text-xs text-muted-foreground">
                Email cannot be changed from this form.
              </p>
            )}

            {userForm.formState.errors.email && (
              <p className="text-sm text-red-500">
                {userForm.formState.errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>

            <Input id="phone" {...userForm.register("phone")} />

            {userForm.formState.errors.phone && (
              <p className="text-sm text-red-500">
                {userForm.formState.errors.phone.message}
              </p>
            )}
          </div>

          {/* Role */}
          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>

            <Select
              value={userForm.watch("roleId") || undefined}
              onValueChange={(value) => {
                userForm.setValue("roleId", value, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            >
              <SelectTrigger id="role">
                <SelectValue placeholder="Select role" />
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
              <p className="text-sm text-red-500">
                {userForm.formState.errors.roleId.message}
              </p>
            )}
          </div>

          {/* Reports To */}
          <div className="grid gap-2">
            <Label htmlFor="reportsTo">Reports To</Label>

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
              <p className="text-sm text-red-500">
                {userForm.formState.errors.reportsTo.message}
              </p>
            )}
          </div>

          {/* Submit */}
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
