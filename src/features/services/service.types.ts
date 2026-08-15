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


export interface GetServicesParams {
  search?: string;
  page?: number;
  limit?: number;
  includeInactive?: boolean;
}

export interface ServicesResponse {
  services: Service[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ServiceOption {
  id: number;
  name: string;
  base_price: number | string;
}

export interface ServiceOptionsResponse {
  services: ServiceOption[];

  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}