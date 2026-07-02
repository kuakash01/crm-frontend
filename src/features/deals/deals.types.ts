export type DealStage =
  | "OPEN"
  | "QUOTATION_SENT"
  | "NEGOTIATION"
  | "WON"
  | "LOST";

export type Deal = {
  id: number;

  title: string;

  customer_id: number;
  customer_name?: string;

  service_id: number;
  service_name?: string;

  stage: DealStage;

  price: number;

  expected_close_date?: string;

  assigned_to?: number;
  assigned_to_name?: string;

  notes?: string;

  organization_id: number;

  created_at: string;
  updated_at: string;
};

export type CreateDealDto = {
  title: string;

  customer_id: number;

  service_id: number;

  price: number;

  expected_close_date?: string;

  assigned_to?: number;

  notes?: string;
};

export type UpdateDealDto =
  CreateDealDto;