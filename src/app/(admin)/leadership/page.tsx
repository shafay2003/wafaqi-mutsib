
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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
import { useForm } from "react-hook-form";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useKeyPersonnel } from "@/context/KeyPersonnelContext";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { keyPersonnel as initialKeyPersonnel } from "@/lib/placeholder-data";

type PersonnelItem = (typeof initialKeyPersonnel)[0];

export default function AdminLeadershipPage() {
  const [open, setOpen] = useState(false);
  const { keyPersonnel, addPersonnel, updatePersonnel, deletePersonnel } = useKeyPersonnel();
  const [editingItem, setEditingItem] = useState<PersonnelItem | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      id: "",
      name: "",
      title: "",
      imageId: "",
      bio: "",
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  useEffect(() => {
    if (editingItem) {
      form.reset({
        id: editingItem.id,
        name: editingItem.name,
        title: editingItem.title,
        imageId: editingItem.imageId,
        bio: editingItem.bio.join('\n\n'),
      });
      const existingImage = PlaceHolderImages.find(p => p.id === editingItem.imageId);
      if (existingImage) {
        setImagePreview(existingImage.imageUrl);
      }
    } else {
      form.reset({
        id: "",
        name: "",
        title: "",
        imageId: "",
        bio: "",
      });
    }
    if (!open) {
      setImagePreview(null);
    }
  }, [editingItem, form, open]);

  const handleAddNew = () => {
    setEditingItem(null);
    setOpen(true);
  };

  const handleEdit = (item: PersonnelItem) => {
    setEditingItem(item);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    deletePersonnel(id);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setEditingItem(null);
    }
  };

  const onSubmit = (data: any) => {
    const bioArray = data.bio.split('\n\n').filter((p: string) => p.trim() !== '');

    if (editingItem) {
      updatePersonnel(editingItem.id, { ...data, bio: bioArray });
    } else {
      const newPersonnel: PersonnelItem = {
        id: data.id || `personnel-${keyPersonnel.length + 1}`,
        name: data.name,
        title: data.title,
        imageId: data.imageId,
        bio: bioArray,
      };
      addPersonnel(newPersonnel);
    }

    setOpen(false);
    setEditingItem(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Leadership Profiles</h1>
          <p className="text-sm text-muted-foreground">Manage the leadership profiles displayed on the website.</p>
        </div>
        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button size="sm" className="h-8 gap-1" onClick={handleAddNew}>
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Personnel</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit Profile' : 'Add New Profile'}</DialogTitle>
              <DialogDescription>
                {editingItem ? 'Update the details for this person.' : 'Fill in the details for the new leadership profile.'}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl><Input placeholder="e.g., Ejaz Ahmad Qureshi" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title / Designation</FormLabel>
                      <FormControl><Input placeholder="e.g., Wafaqi Mohtasib (Ombudsman) of Pakistan" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile ID</FormLabel>
                      <FormControl><Input placeholder="e.g., ejaz-ahmad-qureshi" {...field} disabled={!!editingItem} /></FormControl>
                      <FormDescription>A unique ID used for the profile page URL. Cannot be changed after creation.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="imageId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image ID</FormLabel>
                      <FormControl><Input placeholder="e.g., mohtasib-profile" {...field} /></FormControl>
                      <FormDescription>The ID of the placeholder image from placeholder-images.json.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Biography</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter the full biography. Separate paragraphs with double line breaks." {...field} rows={10} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Save Profile</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </header>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keyPersonnel.map((person) => {
                const personImage = PlaceHolderImages.find(p => p.id === person.imageId);
                return (
                  <TableRow key={person.id}>
                    <TableCell>
                      {personImage ? (
                        <Image
                          alt={person.name}
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={personImage.imageUrl}
                          width="64"
                        />
                      ) : (
                        <div className="h-16 w-16 bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground">
                          No Image
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{person.name}</TableCell>
                    <TableCell className="text-muted-foreground">{person.title}</TableCell>
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
                          <DropdownMenuItem onClick={() => handleEdit(person)}>Edit</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(person.id)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
