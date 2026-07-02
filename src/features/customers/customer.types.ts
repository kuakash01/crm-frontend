export type CustomerStatus =
  | "ACTIVE"
  | "ON_HOLD"
  | "INACTIVE"
  | "CHURNED";

export type Customer = {
  id: number;
  fname: string;
  lname?: string;
  email: string;
  phone1: string;
  phone2?: string;
  company?: string;
  status: CustomerStatus;
  lead_id?: number;
  assigned_to?: number;
  assigned_to_name?: string;
  organization_id: number;
  created_at: string;
  updated_at: string;
};


