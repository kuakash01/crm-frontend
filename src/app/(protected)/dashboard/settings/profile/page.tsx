// "use client";

// import { useEffect, useState } from "react";
// import { toast } from "sonner";
// import {
//   User,
//   Mail,
//   Phone,
//   Briefcase,
//   Building2,
//   UserRound,
//   Pencil,
//   X,
//   Check,
// } from "lucide-react";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// import {
//   getMyProfile,
//   updateMyProfile,
// } from "@/features/users/users.service";

// import {
//   updateMyProfileSchema,
//   UpdateMyProfileValues,
// } from "@/features/users/users.schema";

// type Profile = {
//   id: number;
//   fullName: string;
//   email: string;
//   phone: string | null;
//   profilePic: string | null;
//   emailVerified: boolean;
//   isActive: boolean;
//   organizationId: number;
//   organization: string;
//   roleId: number;
//   role: string;
//   reportsTo: number | null;
//   reportsToName: string | null;
//   createdAt: string;
//   updatedAt: string;
// };

// export default function ProfilePage() {
//   const [profile, setProfile] =
//     useState<Profile | null>(null);

//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);

//   const [saving, setSaving] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<UpdateMyProfileValues>({
//     resolver: zodResolver(updateMyProfileSchema),
//     defaultValues: {
//       fullName: "",
//       phone: "",
//     },
//   });

//   useEffect(() => {
//     loadProfile();
//   }, []);

//   const loadProfile = async () => {
//     try {
//       setLoading(true);

//       const data = await getMyProfile();

//       setProfile(data);

//       reset({
//         fullName: data.fullName,
//         phone: data.phone ?? "",
//       });
//     } catch (error: any) {
//       toast.error(
//         error?.response?.data?.message ||
//           "Failed to load profile",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = () => {
//     if (!profile) return;

//     reset({
//       fullName: profile.fullName,
//       phone: profile.phone ?? "",
//     });

//     setEditing(true);
//   };

//   const handleCancel = () => {
//     if (!profile) return;

//     reset({
//       fullName: profile.fullName,
//       phone: profile.phone ?? "",
//     });

//     setEditing(false);
//   };

//   const handleSave = async (
//     values: UpdateMyProfileValues,
//   ) => {
//     try {
//       setSaving(true);

//       const updated =
//         await updateMyProfile(values);

//       setProfile((current) =>
//         current
//           ? {
//               ...current,
//               fullName: updated.fullName,
//               phone: updated.phone,
//               profilePic: updated.profilePic,
//               updatedAt: updated.updatedAt,
//             }
//           : current,
//       );

//       setEditing(false);

//       toast.success(
//         "Profile updated successfully.",
//       );
//     } catch (error: any) {
//       toast.error(
//         error?.response?.data?.message ||
//           "Failed to update profile",
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) {
//     return (
//       <main className="min-h-full bg-background">
//         <div className="mx-auto w-full max-w-5xl px-6 py-8">
//           <div className="text-sm text-muted-foreground">
//             Loading profile...
//           </div>
//         </div>
//       </main>
//     );
//   }

//   if (!profile) {
//     return (
//       <main className="min-h-full bg-background">
//         <div className="mx-auto w-full max-w-5xl px-6 py-8">
//           <Card>
//             <CardContent className="py-10 text-center">
//               <p className="text-sm text-muted-foreground">
//                 Unable to load profile.
//               </p>
//             </CardContent>
//           </Card>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-full bg-background">
//       <div className="mx-auto w-full max-w-5xl px-6 py-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold tracking-tight">
//             Profile
//           </h1>

//           <p className="mt-2 text-sm text-muted-foreground">
//             Manage your account information.
//           </p>
//         </div>

//         <div className="space-y-6">
//           {/* Personal Information */}
//           <Card>
//             <CardHeader>
//               <div className="flex items-start justify-between gap-4">
//                 <div>
//                   <CardTitle>
//                     Personal Information
//                   </CardTitle>

//                   <CardDescription>
//                     Your account and contact details.
//                   </CardDescription>
//                 </div>

//                 {!editing && (
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={handleEdit}
//                   >
//                     <Pencil className="mr-2 h-4 w-4" />
//                     Edit
//                   </Button>
//                 )}
//               </div>
//             </CardHeader>

//             <CardContent>
//               {editing ? (
//                 <form
//                   onSubmit={handleSubmit(
//                     handleSave,
//                   )}
//                   className="space-y-5"
//                 >
//                   {/* Full Name */}
//                   <div className="grid gap-2">
//                     <Label htmlFor="fullName">
//                       Full Name
//                     </Label>

//                     <Input
//                       id="fullName"
//                       {...register("fullName")}
//                     />

//                     {errors.fullName && (
//                       <p className="text-sm text-red-500">
//                         {
//                           errors.fullName
//                             .message
//                         }
//                       </p>
//                     )}
//                   </div>

//                   {/* Email */}
//                   <div className="grid gap-2">
//                     <Label htmlFor="email">
//                       Email
//                     </Label>

//                     <Input
//                       id="email"
//                       type="email"
//                       value={profile.email}
//                       disabled
//                     />

//                     <p className="text-xs text-muted-foreground">
//                       Email changes require a separate
//                       verification process.
//                     </p>
//                   </div>

//                   {/* Phone */}
//                   <div className="grid gap-2">
//                     <Label htmlFor="phone">
//                       Phone
//                     </Label>

//                     <Input
//                       id="phone"
//                       {...register("phone")}
//                     />

//                     {errors.phone && (
//                       <p className="text-sm text-red-500">
//                         {
//                           errors.phone
//                             .message
//                         }
//                       </p>
//                     )}
//                   </div>

//                   {/* Actions */}
//                   <div className="flex justify-end gap-2">
//                     <Button
//                       type="button"
//                       variant="outline"
//                       onClick={handleCancel}
//                       disabled={saving}
//                     >
//                       <X className="mr-2 h-4 w-4" />
//                       Cancel
//                     </Button>

//                     <Button
//                       type="submit"
//                       disabled={saving}
//                     >
//                       <Check className="mr-2 h-4 w-4" />
//                       {saving
//                         ? "Saving..."
//                         : "Save Changes"}
//                     </Button>
//                   </div>
//                 </form>
//               ) : (
//                 <div className="grid gap-6 sm:grid-cols-2">
//                   {/* Full Name */}
//                   <div className="flex items-start gap-3">
//                     <User className="mt-0.5 h-4 w-4 text-muted-foreground" />

//                     <div>
//                       <p className="text-sm text-muted-foreground">
//                         Full Name
//                       </p>

//                       <p className="mt-1 font-medium">
//                         {profile.fullName}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Email */}
//                   <div className="flex items-start gap-3">
//                     <Mail className="mt-0.5 h-4 w-4 text-muted-foreground" />

//                     <div>
//                       <p className="text-sm text-muted-foreground">
//                         Email
//                       </p>

//                       <p className="mt-1 font-medium">
//                         {profile.email}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Phone */}
//                   <div className="flex items-start gap-3">
//                     <Phone className="mt-0.5 h-4 w-4 text-muted-foreground" />

//                     <div>
//                       <p className="text-sm text-muted-foreground">
//                         Phone
//                       </p>

//                       <p className="mt-1 font-medium">
//                         {profile.phone ||
//                           "Not provided"}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Role */}
//                   <div className="flex items-start gap-3">
//                     <Briefcase className="mt-0.5 h-4 w-4 text-muted-foreground" />

//                     <div>
//                       <p className="text-sm text-muted-foreground">
//                         Role
//                       </p>

//                       <p className="mt-1 font-medium">
//                         {profile.role}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Organization */}
//                   <div className="flex items-start gap-3">
//                     <Building2 className="mt-0.5 h-4 w-4 text-muted-foreground" />

//                     <div>
//                       <p className="text-sm text-muted-foreground">
//                         Organization
//                       </p>

//                       <p className="mt-1 font-medium">
//                         {profile.organization}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Reports To */}
//                   <div className="flex items-start gap-3">
//                     <UserRound className="mt-0.5 h-4 w-4 text-muted-foreground" />

//                     <div>
//                       <p className="text-sm text-muted-foreground">
//                         Reports To
//                       </p>

//                       <p className="mt-1 font-medium">
//                         {profile.reportsToName ||
//                           "None"}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           {/* Account */}
//           <Card>
//             <CardHeader>
//               <CardTitle>
//                 Account
//               </CardTitle>

//               <CardDescription>
//                 Account status and verification information.
//               </CardDescription>
//             </CardHeader>

//             <CardContent>
//               <div className="grid gap-6 sm:grid-cols-2">
//                 <div>
//                   <p className="text-sm text-muted-foreground">
//                     Email Verification
//                   </p>

//                   <p className="mt-1 font-medium">
//                     {profile.emailVerified
//                       ? "Verified"
//                       : "Not verified"}
//                   </p>
//                 </div>

//                 <div>
//                   <p className="text-sm text-muted-foreground">
//                     Account Status
//                   </p>

//                   <p className="mt-1 font-medium">
//                     {profile.isActive
//                       ? "Active"
//                       : "Inactive"}
//                   </p>
//                 </div>

//                 <div>
//                   <p className="text-sm text-muted-foreground">
//                     Member Since
//                   </p>

//                   <p className="mt-1 font-medium">
//                     {new Date(
//                       profile.createdAt,
//                     ).toLocaleDateString()}
//                   </p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </main>
//   );
// }





"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Building2,
  UserRound,
  Pencil,
  X,
  Check,
  Lock,
  Eye,
  EyeOff,
  ShieldAlert,
} from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  getMyProfile,
  updateMyProfile,
} from "@/features/users/users.service";

import { changePassword } from "@/features/auth/services/auth.service";

import {
  updateMyProfileSchema,
  UpdateMyProfileValues,
  changePasswordSchema,
  ChangePasswordValues,
} from "@/features/users/users.schema";

type Profile = {
  id: number;
  fullName: string;
  email: string;
  phone: string | null;
  profilePic: string | null;
  emailVerified: boolean;
  isActive: boolean;
  organizationId: number;
  organization: string;
  roleId: number;
  role: string;
  reportsTo: number | null;
  reportsToName: string | null;
  createdAt: string;
  updatedAt: string;
  isDemo?: boolean;
};

export default function ProfilePage() {
  const [profile, setProfile] =
    useState<Profile | null>(null);

  const [loading, setLoading] = useState(true);

  const isDemo = Boolean(
    profile?.isDemo ||
    profile?.email?.toLowerCase().includes("demo") ||
    profile?.email?.includes("acme") ||
    profile?.email?.includes("globex")
  );

  // Profile editing
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Password form visibility
  const [changingPassword, setChangingPassword] =
    useState(false);

  // Password API loading
  const [passwordSaving, setPasswordSaving] =
    useState(false);

  // Password visibility
  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  // -----------------------------------------
  // Profile form
  // -----------------------------------------

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateMyProfileValues>({
    resolver: zodResolver(
      updateMyProfileSchema,
    ),
    defaultValues: {
      fullName: "",
      phone: "",
    },
  });

  // -----------------------------------------
  // Password form
  // -----------------------------------------

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPasswordForm,
    formState: {
      errors: passwordErrors,
    },
  } = useForm<ChangePasswordValues>({
    resolver: zodResolver(
      changePasswordSchema,
    ),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // -----------------------------------------
  // Load profile
  // -----------------------------------------

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);

      const data = await getMyProfile();

      setProfile(data);

      reset({
        fullName: data.fullName,
        phone: data.phone ?? "",
      });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to load profile",
      );
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------------------
  // Edit profile
  // -----------------------------------------

  const handleEdit = () => {
    if (!profile) return;

    reset({
      fullName: profile.fullName,
      phone: profile.phone ?? "",
    });

    setEditing(true);
  };

  const handleCancel = () => {
    if (!profile) return;

    reset({
      fullName: profile.fullName,
      phone: profile.phone ?? "",
    });

    setEditing(false);
  };

  const handleSave = async (
    values: UpdateMyProfileValues,
  ) => {
    try {
      setSaving(true);

      const updated =
        await updateMyProfile(values);

      setProfile((current) =>
        current
          ? {
              ...current,
              fullName: updated.fullName,
              phone: updated.phone,
              profilePic: updated.profilePic,
              updatedAt: updated.updatedAt,
            }
          : current,
      );

      setEditing(false);

      toast.success(
        "Profile updated successfully.",
      );
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update profile",
      );
    } finally {
      setSaving(false);
    }
  };

  // -----------------------------------------
  // Change password
  // -----------------------------------------

  const handleChangePassword = async (
    values: ChangePasswordValues,
  ) => {
    try {
      setPasswordSaving(true);

      await changePassword({
        currentPassword:
          values.currentPassword,
        newPassword: values.newPassword,
      });

      resetPasswordForm();

      setChangingPassword(false);

      toast.success(
        "Password changed successfully.",
      );
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to change password",
      );
    } finally {
      setPasswordSaving(false);
    }
  };

  // -----------------------------------------
  // Loading
  // -----------------------------------------

  if (loading) {
    return (
      <main className="min-h-full bg-background">
        <div className="mx-auto w-full max-w-5xl px-6 py-8">
          <div className="text-sm text-muted-foreground">
            Loading profile...
          </div>
        </div>
      </main>
    );
  }

  // -----------------------------------------
  // Error
  // -----------------------------------------

  if (!profile) {
    return (
      <main className="min-h-full bg-background">
        <div className="mx-auto w-full max-w-5xl px-6 py-8">
          <Card>
            <CardContent className="py-10 text-center">
              <p className="text-sm text-muted-foreground">
                Unable to load profile.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  // -----------------------------------------
  // Page
  // -----------------------------------------

  return (
    <main className="min-h-full bg-background">
      <div className="mx-auto w-full ">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Profile
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Manage your account information and
            security settings.
          </p>
        </div>

        {isDemo && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
            <ShieldAlert className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-amber-900 dark:text-amber-200">
                Portfolio Demo Account (Protected Mode)
              </h4>
              <p className="text-xs text-amber-800/80 dark:text-amber-300/80 mt-0.5 leading-relaxed">
                Profile edits and password changes are disabled on demo accounts to ensure a seamless evaluation experience for all reviewers.
              </p>
            </div>
          </div>
        )}

        <div className="space-y-6">

          {/* ========================================
              Personal Information
          ======================================== */}

          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle>
                    Personal Information
                  </CardTitle>

                  <CardDescription>
                    Your account and contact details.
                  </CardDescription>
                </div>

                {!editing && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={isDemo ? () => toast.info("Profile editing is locked on demo accounts.") : handleEdit}
                    disabled={isDemo}
                    className={isDemo ? "opacity-60 cursor-not-allowed" : ""}
                  >
                    {isDemo ? <Lock className="mr-2 h-4 w-4" /> : <Pencil className="mr-2 h-4 w-4" />}
                    {isDemo ? "Locked (Demo)" : "Edit"}
                  </Button>
                )}
              </div>
            </CardHeader>

            <CardContent>
              {editing ? (
                <form
                  onSubmit={handleSubmit(
                    handleSave,
                  )}
                  className="space-y-5"
                >
                  {/* Full Name */}

                  <div className="grid gap-2">
                    <Label htmlFor="fullName">
                      Full Name
                    </Label>

                    <Input
                      id="fullName"
                      {...register(
                        "fullName",
                      )}
                    />

                    {errors.fullName && (
                      <p className="text-sm text-red-500">
                        {
                          errors.fullName
                            .message
                        }
                      </p>
                    )}
                  </div>

                  {/* Email */}

                  <div className="grid gap-2">
                    <Label htmlFor="email">
                      Email
                    </Label>

                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      disabled
                    />

                    <p className="text-xs text-muted-foreground">
                      Email changes require a
                      separate verification process.
                    </p>
                  </div>

                  {/* Phone */}

                  <div className="grid gap-2">
                    <Label htmlFor="phone">
                      Phone
                    </Label>

                    <Input
                      id="phone"
                      {...register("phone")}
                    />

                    {errors.phone && (
                      <p className="text-sm text-red-500">
                        {
                          errors.phone.message
                        }
                      </p>
                    )}
                  </div>

                  {/* Actions */}

                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                      disabled={saving}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>

                    <Button
                      type="submit"
                      disabled={saving}
                    >
                      <Check className="mr-2 h-4 w-4" />

                      {saving
                        ? "Saving..."
                        : "Save Changes"}
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2">

                  {/* Full Name */}

                  <div className="flex items-start gap-3">
                    <User className="mt-0.5 h-4 w-4 text-muted-foreground" />

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Full Name
                      </p>

                      <p className="mt-1 font-medium">
                        {profile.fullName}
                      </p>
                    </div>
                  </div>

                  {/* Email */}

                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 text-muted-foreground" />

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Email
                      </p>

                      <p className="mt-1 font-medium">
                        {profile.email}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}

                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-4 w-4 text-muted-foreground" />

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Phone
                      </p>

                      <p className="mt-1 font-medium">
                        {profile.phone ||
                          "Not provided"}
                      </p>
                    </div>
                  </div>

                  {/* Role */}

                  <div className="flex items-start gap-3">
                    <Briefcase className="mt-0.5 h-4 w-4 text-muted-foreground" />

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Role
                      </p>

                      <p className="mt-1 font-medium">
                        {profile.role}
                      </p>
                    </div>
                  </div>

                  {/* Organization */}

                  <div className="flex items-start gap-3">
                    <Building2 className="mt-0.5 h-4 w-4 text-muted-foreground" />

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Organization
                      </p>

                      <p className="mt-1 font-medium">
                        {profile.organization}
                      </p>
                    </div>
                  </div>

                  {/* Reports To */}

                  <div className="flex items-start gap-3">
                    <UserRound className="mt-0.5 h-4 w-4 text-muted-foreground" />

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Reports To
                      </p>

                      <p className="mt-1 font-medium">
                        {profile.reportsToName ||
                          "None"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* ========================================
              Account
          ======================================== */}

          <Card>
            <CardHeader>
              <CardTitle>
                Account
              </CardTitle>

              <CardDescription>
                Account status and verification
                information.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2">

                <div>
                  <p className="text-sm text-muted-foreground">
                    Email Verification
                  </p>

                  <p className="mt-1 font-medium">
                    {profile.emailVerified
                      ? "Verified"
                      : "Not verified"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Account Status
                  </p>

                  <p className="mt-1 font-medium">
                    {profile.isActive
                      ? "Active"
                      : "Inactive"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Member Since
                  </p>

                  <p className="mt-1 font-medium">
                    {new Date(
                      profile.createdAt,
                    ).toLocaleDateString()}
                  </p>
                </div>

              </div>
            </CardContent>
          </Card>

          {/* ========================================
              Security
          ======================================== */}

          <Card>
            <CardHeader>
              <CardTitle>
                Security
              </CardTitle>

              <CardDescription>
                Manage your password and account
                security.
              </CardDescription>
            </CardHeader>

            <CardContent>
              {changingPassword ? (
                <form
                  onSubmit={handlePasswordSubmit(
                    handleChangePassword,
                  )}
                  className="max-w-lg space-y-5"
                >
                  {/* Current Password */}

                  <div className="grid gap-2">
                    <Label htmlFor="currentPassword">
                      Current Password
                    </Label>

                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={
                          showCurrentPassword
                            ? "text"
                            : "password"
                        }
                        className="pr-10"
                        {...registerPassword(
                          "currentPassword",
                        )}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowCurrentPassword(
                            (current) =>
                              !current,
                          )
                        }
                        className="absolute right-0 top-0 flex h-full w-10 items-center justify-center text-muted-foreground hover:text-foreground"
                        aria-label={
                          showCurrentPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showCurrentPassword ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    {passwordErrors.currentPassword && (
                      <p className="text-sm text-red-500">
                        {
                          passwordErrors
                            .currentPassword
                            .message
                        }
                      </p>
                    )}
                  </div>

                  {/* New Password */}

                  <div className="grid gap-2">
                    <Label htmlFor="newPassword">
                      New Password
                    </Label>

                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={
                          showNewPassword
                            ? "text"
                            : "password"
                        }
                        className="pr-10"
                        {...registerPassword(
                          "newPassword",
                        )}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowNewPassword(
                            (current) =>
                              !current,
                          )
                        }
                        className="absolute right-0 top-0 flex h-full w-10 items-center justify-center text-muted-foreground hover:text-foreground"
                        aria-label={
                          showNewPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showNewPassword ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    {passwordErrors.newPassword && (
                      <p className="text-sm text-red-500">
                        {
                          passwordErrors.newPassword
                            .message
                        }
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}

                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">
                      Confirm New Password
                    </Label>

                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={
                          showConfirmPassword
                            ? "text"
                            : "password"
                        }
                        className="pr-10"
                        {...registerPassword(
                          "confirmPassword",
                        )}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(
                            (current) =>
                              !current,
                          )
                        }
                        className="absolute right-0 top-0 flex h-full w-10 items-center justify-center text-muted-foreground hover:text-foreground"
                        aria-label={
                          showConfirmPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showConfirmPassword ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    {passwordErrors.confirmPassword && (
                      <p className="text-sm text-red-500">
                        {
                          passwordErrors
                            .confirmPassword
                            .message
                        }
                      </p>
                    )}
                  </div>

                  {/* Actions */}

                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        resetPasswordForm();
                        setChangingPassword(
                          false,
                        );
                      }}
                      disabled={passwordSaving}
                    >
                      Cancel
                    </Button>

                    <Button
                      type="submit"
                      disabled={passwordSaving}
                    >
                      {passwordSaving
                        ? "Changing..."
                        : "Change Password"}
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <Lock className="mt-0.5 h-4 w-4 text-muted-foreground" />

                    <div>
                      <p className="font-medium">
                        Password
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Update your password to
                        keep your account secure.
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    onClick={isDemo ? () => toast.info("Password change is locked on demo accounts.") : () => {
                      resetPasswordForm();
                      setChangingPassword(true);
                    }}
                    disabled={isDemo}
                    className={isDemo ? "opacity-60 cursor-not-allowed" : ""}
                  >
                    {isDemo ? <Lock className="mr-2 h-4 w-4" /> : null}
                    {isDemo ? "Locked (Demo)" : "Change Password"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}