
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
import { notifications as initialNotifications } from "@/lib/placeholder-data";
import { useForm } from "react-hook-form";
import { PlusCircle, MoreHorizontal, File, Download } from "lucide-react";
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
import { useNotifications } from "@/context/NotificationsContext";

type NotificationItem = typeof initialNotifications[0];

const NotificationTable = ({ items, onEdit, onDelete }: { items: NotificationItem[], onEdit: (item: NotificationItem) => void, onDelete: (id: string) => void }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Title</TableHead>
        <TableHead>Type</TableHead>
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
            <Badge variant={item.type === 'Press Release' ? 'destructive' : 'secondary'}>
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
      ))}
    </TableBody>
  </Table>
);


export default function AdminNotificationsPage() {
  const [open, setOpen] = useState(false);
  const { notifications, addNotification, updateNotification, deleteNotification } = useNotifications();
  const [editingItem, setEditingItem] = useState<NotificationItem | null>(null);

  const form = useForm({
    defaultValues: {
      title: "",
      type: "Notification",
      file: undefined,
    }
  });

   useEffect(() => {
    if (editingItem) {
      form.reset({
        title: editingItem.title,
        type: editingItem.type,
        file: undefined,
      });
    } else {
      form.reset({
        title: "",
        type: "Notification",
        file: undefined,
      });
    }
  }, [editingItem, form, open]);

  const handleAddNew = () => {
    setEditingItem(null);
    setOpen(true);
  };

  const handleEdit = (item: NotificationItem) => {
    setEditingItem(item);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteNotification(id);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setEditingItem(null);
    }
  };


  const onSubmit = (data: any) => {
    if (editingItem) {
      updateNotification(editingItem.id, { ...data, url: editingItem.url });
    } else {
      const newItem = {
        id: `not-${notifications.length + 1}`,
        title: data.title,
        type: data.type,
        date: new Date().toLocaleDateString('en-CA'),
        url: "#", // Placeholder URL
      };
      addNotification(newItem);
    }
    
    setOpen(false);
    setEditingItem(null);
  };

  const notificationItems = notifications.filter(item => item.type === 'Notification');
  const pressReleaseItems = notifications.filter(item => item.type === 'Press Release');

  return (
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="notification">Notifications</TabsTrigger>
            <TabsTrigger value="press-release">Press Releases</TabsTrigger>
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
                    Add Notification
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{editingItem ? 'Edit Notification' : 'Add Notification'}</DialogTitle>
                  <DialogDescription>
                    {editingItem ? 'Update this notification or press release.' : 'Add a new notification or press release.'}
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
                            <Input placeholder="e.g., Public Hearing Notice" {...field} />
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
                                <SelectValue placeholder="Select a type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Notification">Notification</SelectItem>
                              <SelectItem value="Press Release">Press Release</SelectItem>
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
            <CardTitle>Notifications & Press Releases</CardTitle>
            <CardDescription>
              Manage updates and announcements for the website.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TabsContent value="all">
              <NotificationTable items={notifications} onEdit={handleEdit} onDelete={handleDelete} />
            </TabsContent>
            <TabsContent value="notification">
              <NotificationTable items={notificationItems} onEdit={handleEdit} onDelete={handleDelete} />
            </TabsContent>
            <TabsContent value="press-release">
              <NotificationTable items={pressReleaseItems} onEdit={handleEdit} onDelete={handleDelete} />
            </TabsContent>
          </CardContent>
        </Card>
    </Tabs>
  );
}
