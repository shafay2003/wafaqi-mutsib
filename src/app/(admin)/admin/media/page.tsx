
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
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { PlusCircle, MoreHorizontal } from "lucide-react";
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
import { useMedia } from "@/context/MediaContext";
import type { MediaItem } from "@/context/MediaContext";

const MediaTable = ({ items, onEdit, onDelete }: { items: MediaItem[], onEdit: (item: MediaItem) => void, onDelete: (id: string) => void }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="hidden w-24 sm:table-cell">Image</TableHead>
        <TableHead>Title</TableHead>
        <TableHead>Type</TableHead>
          <TableHead className="hidden md:table-cell">Date</TableHead>
        <TableHead>
          <span className="sr-only">Actions</span>
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {items.map((item) => {
        return (
          <TableRow key={item.id}>
              <TableCell className="hidden sm:table-cell">
                {item.imageUrl ? (
                  <Image
                    alt={item.title}
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src={item.imageUrl}
                    width="64"
                    quality={85}
                  />
                ) : (
                  <div className="h-16 w-16 bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground">
                    No Image
                  </div>
                )}
              </TableCell>
            <TableCell className="font-medium">{item.title}</TableCell>
            <TableCell>
              <Badge variant={item.type === 'Video' ? 'destructive' : 'secondary'}>
                {item.type}
              </Badge>
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
        )
      })}
    </TableBody>
  </Table>
);


export default function AdminMediaPage() {
  const [open, setOpen] = useState(false);
  const { mediaItems, addMediaItem, updateMediaItem, deleteMediaItem } = useMedia();
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<'image' | 'video' | null>(null);


  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      type: "Photo",
      image: undefined as FileList | undefined,
    }
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
         if (file.type.startsWith('video/')) {
          setFileType('video');
        } else {
          setFileType('image');
        }
      };
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
      setFileType(null);
    }
  };

  useEffect(() => {
    if (editingItem) {
      form.reset({
        title: editingItem.title,
        description: editingItem.description,
        type: editingItem.type,
      });
      if (editingItem.imageUrl) {
        setFilePreview(editingItem.imageUrl);
        setFileType(editingItem.type.toLowerCase() === 'video' ? 'video' : 'image');
      }
    } else {
      form.reset({
        title: "",
        description: "",
        type: "Photo",
        image: undefined,
      });
    }
    if (!open) {
      setFilePreview(null);
      setFileType(null);
    }
  }, [editingItem, form, open]);

  const handleAddNew = () => {
    setEditingItem(null);
    setOpen(true);
  };

  const handleEdit = (item: MediaItem) => {
    setEditingItem(item);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteMediaItem(id);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setEditingItem(null);
    }
  };

  const onSubmit = (data: any) => {
    const uploadedFile = data.image?.[0];

    const processSubmit = (imageUrl?: string) => {
      const itemData: Partial<MediaItem> = {
        title: data.title,
        description: data.description,
        type: data.type,
      };

      if (imageUrl) {
        itemData.imageUrl = imageUrl;
      }

      if (editingItem) {
        updateMediaItem(editingItem.id, itemData);
      } else {
        const newItem: MediaItem = {
          id: `media-${Date.now()}`,
          date: new Date().toLocaleDateString('en-CA'),
          ...itemData
        } as MediaItem;
        addMediaItem(newItem);
      }
      setOpen(false);
      setEditingItem(null);
    }

    if (uploadedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        processSubmit(reader.result as string);
      };
      reader.readAsDataURL(uploadedFile);
    } else {
      processSubmit(editingItem?.imageUrl);
    }
  };

  const photoItems = mediaItems.filter(item => item.type === 'Photo');
  const videoItems = mediaItems.filter(item => item.type === 'Video');


  return (
    <div className="flex flex-col gap-4">
       <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight">Media Gallery</h1>
            <p className="text-sm text-muted-foreground">Manage photos and videos for your website's gallery.</p>
        </div>
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
            <Button size="sm" className="h-8 gap-1" onClick={handleAddNew}>
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Media
                </span>
            </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
            <DialogHeader>
                <DialogTitle>{editingItem ? 'Edit Media' : 'Add Media'}</DialogTitle>
                <DialogDescription>
                {editingItem ? 'Update the details for this media item.' : 'Fill in the details for the new media item.'}
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-6">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                            <Input placeholder="e.g., Seminar on Justice" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                            <Textarea placeholder="A short description of the media item..." {...field} rows={4} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Select media type" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="Photo">Photo</SelectItem>
                                <SelectItem value="Video">Video</SelectItem>
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>File</FormLabel>
                            <FormControl>
                            <Input 
                                type="file" 
                                accept="image/png, image/jpeg, image/gif, video/mp4, video/webm"
                                onChange={(e) => {
                                field.onChange(e.target.files);
                                handleFileChange(e);
                                }}
                            />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    {filePreview && (
                        <div className="mt-4 space-y-2">
                          <p className="text-sm font-medium">File Preview:</p>
                          {fileType === 'image' && (
                              <Image src={filePreview} alt="Image preview" width={400} height={225} className="rounded-md object-contain max-h-60 w-auto" />
                          )}
                          {fileType === 'video' && (
                              <video src={filePreview} controls className="rounded-md w-full max-h-60" />
                          )}
                        </div>
                    )}
                  </div>
                  <DialogFooter className="pt-4 border-t">
                      <Button type="submit">Save</Button>
                  </DialogFooter>
                </form>
            </Form>
            </DialogContent>
        </Dialog>
        </header>

      <Tabs defaultValue="all">
        <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="photo">Photos</TabsTrigger>
            <TabsTrigger value="video">Videos</TabsTrigger>
        </TabsList>
        <Card className="mt-4">
          <CardContent className="pt-6">
             <TabsContent value="all" className="mt-0">
              <MediaTable items={mediaItems} onEdit={handleEdit} onDelete={handleDelete} />
            </TabsContent>
            <TabsContent value="photo" className="mt-0">
               <MediaTable items={photoItems} onEdit={handleEdit} onDelete={handleDelete} />
            </TabsContent>
            <TabsContent value="video" className="mt-0">
               <MediaTable items={videoItems} onEdit={handleEdit} onDelete={handleDelete} />
            </TabsContent>
          </CardContent>
        </Card>
    </Tabs>
    </div>
  );
}

    