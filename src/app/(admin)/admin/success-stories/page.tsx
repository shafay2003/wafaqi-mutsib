
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { successStories as initialSuccessStories } from "@/lib/placeholder-data";
import { useForm } from "react-hook-form";
import { PlusCircle, MoreHorizontal, File, Sparkles, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { generateStory } from "@/ai/flows/story-generator-flow";

type StoryItem = typeof initialSuccessStories[0];

export default function AdminSuccessStoriesPage() {
  const [open, setOpen] = useState(false);
  const [storyList, setStoryList] = useState(initialSuccessStories);
  const [editingItem, setEditingItem] = useState<StoryItem | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm({
    defaultValues: {
      title: "",
      summary: "",
      image: undefined
    }
  });

  const storyTitle = form.watch("title");

  const handleGenerateStory = async () => {
    if (!storyTitle) return;
    setIsGenerating(true);
    try {
      const result = await generateStory({ title: storyTitle });
      if (result) {
        form.setValue("summary", result.summary);
      }
    } catch (error) {
      console.error("Failed to generate story:", error);
    } finally {
      setIsGenerating(false);
    }
  };


  useEffect(() => {
    if (editingItem) {
      form.reset({
        title: editingItem.title,
        summary: editingItem.summary,
      });
    } else {
      form.reset({
        title: "",
        summary: "",
        image: undefined
      });
    }
  }, [editingItem, form]);

  const handleAddNew = () => {
    setEditingItem(null);
    form.reset();
    setOpen(true);
  };

  const handleEdit = (item: StoryItem) => {
    setEditingItem(item);
    form.reset({
      title: item.title,
      summary: item.summary,
    });
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    setStoryList(storyList.filter(item => item.id !== id));
  };


  const onSubmit = (data: any) => {
    if (editingItem) {
      const updatedList = storyList.map(item => 
        item.id === editingItem.id ? { ...item, ...data } : item
      );
      setStoryList(updatedList);
    } else {
      const newStory: StoryItem = {
        id: `ss-${storyList.length + 1}`,
        title: data.title,
        summary: data.summary,
        date: new Date().toLocaleDateString('en-CA'),
      };
      setStoryList([newStory, ...storyList]);
    }
    
    setOpen(false);
    setEditingItem(null);
    form.reset();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 ml-auto">
        <Button size="sm" variant="outline" className="h-7 gap-1">
          <File className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
        </Button>
        <Dialog open={open} onOpenChange={(isOpen) => { setOpen(isOpen); if (!isOpen) { setEditingItem(null); form.reset(); } }}>
          <DialogTrigger asChild>
            <Button size="sm" className="h-7 gap-1" onClick={handleAddNew}>
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Story</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit Success Story' : 'Add New Success Story'}</DialogTitle>
              <DialogDescription>
                {editingItem ? 'Update the details for this success story.' : 'Fill in the details for the new success story. You can use AI to generate a summary.'}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Pensioner Receives Arrears" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <FormLabel>Summary</FormLabel>
                         <Button type="button" variant="outline" size="sm" onClick={handleGenerateStory} disabled={!storyTitle || isGenerating}>
                          {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                          Generate with AI
                        </Button>
                    </div>
                    <FormField
                      control={form.control}
                      name="summary"
                      render={({ field }) => (
                        <FormItem className="!mt-0">
                          <FormControl>
                            <Textarea placeholder="A short summary of the story..." {...field} rows={6} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </div>
                 <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image</FormLabel>
                          <FormControl>
                            <Input type="file" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                <DialogFooter>
                  <Button type="submit">Save story</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Success Stories</CardTitle>
          <CardDescription>Manage success stories featured on the website.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Summary</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {storyList.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell className="hidden md:table-cell max-w-sm truncate">{item.summary}</TableCell>
                  <TableCell className="hidden md:table-cell">{item.date}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEdit(item)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(item.id)}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
