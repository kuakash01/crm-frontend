import axios from "@/shared/lib/axios";

export const getAssignableUsers =
  async () => {
    const response =
      await axios.get(
        "/users/assignable"
      );

    return response.data.data;
  };