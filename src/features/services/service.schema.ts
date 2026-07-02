import { z } from "zod";

export const serviceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100),

  description: z
    .string()
    .optional(),

  base_price: z
    .number()
    .min(0, "Price cannot be negative"),
});

export type ServiceFormData = z.infer<typeof serviceSchema>;

export const updateServiceSchema =
  serviceSchema.extend({

    is_active: z.boolean(),

  });

export type UpdateServiceFormData =
  z.infer<
    typeof updateServiceSchema
  >;


  