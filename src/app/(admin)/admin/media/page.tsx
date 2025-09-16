
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
import { Badge } from "@/components/ui/badge";
import { mediaItems as initialMediaItems } from "@/lib/placeholder-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
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
import { useMedia } from "@/context/MediaContext";


type MediaItem = typeof initialMediaItems[0];

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
      {items.map((item, index) => {
        const itemImage = PlaceHolderImages.find(p => p.id === `media-${(index % 6) + 1}`);
        return (
          <TableRow key={item.id}>
              <TableCell className="hidden sm:table-cell">
                {itemImage ? (
                  <Image
                    alt={item.title}
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src={itemImage.imageUrl}
                    width="64"
                  />
                ) : (
                  <div className="h-16 w-16 bg-muted rounded-md" />
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

  const form = useForm({
    defaultValues: {
      title: "",
      type: "Photo",
      image: undefined,
    }
  });

  useEffect(() => {
    if (editingItem) {
      form.reset({
        title: editingItem.title,
        type: editingItem.type,
      });
    } else {
      form.reset({
        title: "",
        type: "Photo",
        image: undefined,
      });
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
    if (editingItem) {
      updateMediaItem(editingItem.id, data);
    } else {
      const newItem = {
        id: `media-${mediaItems.length + 1}`,
        title: data.title,
        type: data.type,
        description: 'A newly added media item.',
        date: new Date().toLocaleDateString('en-CA'),
      };
      addMediaItem(newItem);
    }
    
    setOpen(false);
    setEditingItem(null);
  };

  const photoItems = mediaItems.filter(item => item.type === 'Photo');
  const videoItems = mediaItems.filter(item => item.type === 'Video');


  return (
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="photo">Photos</TabsTrigger>
            <TabsTrigger value="video">Videos</TabsTrigger>
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
                    Add Media
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{editingItem ? 'Edit Media' : 'Add Media'}</DialogTitle>
                  <DialogDescription>
                    {editingItem ? 'Update the details for this media item.' : 'Fill in the details for the new media item.'}
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
                            <Input placeholder="e.g., Seminar on Justice" {...field} />
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
            <CardTitle>Media Gallery</CardTitle>
            <CardDescription>
              Manage photos and videos for your website's gallery.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <TabsContent value="all">
              <MediaTable items={mediaItems} onEdit={handleEdit} onDelete={handleDelete} />
            </TabsContent>
            <TabsContent value="photo">
               <MediaTable items={photoItems} onEdit={handleEdit} onDelete={handleDelete} />
            </TabsContent>
            <TabsContent value="video">
               <MediaTable items={videoItems} onEdit={handleEdit} onDelete={handleDelete} />
            </TabsContent>
          </CardContent>
        </Card>
    </Tabs>
  );
}
