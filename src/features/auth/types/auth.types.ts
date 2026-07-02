export type RegisterOrganizationType = {
  organizationName: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type LoginUser = {
  email: string;
  password: string;
}