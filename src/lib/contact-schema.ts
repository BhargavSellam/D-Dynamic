import { z } from "zod";
import { PRODUCT_NAMES } from "@/data/products";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(100),
  email: z.string().trim().email("Please enter a valid email address.").max(255),
  phone: z.string().trim().max(30).regex(/^[0-9+()\-\s]*$/, "Please use digits, spaces, + ( ) or - only.").optional().or(z.literal("")),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  city: z.string().trim().max(120).optional().or(z.literal("")),
  type: z.enum(["General", "Product", "Distributor"]),
  product: z.enum([...PRODUCT_NAMES, "All Products"]),
  message: z.string().trim().min(10, "Please write at least 10 characters.").max(2000),
  website: z.string().max(0).optional(), // honeypot
  startedAt: z.number().optional(),
});
export type ContactInput = z.infer<typeof contactSchema>;
