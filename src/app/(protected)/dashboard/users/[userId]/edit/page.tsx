"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { toast } from "sonner";

import UserForm from "@/features/users/components/UseForm";

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
      <UserForm
        title="Edit User"
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
  );
}
