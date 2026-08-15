import axios from "@/shared/lib/axios";

import { TasksResponse, GetAllTasksParams, CreateTaskData } from "./tasks.types";

export const getAllTasks = async ({
  page,
  limit,
  search,
  status,
  entityType,
  priority,
  entityId
}: GetAllTasksParams): Promise<TasksResponse> => {
  const response = await axios.get("/tasks", {
    params: {
      page,
      limit,
      search,
      status,
      entityType,
      priority,
      entityId
    },
  });

  return response.data.data;
};


export const getTaskById = async (taskId: number) => {
  const response = await axios.get(
    `/tasks/${taskId}`
  );

  return response.data.data;
};


export const createTask = async (
  data: CreateTaskData
) => {
  const response = await axios.post(
    "/tasks",
    data
  );

  return response.data.data;
};

export const updateTask = async (
  taskId: number,
  data: {
    title: string;
    description?: string | null;
    due_date?: string | null;
    priority: "LOW" | "NORMAL" | "HIGH" | "URGENT";
    assigned_to: number;
  }
) => {
  const response = await axios.patch(
    `/tasks/${taskId}`,
    data
  );

  return response.data.data;
};

export const updateTaskStatus = async (
  entityType: string,
  entityId: number,
  taskId: number,
  status: "PENDING" | "COMPLETED"
) => {

  const response =
    await axios.patch(
      `/tasks/${entityType}/${entityId}/${taskId}/status`,
      { status }
    );

  return response.data.data;

};

export const deleteTask = async (
  entityType: string,
  entityId: number,
  taskId: number
) => {

  await axios.delete(
    `/tasks/${entityType}/${entityId}/${taskId}`
  );

};
// task services ends