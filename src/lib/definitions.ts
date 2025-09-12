import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export const complaintSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: 'Full name must be at least 3 characters.' }),
  cnic: z
    .string()
    .regex(/^\d{5}-\d{7}-\d{1}$/, {
      message: 'Invalid CNIC format. Use XXXXX-XXXXXXX-X.',
    }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z
    .string()
    .min(11, { message: 'Phone number must be at least 11 digits.' }),
  address: z
    .string()
    .min(10, { message: 'Address must be at least 10 characters.' }),
  agency: z
    .string()
    .min(2, { message: 'Please specify the agency you are complaining against.' }),
  complaintDetails: z
    .string()
    .min(50, { message: 'Complaint details must be at least 50 characters long.' }),
  attachments: z
    .any()
    .refine(
      (files) => !files || files.length === 0 || Array.from(files).every((file: any) => file.size <= MAX_FILE_SIZE),
      `Max file size is 5MB.`
    )
    .refine(
      (files) => !files || files.length === 0 || Array.from(files).every((file: any) =>
        ACCEPTED_IMAGE_TYPES.includes(file.type)
      ),
      '.jpg, .jpeg, .png, .pdf and .docx files are accepted.'
    )
    .optional(),
});

export type ComplaintFormValues = z.infer<typeof complaintSchema>;

export const feedbackSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  subject: z
    .string()
    .min(5, { message: 'Subject must be at least 5 characters.' }),
  message: z
    .string()
    .min(20, { message: 'Message must be at least 20 characters.' }),
});

export type FeedbackFormValues = z.infer<typeof feedbackSchema>;
