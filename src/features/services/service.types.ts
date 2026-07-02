export type Service = {
  id: number;
  name: string;
  description?: string;
  base_price: number;
  is_active: boolean;

  organization_id: number;

  created_at: string;
  updated_at: string;
};

export type CreateServiceDto = {
  name: string;
  description?: string;
  base_price: number;
};

export type UpdateServiceDto = {
  name: string;
  description?: string;
  base_price: number;
  is_active: boolean;
};