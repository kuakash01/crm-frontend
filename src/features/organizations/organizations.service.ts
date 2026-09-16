import axios from "@/shared/lib/axios";

export interface Organization {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  industry: string;
  description: string;
  logo: string | null;
  createdAt: string;
  updatedAt: string;
  teamMembers: number;
}

export type UpdateOrganizationPayload = Partial<
  Omit<Organization, "id" | "createdAt" | "updatedAt" | "teamMembers" | "logo">
> & {
  logo?: string | null;
};

export const getMyOrganization = async (): Promise<Organization> => {
  const response = await axios.get("/organizations/me");
  return response.data.data;
};

export const updateMyOrganization = async (
  data: UpdateOrganizationPayload
): Promise<Organization> => {
  const response = await axios.patch("/organizations/me", data);
  return response.data.data;
};
