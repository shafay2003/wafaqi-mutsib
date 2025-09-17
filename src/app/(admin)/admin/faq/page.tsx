
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { PlusCircle, MoreHorizontal, Trash2, Edit } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFaqs } from "@/context/FaqContext";
import type { faqs as initialFaqs } from "@/lib/placeholder-data";

type FaqItem = (typeof initialFaqs)[0];

export default function AdminFaqPage() {
  const [open, setOpen] = useState(false);
  const { faqs, addFaq, updateFaq, deleteFaq } = useFaqs();
  const [editingItem, setEditingItem] = useState<FaqItem | null>(null);

  const form = useForm({
    defaultValues: {
      question: "",
      answer: "",
    }
  });

  useEffect(() => {
    if (editingItem) {
      form.reset({
        question: editingItem.question,
        answer: editingItem.answer,
      });
    } else {
      form.reset({
        question: "",
        answer: "",
      });
    }
  }, [editingItem, form, open]);

  const handleAddNew = () => {
    setEditingItem(null);
    setOpen(true);
  };

  const handleEdit = (item: FaqItem) => {
    setEditingItem(item);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteFaq(id);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setEditingItem(null);
    }
  };

  const onSubmit = (data: any) => {
    if (editingItem) {
      updateFaq(editingItem.id, data);
    } else {
      const newFaq: FaqItem = {
        id: `faq-${faqs.length + 1}`,
        question: data.question,
        answer: data.answer,
      };
      addFaq(newFaq);
    }
    
    setOpen(false);
    setEditingItem(null);
  };

  return (
    <div className="flex flex-col gap-4">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="space-y-1">
                <h1 className="text-2xl font-semibold tracking-tight">FAQ Management</h1>
                <p className="text-sm text-muted-foreground">Manage the Frequently Asked Questions on your site.</p>
            </div>
            <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1" onClick={handleAddNew}>
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add FAQ</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                <DialogTitle>{editingItem ? 'Edit FAQ' : 'Add New FAQ'}</DialogTitle>
                <DialogDescription>
                    {editingItem ? 'Update the question and answer for this FAQ.' : 'Fill in the details for the new FAQ.'}
                </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                    <FormField
                      control={form.control}
                      name="question"
                      render={({ field }) => (
                          <FormItem>
                          <FormLabel>Question</FormLabel>
                          <FormControl>
                              <Input placeholder="e.g., What is the role of the Wafaqi Mohtasib?" {...field} />
                          </FormControl>
                          <FormMessage />
                          </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="answer"
                      render={({ field }) => (
                          <FormItem>
                          <FormLabel>Answer</FormLabel>
                          <FormControl>
                              <Textarea placeholder="Provide a clear and concise answer..." {...field} rows={5} />
                          </FormControl>
                          <FormMessage />
                          </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <Button type="submit">Save</Button>
                    </DialogFooter>
                </form>
                </Form>
            </DialogContent>
            </Dialog>
        </header>

        <Card>
            <CardContent className="pt-6">
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id} className="group">
                        <div className="flex items-center justify-between">
                            <AccordionTrigger className="text-left font-semibold text-base hover:no-underline flex-1">
                                {faq.question}
                            </AccordionTrigger>
                            <div className="flex items-center gap-2 pr-4">
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(faq)}>
                                    <Edit className="h-4 w-4 text-muted-foreground" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDelete(faq.id)}>
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                            </div>
                        </div>
                        <AccordionContent className="text-muted-foreground text-sm">
                        {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                    ))}
                </Accordion>

                {faqs.length === 0 && (
                    <div className="text-center text-muted-foreground py-12">
                        <p>No FAQs found.</p>
                        <Button variant="link" onClick={handleAddNew}>Add the first one</Button>
                    </div>
                )}
            </CardContent>
        </Card>
    </div>
  );
}
