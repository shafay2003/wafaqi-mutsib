
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

type StoryItem = typeof initialSuccessStories[0];

export default function AdminSuccessStoriesPage() {
  const [open, setOpen] = useState(false);
  const [storyList, setStoryList] = useState(initialSuccessStories);
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
    setOpen(true);
  };

  const handleEdit = (item: StoryItem) => {
    setEditingItem(item);
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
        <Dialog open={open} onOpenChange={(isOpen) => { setOpen(isOpen); if (!isOpen) setEditingItem(null); }}>
          <DialogTrigger asChild>
            <Button size="sm" className="h-7 gap-1" onClick={handleAddNew}>
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Story</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit Success Story' : 'Add New Success Story'}</DialogTitle>
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
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Title</FormLabel>
                      <FormControl className="col-span-3">
                        <Input placeholder="e.g., Pensioner Receives Arrears" {...field} />
                      </FormControl>
                      <FormMessage className="col-span-4" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="summary"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Summary</FormLabel>
                      <FormControl className="col-span-3">
                        <Textarea placeholder="A short summary of the story..." {...field} />
                      </FormControl>
                      <FormMessage className="col-span-4" />
                    </FormItem>
                  )}
                />
                 <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem className="grid grid-cols-4 items-center gap-4">
                          <FormLabel className="text-right">Image</FormLabel>
                          <FormControl className="col-span-3">
                            <Input type="file" />
                          </FormControl>
                          <FormMessage className="col-span-4" />
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
