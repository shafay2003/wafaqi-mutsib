
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
import { PlusCircle, MoreHorizontal, File } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSuccessStories } from "@/context/SuccessStoriesContext";

type StoryItem = typeof initialSuccessStories[0];

export default function AdminSuccessStoriesPage() {
  const [open, setOpen] = useState(false);
  const { successStories, addSuccessStory, updateSuccessStory, deleteSuccessStory } = useSuccessStories();
  const [editingItem, setEditingItem] = useState<StoryItem | null>(null);

  const form = useForm({
    defaultValues: {
      title: "",
      summary: "",
      image: undefined
    }
  });

  useEffect(() => {
    if (editingItem) {
      form.reset({
        title: editingItem.title,
        summary: editingItem.summary,
        image: undefined
      });
    } else {
      form.reset({
        title: "",
        summary: "",
        image: undefined
      });
    }
  }, [editingItem, form, open]);

  const handleAddNew = () => {
    setEditingItem(null);
    setOpen(true);
  };

  const handleEdit = (item: StoryItem) => {
    setEditingItem(item);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteSuccessStory(id);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setEditingItem(null);
    }
  };

  const onSubmit = (data: any) => {
    if (editingItem) {
      updateSuccessStory(editingItem.id, data);
    } else {
      const newStory: StoryItem = {
        id: `ss-${successStories.length + 1}`,
        title: data.title,
        summary: data.summary,
        date: new Date().toLocaleDateString('en-CA'),
      };
      addSuccessStory(newStory);
    }
    
    setOpen(false);
    setEditingItem(null);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Success Stories</CardTitle>
            <CardDescription>Manage success stories featured on the website.</CardDescription>
          </div>
          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <Button size="sm" variant="outline" className="h-7 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
            </Button>
            <Dialog open={open} onOpenChange={handleOpenChange}>
              <DialogTrigger asChild>
                <Button size="sm" className="h-7 gap-1" onClick={handleAddNew}>
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Story</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>{editingItem ? 'Edit Story' : 'Add Story'}</DialogTitle>
                  <DialogDescription>
                    {editingItem ? 'Update the details for this success story.' : 'Fill in the details for the new success story.'}
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
                    <FormField
                      control={form.control}
                      name="summary"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Summary</FormLabel>
                          <FormControl>
                            <Textarea placeholder="A short summary of the story..." {...field} rows={6} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                          control={form.control}
                          name="image"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Image</FormLabel>
                              <FormControl>
                                <Input 
                                  type="file"
                                  onChange={(e) => field.onChange(e.target.files)}
                                />
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
          </div>
        </div>
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
            {successStories.map((item) => (
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
  );
}
