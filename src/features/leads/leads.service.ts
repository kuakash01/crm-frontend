import axios from "@/shared/lib/axios";
import { AssignLeadsPayload, LeadListResponse } from "./leads.types";



export const getLeads = async (
  params: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }
): Promise<LeadListResponse> => {

  const response = await axios.get("/leads", {
    params,
  });

  return response.data.data;
};

export const createLead = async (data: any) => {
  const response = await axios.post("/leads", data);
  return response.data.data;
};


export const getLeadById = async (id: number) => {
  const response = await axios.get(`/leads/${id}`);

  console.log("lead response", response);
  return response.data.data;
};

export const updateLead = async (
  id: number,
  data: any
) => {
  const response = await axios.patch(
    `/leads/${id}`,
    data
  );
  return response.data.data;
};

export const deleteLead = async (
  id: number
) => {
  const response = await axios.delete(
    `/leads/${id}`
  );

  return response.data;
};


export const assignLeads =
  async (
    payload: AssignLeadsPayload
  ) => {
    const response =
      await axios.post(
        "/leads/assign",
        payload
      );

    return response.data;
  };

export const updateLeadStatus = async (
  leadId: number,
  status: string
) => {
  const response = await axios.patch(
    `/leads/${leadId}/status`,
    {
      status,
    }
  );

  return response.data.data;
};


export const getLeadOptions = async ({
  search = "",
  page = 1,
  limit = 10,
}: {
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const response = await axios.get(
    "/leads/options",
    {
      params: {
        search,
        page,
        limit,
      },
    }
  );

  return response.data.data;
};