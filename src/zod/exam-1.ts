import { z } from "zod";

// Define the schema
export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: z.string().min(1, "Full name is required"),
  phone: z.string().min(10, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  gender: z.enum(["male", "female","other"], {
    errorMap: () => {
      return { message: "Gender is required" };
    }
  }),
  confirmPassword: z
    .string()
    .refine((val) => val === val, { message: "Passwords must match" })
    .optional(),
});

// Export the type inferred from the schema
export type RegisterFormData = z.infer<typeof registerSchema>;
