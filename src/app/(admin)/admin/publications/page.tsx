
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
import { Badge } from "@/components/ui/badge";
import { publications as initialPublications } from "@/lib/placeholder-data";
import { useForm } from "react-hook-form";
import { PlusCircle, MoreHorizontal, File } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePublications } from "@/context/PublicationsContext";

type PublicationItem = typeof initialPublications[0];
const categories = ["Annual Reports", "Research Papers", "Laws & Regulations"];

const PublicationTable = ({ items, onEdit, onDelete }: { items: PublicationItem[], onEdit: (item: PublicationItem) => void, onDelete: (id: string) => void }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Title</TableHead>
        <TableHead>Category</TableHead>
          <TableHead className="hidden md:table-cell">Date</TableHead>
        <TableHead>
          <span className="sr-only">Actions</span>
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {items.map((item) => (
        <TableRow key={item.id}>
          <TableCell className="font-medium">{item.title}</TableCell>
          <TableCell>
            <Badge variant="secondary">{item.category}</Badge>
          </TableCell>
            <TableCell className="hidden md:table-cell">{item.date}</TableCell>
          <TableCell>
              <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-haspopup="true"
                  size="icon"
                  variant="ghost"
                >
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => onEdit(item)}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete(item.id)}>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default function AdminPublicationsPage() {
  const [open, setOpen] = useState(false);
  const { publications, addPublication, updatePublication, deletePublication } = usePublications();
  const [editingItem, setEditingItem] = useState<PublicationItem | null>(null);


  const form = useForm({
    defaultValues: {
      title: "",
      category: categories[0],
      file: undefined,
    }
  });

  useEffect(() => {
    if (editingItem) {
      form.reset({
        title: editingItem.title,
        category: editingItem.category,
      });
    } else {
      form.reset({
        title: "",
        category: categories[0],
        file: undefined
      });
    }
  }, [editingItem, form, open]);

  const handleAddNew = () => {
    setEditingItem(null);
    setOpen(true);
  };

  const handleEdit = (item: PublicationItem) => {
    setEditingItem(item);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    deletePublication(id);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setEditingItem(null);
    }
  };


  const onSubmit = (data: any) => {
    if (editingItem) {
      updatePublication(editingItem.id, { ...data, url: editingItem.url });
    } else {
      const newItem: PublicationItem = {
        id: `pub-${publications.length + 1}`,
        title: data.title,
        category: data.category,
        date: new Date().toLocaleDateString('en-CA'),
        url: '#',
      };
      addPublication(newItem);
    }
    
    setOpen(false);
    setEditingItem(null);
  };

  return (
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
             {categories.map(cat => (
              <TabsTrigger key={cat} value={cat.replace(/\s+/g, '-').toLowerCase()}>{cat}</TabsTrigger>
            ))}
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" variant="outline" className="h-7 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Dialog open={open} onOpenChange={handleOpenChange}>
              <DialogTrigger asChild>
                <Button size="sm" className="h-7 gap-1" onClick={handleAddNew}>
                  <PlusCircle className="h-3.5 w-3.5" />
                   <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Publication
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{editingItem ? 'Edit Publication' : 'Add Publication'}</DialogTitle>
                  <DialogDescription>
                     {editingItem ? 'Update the details for this publication.' : 'Fill in the details for the new publication.'}
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
                            <Input placeholder="e.g., Annual Report 2024" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map(cat => (
                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="file"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>File</FormLabel>
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
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Publications</CardTitle>
            <CardDescription>
              Manage all official documents and research materials.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TabsContent value="all">
              <PublicationTable items={publications} onEdit={handleEdit} onDelete={handleDelete} />
            </TabsContent>
            {categories.map(cat => (
              <TabsContent key={cat} value={cat.replace(/\s+/g, '-').toLowerCase()}>
                <PublicationTable items={publications.filter(p => p.category === cat)} onEdit={handleEdit} onDelete={handleDelete} />
              </TabsContent>
            ))}
          </CardContent>
        </Card>
    </Tabs>
  );
}
