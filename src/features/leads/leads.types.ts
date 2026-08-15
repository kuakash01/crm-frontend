export type Lead = {
  id: number;
  fname: string;
  lname: string;
  email: string;
  phone1: string;
  phone2: string;
  company: string;
  status: string;
  converted_at?: string;
  source: string;
  assigned_to?: number;
  created_at: string;
  updated_at: string;
  assigned_to_name?: string;
  organization_id: number;
};

export type AssignLeadsPayload = {
  leadIds: number[];
  assignedTo: number;
};


export interface LeadListResponse {
  leads: Lead[];
  counts: LeadCounts;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export type LeadCounts = {
  ALL: number;
  NEW: number;
  CONTACTED: number;
  QUALIFIED: number;
  PROPOSAL: number;
  NEGOTIATION: number;
  CONVERTED: number;
  LOST: number;
};
