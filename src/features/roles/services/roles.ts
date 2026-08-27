// features/roles/services/roles.ts

import axios from "@/shared/lib/axios";

export const getRoles =
  async () => {
    const response =
      await axios.get("/roles");

    return response.data.data;
  };

export const createRole =
  async (payload: {
    name: string;
    description?: string;
  }) => {
    const response =
      await axios.post(
        "/roles",
        payload
      );

    return response.data.data;
  };

export const updateRole =
  async (
    id: number,
    payload: {
      name?: string;
      description?: string;
    }
  ) => {
    const response =
      await axios.patch(
        `/roles/${id}`,
        payload
      );

    return response.data.data;
  };

export const deleteRole =
  async (id: number) => {
    await axios.delete(
      `/roles/${id}`
    );
  };


export const getRolePermissions = async (
  roleId: string
) => {
  const response = await axios.get(
    `/roles/${roleId}/permissions`
  );
  return response.data.data;
};

export const updateRolePermissions = async (
  roleId: string,
  permissionIds: number[]
) => {
  const response = await axios.put(
    `/roles/${roleId}/permissions`,
    { permissionIds }
  );

  return response.data;
};