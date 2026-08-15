import { z } from "zod";

export const createCustomerSchema = z.object({
  fname: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(100, "First name is too long"),

  lname: z
    .string()
    .trim()
    .max(100, "Last name is too long")
    .optional()
    .or(z.literal("")),

  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .optional()
    .or(z.literal("")),

  phone1: z
    .string()
    .trim()
    .min(10, "Primary phone number is required")
    .max(15, "Invalid phone number"),

  phone2: z
    .string()
    .trim()
    .max(15, "Invalid phone number")
    .optional()
    .or(z.literal("")),

  company: z
    .string()
    .trim()
    .max(255, "Company name is too long")
    .optional()
    .or(z.literal("")),

  assigned_to: z.number().min(1, "Customer owner is required"),
  lead_id: z.number().optional(),

  created_from: z
    .enum(["LEAD", "MANUAL", "IMPORT"])
    .optional(),
});

export type CreateCustomerFormData = z.infer<
  typeof createCustomerSchema
>;