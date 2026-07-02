import { z } from "zod";

export const createDealSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Title must be at least 2 characters"),

  customer_id: z.number({
    message: "Customer is required",
  }),

  service_id: z.number({
    message: "Service is required",
  }),

  price: z.number().min(0),

  expected_close_date: z
    .string()
    .optional(),

  assigned_to: z.number().optional(),
  notes: z
    .string()
    .max(1000, "Notes cannot exceed 1000 characters")
    .optional(),
});


export const updateDealSchema = createDealSchema.extend({
  stage: z.enum([
    "OPEN",
    "QUOTATION_SENT",
    "NEGOTIATION",
    "WON",
    "LOST",
  ]),
});

export type CreateDealFormData = z.infer<typeof createDealSchema>;

export type UpdateDealFormData =
  z.infer<typeof updateDealSchema>;