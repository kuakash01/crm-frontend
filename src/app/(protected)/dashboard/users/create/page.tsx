"use client";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import UserForm from "@/features/users/components/UseForm";

import { createUser } from "@/features/users/users.service";

export default function CreateUserPage() {

  const router =
    useRouter();

  const handleSubmit =
    async (values: any) => {

      await createUser(
        values
      );

      toast.success(
        "User created"
      );

      router.push(
        "/dashboard/users"
      );
    };

  return (
    <UserForm
      title="Create User"
      submitLabel="Create User"
      onSubmit={
        handleSubmit
      }
    />
  );
}