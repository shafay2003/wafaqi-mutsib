
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { usePages, type PageContent } from "@/context/PagesContext";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

type PageKey = keyof PageContent;

const editablePages: { key: PageKey; name: string }[] = [
  { key: "about", name: "About Us" },
  { key: "contact", name: "Contact Us" },
];

export default function AdminPagesPage() {
  const { pages, updatePage, loading: contextLoading } = usePages();
  const [selectedPage, setSelectedPage] = useState<PageKey>(editablePages[0].key);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      content: "",
    },
  });

  useEffect(() => {
    if (pages && selectedPage) {
      form.reset({ content: pages[selectedPage] });
    }
  }, [pages, selectedPage, form]);
  
  if (contextLoading) {
    return <p>Loading page content...</p>
  }

  const onSubmit = (data: { content: string }) => {
    setLoading(true);
    updatePage(selectedPage, data.content);
    
    setTimeout(() => {
        setLoading(false);
        toast({
            title: "Page Updated!",
            description: `The content for the "${editablePages.find(p => p.key === selectedPage)?.name}" page has been saved.`
        })
    }, 500);
  };

  return (
     <div className="flex flex-col gap-4">
        <header>
            <h1 className="text-2xl font-semibold tracking-tight">Page Management</h1>
            <p className="text-sm text-muted-foreground">
                Edit the content of key static pages on your website.
            </p>
        </header>

        <Card>
            <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <CardTitle>Select a Page to Edit</CardTitle>
                        <CardDescription className="mt-1">Choose a page from the dropdown to modify its main content block.</CardDescription>
                    </div>
                    <Select onValueChange={(value) => setSelectedPage(value as PageKey)} defaultValue={selectedPage}>
                        <SelectTrigger className="w-full sm:w-[240px]">
                            <SelectValue placeholder="Select a page" />
                        </SelectTrigger>
                        <SelectContent>
                            {editablePages.map((page) => (
                            <SelectItem key={page.key} value={page.key}>{page.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className="text-base font-semibold">Page Content</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Enter the main content for the page here..."
                                        rows={15}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end">
                            <Button type="submit" disabled={loading}>
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </div>
  );
}
