"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

import {
  getRolePermissions,
  updateRolePermissions,
} from "@/features/roles/services/roles";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Checkbox } from "@/components/ui/checkbox";

type Permission = {
  module_id: number;
  module_name: string;
  permission_id: number;
  action: string;
  assigned: boolean;
};

export default function RolePermissionsPage() {
  const params = useParams();

  let roleId = params.roleId as string;

  const [loading, setLoading] = useState(true);

  const [roleName, setRoleName] = useState("");

  const [permissions, setPermissions] = useState<Permission[]>([]);

  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);

  const fetchPermissions = async () => {
    try {
      const data = await getRolePermissions(roleId);

      setRoleName(data.role.name);

      setPermissions(data.permissions);

      const assigned = data.permissions
        .filter((permission: Permission) => permission.assigned)
        .map((permission: Permission) => permission.permission_id);

      setSelectedPermissions(assigned);
    } catch {
      toast.error("Failed to load permissions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  const groupedPermissions = useMemo(() => {
    return permissions.reduce(
      (acc, permission) => {
        if (!acc[permission.module_name]) {
          acc[permission.module_name] = [];
        }

        acc[permission.module_name].push(permission);

        return acc;
      },
      {} as Record<string, Permission[]>,
    );
  }, [permissions]);

  const togglePermission = (permissionId: number) => {
    setSelectedPermissions((prev) => {
      if (prev.includes(permissionId)) {
        return prev.filter((id) => id !== permissionId);
      }

      return [...prev, permissionId];
    });
  };

  const toggleAllPermissions = (checked: boolean) => {
    if (checked) {
      setSelectedPermissions(
        permissions.map((permission) => permission.permission_id),
      );
    } else {
      setSelectedPermissions([]);
    }
  };

  const toggleModulePermissions = (
    modulePermissions: Permission[],
    checked: boolean,
  ) => {
    const modulePermissionIds = modulePermissions.map(
      (permission) => permission.permission_id,
    );

    if (checked) {
      setSelectedPermissions((prev) => [
        ...new Set([...prev, ...modulePermissionIds]),
      ]);
    } else {
      setSelectedPermissions((prev) =>
        prev.filter((id) => !modulePermissionIds.includes(id)),
      );
    }
  };

  const savePermissions = async () => {
    try {
      await updateRolePermissions(roleId, selectedPermissions);

      toast.success("Permissions updated");
    } catch {
      toast.error("Failed to update permissions");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

 return (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">
          {roleName}
        </h1>

        <p className="text-muted-foreground">
          Manage role permissions
        </p>
      </div>
    </div>

    {/* Global Select All */}
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <Checkbox
            checked={
              permissions.length > 0 &&
              selectedPermissions.length ===
                permissions.length
            }
            onCheckedChange={(checked) =>
              toggleAllPermissions(
                checked === true
              )
            }
          />

          <span className="font-medium">
            Select All Permissions
          </span>

          <span className="text-sm text-muted-foreground">
            (
            {
              selectedPermissions.length
            }
            /
            {permissions.length}
            )
          </span>
        </div>
      </CardContent>
    </Card>

    {Object.entries(
      groupedPermissions
    ).map(
      ([
        moduleName,
        modulePermissions,
      ]) => (
        <Card key={moduleName}>
          <CardHeader>
            <CardTitle className="capitalize flex items-center justify-between">
              <span>
                {moduleName}
              </span>

              <span className="text-sm font-normal text-muted-foreground">
                {
                  modulePermissions.filter(
                    (
                      permission
                    ) =>
                      selectedPermissions.includes(
                        permission.permission_id
                      )
                  ).length
                }
                /
                {
                  modulePermissions.length
                }
              </span>
            </CardTitle>

            <div className="flex items-center gap-2">
              <Checkbox
                checked={modulePermissions.every(
                  (
                    permission
                  ) =>
                    selectedPermissions.includes(
                      permission.permission_id
                    )
                )}
                onCheckedChange={(
                  checked
                ) =>
                  toggleModulePermissions(
                    modulePermissions,
                    checked === true
                  )
                }
              />

              <span className="text-sm font-medium">
                Select All
              </span>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {modulePermissions.map(
                (
                  permission
                ) => (
                  <div
                    key={
                      permission.permission_id
                    }
                    className="flex items-center gap-2 rounded-md border p-3"
                  >
                    <Checkbox
                      checked={selectedPermissions.includes(
                        permission.permission_id
                      )}
                      onCheckedChange={() =>
                        togglePermission(
                          permission.permission_id
                        )
                      }
                    />

                    <span className="capitalize text-sm">
                      {
                        permission.action
                      }
                    </span>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>
      )
    )}

    <div className="flex justify-end">
      <Button
        size="lg"
        onClick={
          savePermissions
        }
      >
        Save Permissions (
        {
          selectedPermissions.length
        }
        )
      </Button>
    </div>
  </div>
);
}
