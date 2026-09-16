import axios from "@/shared/lib/axios";
import { UniversalSearchResults } from "./search.types";

export const searchWorkspace = async (
  query: string
): Promise<UniversalSearchResults> => {
  if (!query || !query.trim()) {
    return {
      query: "",
      total: 0,
      results: {
        deals: [],
        leads: [],
        customers: [],
        tasks: [],
        services: [],
      },
    };
  }

  const response = await axios.get("/search", {
    params: { q: query.trim() },
  });

  return response.data.data;
};
