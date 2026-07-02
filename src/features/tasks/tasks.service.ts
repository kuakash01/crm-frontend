import axios from "@/shared/lib/axios";

// task services starts
export const getTasks = async (
  entityType: string,
  entityId: number
) => {

  const response =
    await axios.get(
      `/tasks/${entityType}/${entityId}`
    );

  return response.data.data;

};

export const createTask = async (
  entityType: string,
  entityId: number,
  data: {
    title: string;
    description?: string;
    due_date?: string;
    assigned_to: number;
  }
) => {

  const response =
    await axios.post(
      `/tasks/${entityType}/${entityId}`,
      data
    );

  return response.data.data;

};

export const updateTask = async (
  entityType: string,
  entityId: number,
  taskId: number,
  data: {
    title: string;
    description?: string;
    due_date?: string;
    assigned_to: number;
  }
) => {

  const response =
    await axios.patch(
      `/tasks/${entityType}/${entityId}/${taskId}`,
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