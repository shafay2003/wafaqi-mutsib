
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
  const [notificationList, setNotificationList] = useState(initialNotifications);
  const [editingItem, setEditingItem] = useState<NotificationItem | null>(null);

  const form = useForm({
    defaultValues: {
      title: "",
      type: "Notification",
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
        type: "Notification",
      });
    }
  }, [editingItem, form]);

  const handleAddNew = () => {
    setEditingItem(null);
    setOpen(true);
  };

  const handleEdit = (item: NotificationItem) => {
    setEditingItem(item);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    setNotificationList(notificationList.filter(item => item.id !== id));
  };


  const onSubmit = (data: any) => {
    if (editingItem) {
      const updatedList = notificationList.map(item => 
        item.id === editingItem.id ? { ...item, ...data } : item
      );
      setNotificationList(updatedList);
    } else {
      const newItem = {
        id: `not-${notificationList.length + 1}`,
        title: data.title,
        type: data.type,
        date: new Date().toLocaleDateString('en-CA'),
      };
      setNotificationList([newItem, ...notificationList]);
    }
    
    setOpen(false);
    setEditingItem(null);
    form.reset();
  };

  const notificationItems = notificationList.filter(item => item.type === 'Notification');
  const pressReleaseItems = notificationList.filter(item => item.type === 'Press Release');

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
            <Dialog open={open} onOpenChange={(isOpen) => { setOpen(isOpen); if (!isOpen) setEditingItem(null); }}>
              <DialogTrigger asChild>
                <Button size="sm" className="h-7 gap-1" onClick={handleAddNew}>
                  <PlusCircle className="h-3.5 w-3.5" />
                   <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Item
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{editingItem ? 'Edit Update' : 'Add New Update'}</DialogTitle>
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
                        <FormItem className="grid grid-cols-4 items-center gap-4">
                          <FormLabel className="text-right">Title</FormLabel>
                          <FormControl className="col-span-3">
                            <Input placeholder="e.g., Public Hearing Notice" {...field} />
                          </FormControl>
                          <FormMessage className="col-span-4" />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem className="grid grid-cols-4 items-center gap-4">
                          <FormLabel className="text-right">Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl className="col-span-3">
                              <SelectTrigger>
                                <SelectValue placeholder="Select a type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Notification">Notification</SelectItem>
                              <SelectItem value="Press Release">Press Release</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="col-span-4" />
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
              <NotificationTable items={notificationList} onEdit={handleEdit} onDelete={handleDelete} />
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
