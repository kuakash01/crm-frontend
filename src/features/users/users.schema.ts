import { z } from "zod";

export const userSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name is required")
    .max(50, "Full name must be 50 characters or less")
    .regex(
      /^[A-Za-z ]+$/,
      "Only letters and spaces allowed",
    ),

  email: z
    .email("Invalid email")
    .max(100, "Email must be 100 characters or less"),

  phone: z
    .string()
    .regex(
      /^\+?[0-9]{7,15}$/,
      "Invalid phone number",
    ),

  roleId: z
    .string()
    .min(1, "Role is required"),

  reportsTo: z.string().optional(),
});

export type UserFormValues = z.infer<typeof userSchema>;


export const updateMyProfileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name is required")
    .max(50, "Full name must be 50 characters or less")
    .regex(
      /^[A-Za-z ]+$/,
      "Only letters and spaces allowed",
    ),

  phone: z
    .string()
    .regex(
      /^\+?[0-9]{7,15}$/,
      "Invalid phone number",
    ),

  // profilePic: z
  //   .string()
  //   .url("Invalid profile picture URL")
  //   .nullable()
  //   .optional(),
});

export type UpdateMyProfileValues = z.infer<
  typeof updateMyProfileSchema
>;


export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Current password is required"),

    newPassword: z
      .string()
      .min(
        8,
        "Password must be at least 8 characters",
      )
      .regex(
        /[A-Z]/,
        "Must contain uppercase letter",
      )
      .regex(
        /[a-z]/,
        "Must contain lowercase letter",
      )
      .regex(
        /[0-9]/,
        "Must contain a number",
      )
      .regex(
        /[@$!%*?&]/,
        "Must contain a special character",
      ),

    confirmPassword: z.string().min(
      1,
      "Please confirm your password",
    ),
  })
  .refine(
    (data) =>
      data.newPassword ===
      data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    },
  );

export type ChangePasswordValues =
  z.infer<typeof changePasswordSchema>;