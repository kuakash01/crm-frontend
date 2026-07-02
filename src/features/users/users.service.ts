import axios from "@/shared/lib/axios";

export const getUsers = async () => {
  const response = await axios.get(
    "/users"
  );

  return response.data.data;
};

export const getUser = async (
  id: string
) => {
  const response = await axios.get(
    `/users/${id}`
  );

  return response.data.data;
};

export const createUser = async (
  data: any
) => {
  const response = await axios.post(
    "/users",
    data
  );

  return response.data;
};

export const updateUser = async (
  id: string,
  data: any
) => {
  const response = await axios.patch(
    `/users/${id}`,
    data
  );

  return response.data;
};

export const deleteUser = async (
  id: number
) => {
  const response = await axios.delete(
    `/users/${id}`
  );

  return response.data;
};

export const changeUserRole =
  async (
    id: number,
    roleId: number
  ) => {
    const response =
      await axios.patch(
        `/users/${id}/role`,
        { roleId }
      );

    return response.data;
  };

export const changeUserStatus =
  async (
    id: number,
    isActive: boolean
  ) => {
    const response =
      await axios.patch(
        `/users/${id}/status`,
        { isActive }
      );

    return response.data;
  };