export interface DashboardStats {
  totalLeads: number;
  totalCustomers: number;
  totalDeals: number;
  totalRevenue: number;
}

export interface DashboardResponse {
  stats: DashboardStats;
  pipeline: PipelineSummary;
  todayTasks: DashboardTask[];
  recentActivities: DashboardActivity[];
    revenueChart: RevenueChartItem[];
}

export interface DashboardTask {
  id: number;
  title: string;
  description: string;
  entity_type: "LEAD" | "CUSTOMER" | "DEAL";
  entity_id: number;
  due_date: string;
  status: string;
  assigned_to_name: string;
}

export interface PipelineSummary {
  OPEN: number;
  QUOTATION_SENT: number;
  NEGOTIATION: number;
  WON: number;
  LOST: number;
}

export interface DashboardActivity {
  id: number;
  activity_type: string;
  description: string;
  entity_type: string;
  entity_id: number;
  created_at: string;
  created_by_name: string;
}

export interface RevenueChartItem {
  month: string;
  revenue: number;
}

export interface RevenueChartProps {
  data: RevenueChartItem[];
}
