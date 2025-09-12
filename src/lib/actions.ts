'use server';

import { z } from 'zod';
import { complaintSchema, feedbackSchema } from '@/lib/definitions';
import { generateTrackingId } from './utils';

type ComplaintState = {
  message: string;
  trackingId?: string;
  suggestedDepartment?: string;
  errors?: z.ZodIssue[];
  status: 'success' | 'error';
};

export async function submitComplaint(
  prevState: ComplaintState,
  formData: FormData
): Promise<ComplaintState> {
  const validatedFields = complaintSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      message: 'Validation failed. Please check the fields.',
      errors: validatedFields.error.issues,
      status: 'error',
    };
  }

  // Here you would typically save to a database
  // and call the AI pre-screening flow.
  console.log('Complaint data:', validatedFields.data);

  // Simulate AI pre-screening and tracking ID generation
  const trackingId = generateTrackingId();
  const suggestedDepartment = 'Grievance Redressal Wing'; // Simulated AI suggestion

  return {
    message: 'Your complaint has been successfully submitted.',
    trackingId: trackingId,
    suggestedDepartment: suggestedDepartment,
    status: 'success',
  };
}

type FeedbackState = {
  message: string;
  errors?: z.ZodIssue[];
  status: 'success' | 'error';
};

export async function submitFeedback(
  prevState: FeedbackState,
  formData: FormData
): Promise<FeedbackState> {
  const validatedFields = feedbackSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      message: 'Validation failed. Please check the fields.',
      errors: validatedFields.error.issues,
      status: 'error',
    };
  }

  console.log('Feedback data:', validatedFields.data);

  return {
    message: 'Thank you for your feedback! We appreciate your input.',
    status: 'success',
  };
}
