import { z } from "zod";

export const updateLeadSchema = z
  .object({
    fname: z
      .string()
      .trim()
      .min(1, "First name is required")
      .max(100),

    lname: z
      .string()
      .trim()
      .min(1, "Last name is required")
      .max(100),

    email: z
      .string()
      .trim()
      .email("Invalid email address"),

    phone1: z
      .string()
      .trim()
      .regex(/^[6-9]\d{9}$/, {
        message:
          "Primary phone must be a valid 10-digitr",
      }),

    phone2: z
      .string()
      .trim()
      .regex(/^[6-9]\d{9}$/, {
        message:
          "Secondary phone must be a valid 10-digit",
      })
      .optional()
      .or(z.literal("")),

    company: z
      .string()
      .trim()
      .max(255)
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (data) =>
      !data.phone2 ||
      data.phone2 === "" ||
      data.phone1 !== data.phone2,
    {
      path: ["phone2"],
      message:
        "Primary and secondary phone numbers cannot be the same",
    },
  );

export type UpdateLeadFormData = z.infer<typeof updateLeadSchema>;