export type User = {
  id: number;
  fullname: string;
  email: string;
  role: string;
  role_id: number;
  is_active: boolean;
};

export type AssignableUser = {
  id: number;
  fullname: string;
  role: string;
};