import axios from "@/shared/lib/axios";
import { DashboardResponse } from "./dashboard.types";

export const getDashboardStats =
  async (): Promise<DashboardResponse> => {
    const response =
      await axios.get("/dashboard");

    return response.data.data;
  };