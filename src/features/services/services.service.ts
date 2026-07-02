import axios from "@/shared/lib/axios";

import {
  CreateServiceDto,
  UpdateServiceDto,
  Service,
} from "./service.types";

export const createService = async (
  data: CreateServiceDto
): Promise<Service> => {

  const response = await axios.post(
    "/services",
    data
  );

  return response.data.data;
};

export const getServices = async (
  includeInactive = false
): Promise<Service[]> => {

  const response = await axios.get(
    "/services",
    {
      params: {
        includeInactive,
      },
    }
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