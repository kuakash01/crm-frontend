
export type TaskStatus =
  | "PENDING"
  | "COMPLETED";

export type TaskPriority =
  | "LOW"
  | "NORMAL"
  | "HIGH"
  | "URGENT";

export type TaskEntityType =
  | "LEAD"
  | "CUSTOMER"
  | "DEAL";


/*
 * Task List
 *
 * Only fields returned by GET /tasks
 */
export interface Task {
  id: number;
  title: string;
  due_date: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  assigned_to_name: string | null;
}


/*
 * Task Details
 *
 * Full task returned by GET /tasks/:taskId
 */
export interface TaskDetails {
  id: number;
  title: string;
  description: string | null;

  due_date: string | null;

  status: TaskStatus;
  priority: TaskPriority;

  entity_type: TaskEntityType | null;
  entity_id: number | null;
  entity_name: string | null;

  assigned_to: number | null;
  assigned_to_name: string | null;

  created_by: number;
  created_by_name: string | null;

  created_at: string;
  updated_at: string;
}


/*
 * Task Counts
 */
export interface TaskCounts {
  total: number;
  pending: number;
  completed: number;
}


/*
 * Task Pagination
 */
export interface TaskPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}


/*
 * GET /tasks response
 */
export interface TasksResponse {
  tasks: Task[];
  counts: TaskCounts;
  pagination: TaskPagination;
}


/*
 * GET /tasks/:taskId response
 */
export interface TaskDetailsResponse {
  task: TaskDetails;
}


/*
 * GET /tasks params
 */
export interface GetAllTasksParams {
  page: number;
  limit: number;

  search?: string;

  status?: TaskStatus;

  entityType?:
  | TaskEntityType
  | "GENERAL";

  priority?: TaskPriority;
  entityId?: number
}


/*
 * Create Task
 */
export interface CreateTaskData {
  entity_type?: TaskEntityType | null;

  entity_id?: number | null;

  title: string;

  description?: string | null;

  due_date?: string | null;

  priority?: TaskPriority;

  assigned_to: number;
}


/*
 * Update Task
 */
export interface UpdateTaskData {
  title: string;

  description?: string | null;

  due_date?: string | null;

  assigned_to?: number | null;

  priority?: TaskPriority;
}


/*
 * Update Task Status
 */
export interface UpdateTaskStatusData {
  status: TaskStatus;
}