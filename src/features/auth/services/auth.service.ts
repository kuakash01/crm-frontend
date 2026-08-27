import axios from "@/shared/lib/axios";
import { RegisterOrganizationType, LoginUser } from "../types/auth.types";

export const registerOrganization = async (
  userData: RegisterOrganizationType
) => {
  const response = await axios.post(
    "/auth/register",
    userData
  );

  return response.data.data;
};

export async function login(data: LoginUser) {
  const response = await axios.post(
    "/auth/login",
    data,
  );

  return response.data.data;
}

export const getCurrentUser = async () => {
  const response = await axios.get("/auth/me");
  // console.log("user auth", response);
  return response.data.data;
};

export const logout = async () => {
  const response = await axios.get("/auth/logout");
  return response.data;
}

export async function verifyEmail(data: {
  email: string;
  otp: string;
}) {
  const response = await axios.post(
    "/auth/verify-email",
    data,
  );

  return response.data.data;
}


export async function acceptInvitation(data: {
  token: string;
  password: string;
}) {
  const response = await axios.post(
    "/auth/accept-invitation",
    data,
  );

  return response.data.data;
}

export const getInvitationDetails = async (
  token: string,
) => {
  const response = await axios.get(
    "/auth/invitation-details",
    {
      params: {
        token,
      },
    },
  );

  return response.data.data;
};


export const forgotPassword = async (
  email: string,
) => {
  const response = await axios.post(
    "/auth/forgot-password",
    {
      email,
    },
  );

  return response.data;
};

export const resetPassword = async (data: {
  email: string;
  otp: string;
  newPassword: string;
}) => {
  const response = await axios.post(
    "/auth/reset-password",
    data,
  );

  return response.data;
};


export const changePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  const response = await axios.post(
    "/auth/change-password",
    data,
  );

  return response.data;
};

// export async function verifyLoginOtp(data: {
//   userId: number;
//   otp: string;
// }) {
//   const response = await axios.post(
//     "/auth/verify-login-otp",
//     data,
//   );

//   return response.data.data;
// }
