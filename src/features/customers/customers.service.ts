import axios from "@/shared/lib/axios";
import { Deal } from "@/features/deals/deals.types";
import {CustomerOptionsResponse, CustomerCreatedFrom} from "@/features/customers/customer.types"

type AssignCustomersPayload = {
  customerIds: number[];
  assignedTo: number;
};


export const createCustomer = async (data: {
  fname: string;
  lname?: string;
  email?: string;
  phone1: string;
  phone2?: string;
  company?: string;
  assigned_to?: number;
  created_from?: CustomerCreatedFrom;
  lead_id?: number;
}) => {

  const response = await axios.post(
    "/customers",
    data
  );

  return response.data.data;

};

export const getCustomers = async (
  params: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }
) => {

  const response = await axios.get(
    "/customers",
    { params }
  );

  return response.data.data;

};

export const getCustomerById = async (
  customerId: number
) => {

  const response = await axios.get(
    `/customers/${customerId}`
  );

  return response.data.data;

};

export const updateCustomer = async (
  customerId: number,
  data: {
    fname: string;
    lname?: string;
    email: string;
    phone1: string;
    phone2?: string | null;
    company?: string;
    assigned_to?: number;
  }
) => {

  const response = await axios.patch(
    `/customers/${customerId}`,
    data
  );

  return response.data.data;

};

export const updateCustomerStatus = async (
  customerId: number,
  status: string
) => {

  const response = await axios.patch(
    `/customers/${customerId}/status`,
    {
      status
    }
  );

  return response.data.data;

};

export const deleteCustomer = async (
  customerId: number
) => {

  const response = await axios.delete(
    `/customers/${customerId}`
  );

  return response.data;

};

export const assignCustomers =  async (
    payload: AssignCustomersPayload
  ) => {
    const response =
      await axios.post(
        "/customers/assign",
        payload
      );

    return response.data;
  };


export const getCustomerDeals = async (
  customerId: number
): Promise<Deal[]> => {

  const response = await axios.get(
    `/customers/${customerId}/deals`
  );

  return response.data.data;

};


export const getCustomerOptions = async (params?: {
  search?: string;
  page?: number;
  limit?: number;
}): Promise<CustomerOptionsResponse> => {

  const response = await axios.get(
    "/customers/options",
    {
      params: {
        q: params?.search,
        page: params?.page,
        limit: params?.limit,
      },
    }
  );

  return response.data.data;
};