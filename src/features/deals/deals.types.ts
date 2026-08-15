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

export type DealCounts = {
  ALL: number;
  OPEN: number;
  QUOTATION_SENT: number;
  NEGOTIATION: number;
  WON: number;
  LOST: number;
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


export type DealsResponse = {
  deals: Deal[];
  counts: DealCounts;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};


export type DealsTableProps = {
  loading: boolean;
  deals: Deal[];
  counts: DealCounts;

  search: string;
  stage: string;
  canCreate:boolean;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };

  onSearchChange: (value: string) => void;
  onStageChange: (value: string) => void;
  onRefresh: () => void;
  onPageChange: (page: number) => void;
};