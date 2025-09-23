
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { PlusCircle, MoreHorizontal, Pin, PinOff } from "lucide-react";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMedia } from "@/context/MediaContext";
import type { MediaItem } from "@/context/MediaContext";
import ClientOnly from "@/components/ClientOnly";
import { StorageDebug } from "@/components/debug/StorageDebug";
import { handleLargeFile, getFileSizeInfo } from "@/lib/file-compression";

const MediaTable = ({ items, onEdit, onDelete, onPinToggle, onPreview }: { 
  items: MediaItem[], 
  onEdit: (item: MediaItem) => void, 
  onDelete: (id: string) => void, 
  onPinToggle: (id: string) => void,
  onPreview?: (item: MediaItem) => void 
}) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-8"></TableHead>
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
             <TableCell>
                {item.isPinned && <Pin className="h-4 w-4 text-primary" />}
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <div className="relative group">
                  {item.imageUrl ? (
                    <>
                      {item.type === 'Video' ? (
                        <div className="relative">
                          {(typeof item.imageUrl === 'string' && (item.imageUrl.startsWith('data:') || item.imageUrl.startsWith('local:') || item.imageUrl.startsWith('session:') || item.imageUrl.startsWith('indexeddb:'))) ? (
                            <video
                              className="aspect-square rounded-md object-cover w-16 h-16"
                              src={item.imageUrl}
                              muted
                            />
                          ) : (
                            <div className="h-16 w-16 bg-red-100 rounded-md flex items-center justify-center">
                              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black bg-opacity-30 rounded-md flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                          {onPreview && (
                            <button
                              onClick={() => onPreview(item)}
                              className="absolute inset-0 bg-transparent hover:bg-black hover:bg-opacity-10 rounded-md transition-colors"
                              title="Preview video"
                            />
                          )}
                        </div>
                      ) : (
                        (typeof item.imageUrl === 'string' && (item.imageUrl.startsWith('data:') || item.imageUrl.startsWith('local:') || item.imageUrl.startsWith('session:') || item.imageUrl.startsWith('indexeddb:'))) ? (
                          <img
                            alt={item.title}
                            className="aspect-square rounded-md object-cover cursor-pointer hover:opacity-80 transition-opacity"
                            height={64}
                            src={item.imageUrl}
                            width={64}
                            onClick={() => onPreview && onPreview(item)}
                            title="Click to preview"
                          />
                        ) : item.imageUrl ? (
                          <Image
                            alt={item.title}
                            className="aspect-square rounded-md object-cover cursor-pointer hover:opacity-80 transition-opacity"
                            height={64}
                            src={item.imageUrl}
                            width={64}
                            quality={85}
                            onClick={() => onPreview && onPreview(item)}
                            title="Click to preview"
                          />
                        ) : (
                          <div className="h-16 w-16 bg-gray-100 rounded-md flex items-center justify-center">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )
                      )}
                    </>
                  ) : (
                    <div className="h-16 w-16 bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground">
                      No {item.type}
                    </div>
                  )}
                </div>
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
                  <DropdownMenuItem onClick={() => onPinToggle(item.id)}>
                    {item.isPinned ? <PinOff className="mr-2 h-4 w-4" /> : <Pin className="mr-2 h-4 w-4" />}
                    {item.isPinned ? 'Unpin' : 'Pin'}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onDelete(item.id)} className="text-destructive">Delete</DropdownMenuItem>
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
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);
  const { mediaItems, addMediaItem, addMediaFromFile, updateMediaItem, deleteMediaItem, refreshFromStorage } = useMedia();
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<'image' | 'video' | null>(null);


  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      type: "Photo",
      isPinned: false,
      image: undefined as FileList | undefined,
    }
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size and show feedback
      const sizeInfo = getFileSizeInfo(file);
      console.log(`Selected file: ${file.name} (${sizeInfo.sizeFormatted})`);
      
      if (sizeInfo.isLarge) {
        alert(`File size: ${sizeInfo.sizeFormatted}. Maximum allowed for ${sizeInfo.fileType}s is ${sizeInfo.maxAllowedSize}MB. Please choose a smaller file.`);
        event.target.value = ''; // Clear the file input
        setFilePreview(null);
        setFileType(null);
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
         if (file.type.startsWith('video/')) {
          setFileType('video');
          // Update the form type to Video when a video file is selected
          form.setValue('type', 'Video');
        } else {
          setFileType('image');
          // Update the form type to Photo when an image file is selected
          form.setValue('type', 'Photo');
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
        isPinned: !!editingItem.isPinned,
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
        isPinned: false,
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

  const handlePinToggle = (id: string) => {
    const item = mediaItems.find(i => i.id === id);
    if (item) {
      updateMediaItem(id, { isPinned: !item.isPinned });
    }
  };

  const handlePreview = (item: MediaItem) => {
    setPreviewItem(item);
    setPreviewOpen(true);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setEditingItem(null);
    }
  };

  const onSubmit = async (data: any) => {
    const uploadedFile = data.image?.[0];
    console.log('Form submission data:', { type: data.type, title: data.title, fileType, hasUploadedFile: !!uploadedFile });

    try {
      if (editingItem) {
        // Update existing item
        const itemData: Partial<MediaItem> = {
          title: data.title,
          description: data.description,
          type: data.type,
          isPinned: data.isPinned,
        };
        
        // If new file uploaded, we would need to add addMediaFromFile for updates too
        // For now, keep existing imageUrl
        if (!uploadedFile) {
          updateMediaItem(editingItem.id, itemData);
          console.log('Updated media item (metadata only)');
        } else {
          // For simplicity, delete old and create new with new file
          deleteMediaItem(editingItem.id);
          await addMediaFromFile(uploadedFile, data.title, data.description);
          console.log('Replaced media item with new file');
        }
      } else {
        // Create new item
        if (uploadedFile) {
          console.log(`🆕 Creating new media item with file: ${uploadedFile.name}`);
          await addMediaFromFile(uploadedFile, data.title, data.description);
          console.log('✅ Successfully added new media item with optimized processing');
        } else {
          // Create item without file (metadata only)
          const newItem: MediaItem = {
            id: `media-${Date.now()}`,
            title: data.title,
            description: data.description,
            type: data.type,
            date: new Date().toLocaleDateString('en-CA'),
            isPinned: data.isPinned,
          };
          addMediaItem(newItem);
          console.log('✅ Successfully added metadata-only media item');
        }
      }

      // Close dialog and reset state
      setOpen(false);
      setEditingItem(null);
      setFilePreview(null);
      setFileType(null);
      
      // Force refresh to ensure thumbnails appear immediately
      setTimeout(() => refreshFromStorage(), 100);
      
    } catch (error) {
      console.error('❌ Error in media submission:', error);
      alert(error instanceof Error ? error.message : 'Failed to save media item. Please try again.');
    }
  };

  const photoItems = mediaItems.filter(item => item.type === 'Photo');
  const videoItems = mediaItems.filter(item => item.type === 'Video');


  return (
    <ClientOnly fallback={<div className="flex items-center justify-center p-4">Loading...</div>}>
      <div className="flex flex-col gap-4">
        {/* Debug component to monitor storage - moved to bottom left to avoid interference */}
        <div className="fixed bottom-4 left-4 z-40">
          <StorageDebug />
        </div>
        
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
                        name="isPinned"
                        render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                                <FormLabel>Pin to Homepage Slider</FormLabel>
                                <FormDescription>
                                    Enable this to feature the item in the main slider.
                                </FormDescription>
                            </div>
                            <FormControl>
                               <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                />
                            </FormControl>
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
                            <FormDescription>
                              Upload images (max 5MB) or videos (max 100MB). Supported formats: PNG, JPEG, GIF, MP4, WebM.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    {filePreview && (
                        <div className="mt-4 space-y-2">
                          <p className="text-sm font-medium">File Preview:</p>
                          {fileType === 'image' && (
                            filePreview && typeof filePreview === 'string' && filePreview.startsWith('data:') ? (
                              <img src={filePreview} alt="Image preview" className="rounded-md object-contain max-h-60 w-auto" />
                            ) : (
                              <Image src={filePreview || ''} alt="Image preview" width={400} height={225} className="rounded-md object-contain max-h-60 w-auto" />
                            )
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

      {/* Media Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-full">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Media</p>
                <p className="text-2xl font-bold">{mediaItems.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-full">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Photos</p>
                <p className="text-2xl font-bold">{photoItems.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-red-100 rounded-full">
                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Videos</p>
                <p className="text-2xl font-bold">{videoItems.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
            <TabsTrigger value="all">All ({mediaItems.length})</TabsTrigger>
            <TabsTrigger value="photo">Photos ({photoItems.length})</TabsTrigger>
            <TabsTrigger value="video">Videos ({videoItems.length})</TabsTrigger>
        </TabsList>
        <Card className="mt-4">
          <CardContent className="pt-6">
             <TabsContent value="all" className="mt-0">
              <MediaTable items={mediaItems} onEdit={handleEdit} onDelete={handleDelete} onPinToggle={handlePinToggle} onPreview={handlePreview} />
            </TabsContent>
            <TabsContent value="photo" className="mt-0">
               <MediaTable items={photoItems} onEdit={handleEdit} onDelete={handleDelete} onPinToggle={handlePinToggle} onPreview={handlePreview} />
            </TabsContent>
            <TabsContent value="video" className="mt-0">
               <MediaTable items={videoItems} onEdit={handleEdit} onDelete={handleDelete} onPinToggle={handlePinToggle} onPreview={handlePreview} />
            </TabsContent>
          </CardContent>
        </Card>
    </Tabs>

    {/* Preview Modal */}
    <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>{previewItem?.title}</DialogTitle>
          <DialogDescription>
            {previewItem?.description}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center">
          {previewItem?.type === 'Video' && previewItem?.imageUrl ? (
            <video 
              src={previewItem.imageUrl} 
              controls 
              className="rounded-md max-h-96 w-auto"
              autoPlay={false}
            />
          ) : previewItem?.imageUrl ? (
            previewItem.imageUrl.startsWith('data:') ? (
              <img 
                src={previewItem.imageUrl} 
                alt={previewItem.title}
                className="rounded-md max-h-96 w-auto object-contain"
              />
            ) : (
              <Image 
                src={previewItem.imageUrl} 
                alt={previewItem.title}
                width={800}
                height={600}
                className="rounded-md max-h-96 w-auto object-contain"
                quality={90}
              />
            )
          ) : (
            <div className="h-48 w-full bg-muted rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">No preview available</p>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>Type: {previewItem?.type}</span>
          <span>Date: {previewItem?.date}</span>
          {previewItem?.isPinned && <Badge variant="secondary">Pinned</Badge>}
        </div>
      </DialogContent>
    </Dialog>
      </div>
    </ClientOnly>
  );
}
