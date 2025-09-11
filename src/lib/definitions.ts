import { z } from "zod";

export const complaintSchema = z.object({
  fullName: z.string().min(3, { message: "Full name must be at least 3 characters." }),
  cnic: z.string().regex(/^\d{5}-\d{7}-\d{1}$/, { message: "Invalid CNIC format. Use XXXXX-XXXXXXX-X." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(11, { message: "Phone number must be at least 11 digits." }),
  address: z.string().min(10, { message: "Address must be at least 10 characters." }),
  agency: z.string().min(2, { message: "Please specify the agency you are complaining against." }),
  complaintDetails: z.string().min(50, { message: "Complaint details must be at least 50 characters long." }),
});

export type ComplaintFormValues = z.infer<typeof complaintSchema>;

export const feedbackSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(20, { message: "Message must be at least 20 characters." }),
});

export type FeedbackFormValues = z.infer<typeof feedbackSchema>;
