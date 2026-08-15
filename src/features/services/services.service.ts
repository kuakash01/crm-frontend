import axios from "@/shared/lib/axios";
import { GetServicesParams, ServicesResponse } from "@/features/services/service.types";

import {
  CreateServiceDto,
  UpdateServiceDto,
  Service,
} from "./service.types";

import {
  ServiceOptionsResponse,
} from "./service.types";

export const getServiceOptions = async ({
  search = "",
  page = 1,
  limit = 10,
}: {
  search?: string;
  page?: number;
  limit?: number;
}): Promise<ServiceOptionsResponse> => {
  const response = await axios.get(
    "/services/options",
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

export const createService = async (
  data: CreateServiceDto
): Promise<Service> => {

  const response = await axios.post(
    "/services",
    data
  );

  return response.data.data;
};

export const getServices = async ({
  search = "",
  page = 1,
  limit = 10,
  includeInactive = false,
}: GetServicesParams): Promise<ServicesResponse> => {
  const params = new URLSearchParams();

  params.append("page", String(page));
  params.append("limit", String(limit));

  if (search) {
    params.append("search", search);
  }

  if (includeInactive) {
    params.append("includeInactive", "true");
  }

  const response = await axios.get(
    `/services?${params.toString()}`
  );

  return response.data.data;
};

export const getServiceById = async (
  id: number
): Promise<Service> => {

  const response = await axios.get(
    `/services/${id}`
  );

  return response.data.data;
};

export const updateService = async (
  id: number,
  data: UpdateServiceDto
): Promise<Service> => {

  const response = await axios.patch(
    `/services/${id}`,
    data
  );

  return response.data.data;
};

export const deleteService = async (
  id: number
) => {

  await axios.delete(
    `/services/${id}`
  );

};