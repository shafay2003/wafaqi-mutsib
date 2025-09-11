"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, CheckCircle, FilePenLine } from "lucide-react";
import { complaintSchema, type ComplaintFormValues } from "@/lib/definitions";
import { submitComplaint } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
        </>
      ) : (
        <>
         <FilePenLine className="mr-2 h-4 w-4" /> Submit Complaint
        </>
      )}
    </Button>
  );
}

export default function ComplaintForm() {
  const [state, formAction] = useFormState(submitComplaint, {
    message: "",
    status: "error",
  });
  const { toast } = useToast();

  const form = useForm<ComplaintFormValues>({
    resolver: zodResolver(complaintSchema),
    defaultValues: {
      fullName: "",
      cnic: "",
      email: "",
      phone: "",
      address: "",
      agency: "",
      complaintDetails: "",
    },
    // This makes validation errors appear on the right fields from the server action
    errors: state.errors?.reduce((acc, error) => {
        if(error.path && error.path[0]){
            acc[error.path[0] as keyof ComplaintFormValues] = { message: error.message };
        }
        return acc;
    }, {} as any),
  });

  useEffect(() => {
    if (state.status === 'success') {
      toast({
        title: "Submission Successful!",
        description: state.message,
      });
      form.reset();
    } else if (state.status === 'error' && state.message && !state.errors) {
       toast({
        title: "Submission Failed",
        description: state.message,
        variant: 'destructive'
      });
    }
  }, [state, form, toast]);


  if (state.status === 'success' && state.trackingId) {
    return (
      <Alert variant="default" className="border-green-500 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-800">Complaint Submitted Successfully!</AlertTitle>
        <AlertDescription className="text-green-700">
          <p className="mb-2">{state.message}</p>
          <p>Your Complaint Tracking ID is: <strong>{state.trackingId}</strong></p>
          <p>Suggested Department for Resolution: <strong>{state.suggestedDepartment}</strong></p>
          <p className="mt-4">Please save this tracking ID for future reference.</p>
           <Button onClick={() => form.reset()} variant="link" className="px-0 text-green-700">File another complaint</Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form action={formAction} className="space-y-8">
            <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="fullName" render={({ field }) => (
                        <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="cnic" render={({ field }) => (
                        <FormItem><FormLabel>CNIC (XXXXX-XXXXXXX-X)</FormLabel><FormControl><Input placeholder="12345-1234567-1" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                     <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input placeholder="0300-1234567" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                </div>
                 <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem><FormLabel>Full Postal Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Complaint Details</h3>
                <FormField control={form.control} name="agency" render={({ field }) => (
                    <FormItem><FormLabel>Federal Agency/Department Name</FormLabel><FormControl><Input placeholder="e.g., WAPDA, NADRA, FBR" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="complaintDetails" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Complaint Details</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Describe your issue in detail (at least 50 characters)..." rows={8} {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>
            </div>
            
            <SubmitButton />

          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
