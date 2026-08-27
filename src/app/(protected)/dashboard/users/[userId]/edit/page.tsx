"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { toast } from "sonner";

import UserForm from "@/features/users/components/UserForm";

import { getUser, updateUser } from "@/features/users/users.service";

export default function EditUserPage() {
  const params = useParams();

  const router = useRouter();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const data = await getUser(params.userId as string);

    setUser(data);
  };

  const handleSubmit = async (values: any) => {
    await updateUser(params.userId as string, values);

    toast.success("User updated");

    router.push("/dashboard/users");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full ">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Edit User</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Edit user details to your organization.
        </p>
      </div>
      <UserForm
        title="User Details"
        submitLabel="Update User"
        initialValues={{
          fullName: user.fullname,
          email: user.email,
          phone: user.phone,
          roleId: String(user.role_id),
          reportsTo: String(user.reports_to),
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
