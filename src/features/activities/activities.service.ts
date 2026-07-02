import axios from "@/shared/lib/axios";
export const getActivities = async (
  entityType: string,
  entityId: number
) => {

  const response =
    await axios.get(
      `/activities/${entityType}/${entityId}/`
    );

  return response.data.data;
};
