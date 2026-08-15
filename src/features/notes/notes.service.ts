import axios from "@/shared/lib/axios";

export const getNotes = async (
  entityType: string,
  entityId: number,
    options?: {
    page?: number;
    limit?: number;
  }
) => {
  const response = await axios.get(
    `/notes/${entityType}/${entityId}`,
    {
      params: {
        page: options?.page,
        limit: options?.limit,
      },
    }
  );

  return response.data.data;
};

export const createNote = async (
  entityType: string,
  entityId: number,
  note: string
) => {

  const response =
    await axios.post(
      `/notes/${entityType}/${entityId}`,
      {
        note
      }
    );

  return response.data.data;

};

export const updateNote = async (
  entityType: string,
  entityId: number,
  noteId: number,
  note: string
) => {

  const response =
    await axios.patch(
      `/notes/${entityType}/${entityId}/${noteId}`,
      {
        note
      }
    );

  return response.data.data;

};

export const deleteNote = async (
  entityType: string,
  entityId: number,
  noteId: number
) => {

  await axios.delete(
    `/notes/${entityType}/${entityId}/${noteId}`
  );

};
