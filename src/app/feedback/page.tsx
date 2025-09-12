"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
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
import { Loader2, Send } from "lucide-react";
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
  const [state, formAction] = useActionState(submitFeedback, {
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
    <div className="flex flex-col gap-4">
        <header className="text-left space-y-1.5">
            <h1 className="text-2xl font-semibold tracking-tight">
            Feedback & Suggestions
            </h1>
            <p className="text-sm text-muted-foreground">
            We value your input. Please share your thoughts to help us improve our services.
            </p>
        </header>

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
  );
}
