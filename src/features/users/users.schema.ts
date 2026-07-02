import { z } from "zod";

export const createUserSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name is required")
    .max(50)
    .regex(
      /^[A-Za-z ]+$/,
      "Only letters and spaces allowed"
    ),

  email: z
    .email("Invalid email")
    .max(100),

  phone: z
    .string()
    .regex(
      /^\+?[0-9]{7,15}$/,
      "Invalid phone number"
    ),

  roleId: z
    .string()
    .min(1, "Role is required"),

  password: z
    .string()
    .min(
      8,
      "Password must be at least 8 characters"
    )
    .regex(
      /[A-Z]/,
      "Must contain uppercase letter"
    )
    .regex(
      /[a-z]/,
      "Must contain lowercase letter"
    )
    .regex(
      /[0-9]/,
      "Must contain a number"
    ),
    reportsTo: z.string().optional()
});

export const updateUserSchema =
  createUserSchema.extend({
    password: z.string().optional(),
    reportsTo: z.string().optional()
  });
export type CreateUserFormValues =
  z.infer<
    typeof createUserSchema
  >;

export type UpdateUserFormValues =
  z.infer<
    typeof updateUserSchema
  >;