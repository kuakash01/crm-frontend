import axios from "@/shared/lib/axios";

import {
  Deal,
  CreateDealDto,
  UpdateDealDto,
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
}): Promise<Deal[]> => {

  const response = await axios.get(
    "/deals",
    {
      params,
    }
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