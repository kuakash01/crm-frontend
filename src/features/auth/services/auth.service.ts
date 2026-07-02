import api from "@/shared/lib/axios";
import { RegisterOrganizationType, LoginUser } from "../types/auth.types";

export const registerOrganization = async (
  userData: RegisterOrganizationType
) => {
  const response = await api.post(
    "/auth/register",
    userData
  );

  return response.data;
};

export const login = async (userData: LoginUser
) => {
  const response = await api.post("/auth/login", 
    userData
  );
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  // console.log("user auth", response);
  return response.data.data;
};