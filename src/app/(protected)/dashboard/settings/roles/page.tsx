"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { AxiosError } from "axios";

import {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
} from "@/features/roles/services/roles";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Role = {
  id: number;
  name: string;
  description: string | null;
};

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);

  const [editingRole, setEditingRole] = useState<Role | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const fetchRoles = async () => {
    try {
      const data = await getRoles();
      setRoles(data);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      if (err.response?.status === 403) {
        toast.error("Permission denied");
      } else {
        toast.error(err.response?.data?.message ?? "Failed to fetch roles");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
    });

    setEditingRole(null);
  };

  const handleSubmit = async () => {
    try {
      if (!formData.name.trim()) {
        toast.error("Role name is required");
        return;
      }

      if (editingRole) {
        await updateRole(editingRole.id, formData);

        toast.success("Role updated");
      } else {
        await createRole(formData);

        toast.success("Role created");
      }

      await fetchRoles();

      setOpen(false);

      resetForm();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (role: Role) => {
    setEditingRole(role);

    setFormData({
      name: role.name,
      description: role.description || "",
    });

    setOpen(true);
  };

  const handleDelete = async (roleId: number) => {
    const confirmed = window.confirm("Delete this role?");

    if (!confirmed) return;

    try {
      await deleteRole(roleId);

      toast.success("Role deleted");

      fetchRoles();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete role");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Roles</h1>

          <p className="text-muted-foreground">Manage organization roles</p>
        </div>

        <Dialog
          open={open}
          onOpenChange={(value) => {
            setOpen(value);

            if (!value) {
              resetForm();
            }
          }}
        >
          <DialogTrigger asChild>
            <Button>Create Role</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingRole ? "Edit Role" : "Create Role"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <Input
                placeholder="Role Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />

              <Input
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />

              <Button className="w-full" onClick={handleSubmit}>
                {editingRole ? "Update Role" : "Create Role"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Roles</CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div>Loading...</div>
          ) : roles.length === 0 ? (
            <div className="text-muted-foreground">No roles found</div>
          ) : (
            <div className="space-y-4">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <h3 className="font-semibold">{role.name}</h3>

                    <p className="text-sm text-muted-foreground">
                      {role.description}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/dashboard/settings/roles/${role.id}`}>
                      <Button variant="outline" size="sm">
                        Permissions
                      </Button>
                    </Link>

                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleEdit(role)}
                    >
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(role.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
