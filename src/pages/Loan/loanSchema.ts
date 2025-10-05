import { z } from "zod";

export const schema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Enter valid phone"),
  dob: z.string().min(1, "Date of birth is required"),
  address: z.string().min(5, "Address is required"),
  loanType: z.enum(["Home", "Personal", "Auto", "Education"]),
  amount: z.number().positive("Amount > 0"),
  tenure: z.number().int().positive("Tenure > 0"),
  income: z.number().positive("Income > 0"),
  aadhar: z.any().optional(),
  pan: z.any().optional(),
});

export type LoanFormData = z.infer<typeof schema>;
