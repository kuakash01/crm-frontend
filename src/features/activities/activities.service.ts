import axios from "@/shared/lib/axios";
export const getActivities = async (
  entityType: string,
  entityId: number,
  options?: {
    page?: number;
    limit?: number;
  }
) => {

  const response = await axios.get(
    `/activities/${entityType}/${entityId}`,
    {
      params: {
        page: options?.page,
        limit: options?.limit,
      },
    }
  );
  return response.data.data;
};
