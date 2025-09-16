
'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Loader2,
  CheckCircle,
  FilePenLine,
  Paperclip,
} from 'lucide-react';
import { complaintSchema, type ComplaintFormValues } from '@/lib/definitions';
import { submitComplaint } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg" className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
        </>
      ) : (
        <>
          <FilePenLine className="mr-2 h-4 w-4" /> Review & Submit Complaint
        </>
      )}
    </Button>
  );
}

export default function ComplaintForm() {
  const [state, formAction] = useActionState(submitComplaint, {
    message: '',
    status: 'error',
  });
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const isChildForm = searchParams.get('form') === 'child';

  const form = useForm<ComplaintFormValues>({
    resolver: zodResolver(complaintSchema),
    defaultValues: {
      fullName: '',
      cnic: '',
      email: '',
      phone: '',
      address: '',
      agency: '',
      complaintDetails: '',
      attachments: undefined,
    },
  });
  
  useEffect(() => {
    if (state.status === 'success') {
      toast({
        title: 'Submission Successful!',
        description: state.message,
      });
      form.reset();
    } else if (state.status === 'error' && state.message) {
      // Set form errors if they exist in the state
      if (state.errors) {
        state.errors.forEach((error) => {
          form.setError(error.path[0] as keyof ComplaintFormValues, {
            message: error.message,
          });
        });
      } else {
        // Show a general error toast if there are no specific field errors
        toast({
          title: 'Submission Failed',
          description: state.message,
          variant: 'destructive',
        });
      }
    }
  }, [state, form, toast]);


  if (state.status === 'success' && state.trackingId) {
    return (
      <Alert variant="default" className="border-green-500 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-800">
          Complaint Submitted Successfully!
        </AlertTitle>
        <AlertDescription className="text-green-700">
          <p className="mb-2">{state.message}</p>
          <p>
            Your Complaint Tracking ID is:{' '}
            <strong>{state.trackingId}</strong>
          </p>
          <p>
            Suggested Department for Resolution:{' '}
            <strong>{state.suggestedDepartment}</strong>
          </p>
          <p className="mt-4">Please save this tracking ID for future reference.</p>
          <Button
            onClick={() => window.location.reload()}
            variant="link"
            className="px-0 text-green-700"
          >
            File another complaint
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form action={formAction} className="space-y-12">
            {/* Step 1 */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 bg-primary text-primary-foreground rounded-full h-10 w-10 flex items-center justify-center text-lg font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold border-b-0 pb-0">
                  {isChildForm
                    ? 'Your Information (or of a trusted adult helping you)'
                    : 'Personal Information'}
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-14">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cnic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CNIC (XXXXX-XXXXXXX-X)</FormLabel>
                      <FormControl>
                        <Input placeholder="12345-1234567-1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number (for SMS updates)</FormLabel>
                      <FormControl>
                        <Input placeholder="0300-1234567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="pl-14">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Postal Address</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Step 2 */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 bg-primary text-primary-foreground rounded-full h-10 w-10 flex items-center justify-center text-lg font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold">
                  {isChildForm
                    ? 'What is your problem about?'
                    : 'Complaint Details'}
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-6 pl-14">
                <FormField
                  control={form.control}
                  name="agency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Federal Agency/Department Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., WAPDA, NADRA, FBR" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="complaintDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {isChildForm
                          ? 'Please tell us what happened'
                          : 'Describe your issue in detail'}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={
                            isChildForm
                              ? 'Explain your problem here...'
                              : 'Provide a detailed account of the issue, including dates, names, and any previous actions taken (at least 50 characters)...'
                          }
                          rows={8}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Step 3 */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 bg-primary text-primary-foreground rounded-full h-10 w-10 flex items-center justify-center text-lg font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold">
                  Supporting Documents (Optional)
                </h3>
              </div>
              <div className="pl-14">
                <FormField
                  control={form.control}
                  name="attachments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Attach Files</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          multiple
                          onChange={(e) => field.onChange(e.target.files)}
                        />
                      </FormControl>
                      <FormDescription>
                        You can upload multiple files (PDF, DOCX, JPG, PNG). Max
                        file size: 5MB each.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="pt-6 border-t">
              <SubmitButton />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
