import axios from "@/shared/lib/axios";

import {
  Deal,
  CreateDealDto,
  UpdateDealDto,
  DealsResponse
} from "./deals.types";

export const createDeal = async (
  data: CreateDealDto
): Promise<Deal> => {

  const response = await axios.post(
    "/deals",
    data
  );

  return response.data.data;

};

export const getDeals = async (params?: {
  stage?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<DealsResponse> => {

  const response = await axios.get(
    "/deals",
    {
      params,
    }
  );

  return response.data.data;

};

export const getPipelineDeals = async () => {
  const response = await axios.get(
    "/deals/pipeline"
  );

  return response.data.data;
};

export const getDealById = async (
  id: number
): Promise<Deal> => {

  const response = await axios.get(
    `/deals/${id}`
  );

  return response.data.data;

};

export const updateDeal = async (
  id: number,
  data: UpdateDealDto
): Promise<Deal> => {

  const response = await axios.patch(
    `/deals/${id}`,
    data
  );

  return response.data.data;

};

export const updateDealStage = async (
  id: number,
  stage: string
): Promise<Deal> => {

  const response = await axios.patch(
    `/deals/${id}/stage`,
    { stage }
  );

  return response.data.data;

};

export const deleteDeal = async (
  id: number
): Promise<void> => {

  await axios.delete(
    `/deals/${id}`
  );

};

export const getCustomerDeals = async (
  customerId: number
): Promise<Deal[]> => {

  const response = await axios.get(
    `/customers/${customerId}/deals`
  );

  return response.data.data;

};

export const assignDeals = async (
  data: {
    dealIds: number[];
    assignedTo: number;
  }
) => {

  const response = await axios.patch(
    "/deals/assign",
    data
  );

  return response.data.data;

};

export const getDealOptions = async ({
  search = "",
  page = 1,
  limit = 10,
}: {
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const response = await axios.get(
    "/deals/options",
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