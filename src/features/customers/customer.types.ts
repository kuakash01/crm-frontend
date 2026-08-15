export type CustomerStatus =
  | "ACTIVE"
  | "ON_HOLD"
  | "INACTIVE"
  | "CHURNED";

export type CustomerCreatedFrom = "LEAD" | "MANUAL" | "IMPORT";

export type Customer = {
  id: number;
  fname: string;
  lname?: string;
  email: string;
  phone1: string;
  phone2?: string;
  company?: string;
  status: CustomerStatus;
  created_from: CustomerCreatedFrom;
  lead_id?: number;
  assigned_to?: number;
  assigned_to_name?: string;
  organization_id: number;
  created_at: string;
  updated_at: string;
};


export type CustomerCounts = {
  ALL: number;
  ACTIVE: number;
  ON_HOLD: number;
  INACTIVE: number;
  CHURNED: number;
}


export type CustomerOption = {
  id: number;
  fname: string;
  lname: string;
  company: string | null;
  email: string | null;
  phone1: string | null;
  assigned_to: number | null;
  assigned_to_name: string | null;
};

export type CustomerOptionsResponse = {
  customers: CustomerOption[];

  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
