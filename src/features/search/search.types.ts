export type SearchEntityType = "deal" | "lead" | "customer" | "task" | "service";

export interface SearchItem {
  id: number;
  type: SearchEntityType;
  title: string;
  subtitle?: string;
  badge?: string;
  meta?: string;
  url: string;
}

export interface UniversalSearchResults {
  query: string;
  total: number;
  results: {
    deals: SearchItem[];
    leads: SearchItem[];
    customers: SearchItem[];
    tasks: SearchItem[];
    services: SearchItem[];
  };
}
