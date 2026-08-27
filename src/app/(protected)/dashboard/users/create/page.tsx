"use client";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import UserForm from "@/features/users/components/UserForm";

import { createUser } from "@/features/users/users.service";

export default function CreateUserPage() {
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    await createUser(values);

    toast.success("User created");

    router.push("/dashboard/users");
  };

  return (
    <div className="w-full ">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create User</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Add a new member to your organization and send them an invitation to
          complete their account.
        </p>
      </div>

      {/* Form */}
      <UserForm
        title="User Details"
        submitLabel="Send Invitation"
        onSubmit={handleSubmit}
      />
    </div>
  );
}
