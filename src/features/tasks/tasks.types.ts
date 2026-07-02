export type Task = {
  id: number;
  title: string;
  description?: string;
  due_date?: string;
  status: "PENDING" | "COMPLETED";
  assigned_to_name: string;
};