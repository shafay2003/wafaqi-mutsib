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
import { Loader2, CheckCircle, Send } from "lucide-react";
import { feedbackSchema, type FeedbackFormValues } from "@/lib/definitions";
import { submitFeedback } from "@/lib/actions";
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
         <Send className="mr-2 h-4 w-4" /> Submit Feedback
        </>
      )}
    </Button>
  );
}

export default function FeedbackPage() {
  const [state, formAction] = useFormState(submitFeedback, {
    message: "",
    status: "error",
  });
  const { toast } = useToast();

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  useEffect(() => {
    if (state.status === 'success') {
      toast({
        title: "Feedback Sent!",
        description: state.message,
      });
      form.reset();
    } else if (state.status === 'error' && state.message) {
       toast({
        title: "Submission Failed",
        description: state.message,
        variant: 'destructive'
      });
    }
  }, [state, form, toast]);


  return (
    <div className="bg-background py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
            <header className="text-center space-y-3 mb-10">
                <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
                Feedback & Suggestions
                </h1>
                <p className="text-lg text-muted-foreground">
                We value your input. Please share your thoughts to help us improve our services.
                </p>
            </header>

            {state.status === 'success' ? (
                 <Alert variant="default" className="border-green-500 bg-green-50 mb-8">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertTitle className="text-green-800">Thank You!</AlertTitle>
                    <AlertDescription className="text-green-700">
                        {state.message}
                    </AlertDescription>
                </Alert>
            ): null}

            <Card>
                <CardContent className="pt-6">
                    <Form {...form}>
                    <form action={formAction} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={form.control} name="name" render={({ field }) => (
                                <FormItem><FormLabel>Your Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <FormField control={form.control} name="email" render={({ field }) => (
                                <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                        </div>
                        <FormField control={form.control} name="subject" render={({ field }) => (
                            <FormItem><FormLabel>Subject</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <FormField control={form.control} name="message" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Your feedback or suggestion..." rows={6} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <SubmitButton />
                    </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
