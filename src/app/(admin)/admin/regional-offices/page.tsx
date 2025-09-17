
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
import { useForm } from "react-hook-form";
import { PlusCircle, MoreHorizontal, MapPin, Phone, Mail } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRegionalOffices } from "@/context/RegionalOfficesContext";
import type { regionalOffices as initialRegionalOffices } from "@/lib/placeholder-data";

type OfficeItem = (typeof initialRegionalOffices)[0];

export default function AdminRegionalOfficesPage() {
  const [open, setOpen] = useState(false);
  const { regionalOffices, addRegionalOffice, updateRegionalOffice, deleteRegionalOffice } = useRegionalOffices();
  const [editingItem, setEditingItem] = useState<OfficeItem | null>(null);

  const form = useForm({
    defaultValues: {
      name: "",
      address: "",
      phone: "",
      email: "",
    }
  });

  useEffect(() => {
    if (editingItem) {
      form.reset({
        name: editingItem.name,
        address: editingItem.address,
        phone: editingItem.phone,
        email: editingItem.email,
      });
    } else {
      form.reset({
        name: "",
        address: "",
        phone: "",
        email: "",
      });
    }
  }, [editingItem, form, open]);

  const handleAddNew = () => {
    setEditingItem(null);
    setOpen(true);
  };

  const handleEdit = (item: OfficeItem) => {
    setEditingItem(item);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteRegionalOffice(id);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setEditingItem(null);
    }
  };

  const onSubmit = (data: any) => {
    if (editingItem) {
      updateRegionalOffice(editingItem.id, data);
    } else {
      const newOffice: OfficeItem = {
        id: `ro-${regionalOffices.length + 1}`,
        name: data.name,
        address: data.address,
        phone: data.phone,
        email: data.email,
      };
      addRegionalOffice(newOffice);
    }
    
    setOpen(false);
    setEditingItem(null);
  };

  return (
    <div className="flex flex-col gap-4">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="space-y-1">
                <h1 className="text-2xl font-semibold tracking-tight">Regional Offices</h1>
                <p className="text-sm text-muted-foreground">Manage contact details for all office locations.</p>
            </div>
            <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1" onClick={handleAddNew}>
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Office</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                <DialogTitle>{editingItem ? 'Edit Office' : 'Add New Office'}</DialogTitle>
                <DialogDescription>
                    {editingItem ? 'Update the contact details for this office.' : 'Fill in the details for the new regional office.'}
                </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                          <FormItem>
                          <FormLabel>Office Name</FormLabel>
                          <FormControl>
                              <Input placeholder="e.g., Regional Office, Karachi" {...field} />
                          </FormControl>
                          <FormMessage />
                          </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                          <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                              <Input placeholder="Full postal address" {...field} />
                          </FormControl>
                          <FormMessage />
                          </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                          <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                              <Input placeholder="(021) 99207121" {...field} />
                          </FormControl>
                          <FormMessage />
                          </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                          <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                              <Input type="email" placeholder="ro.khi@mohtasib.gov.pk" {...field} />
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
        </header>

        <Card>
            <CardContent className="pt-6">
                <Table>
                <TableHeader>
                    <TableRow>
                      <TableHead>Office Name</TableHead>
                      <TableHead className="hidden md:table-cell">Contact Details</TableHead>
                      <TableHead>
                          <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {regionalOffices.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell className="hidden md:table-cell">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Phone className="h-3 w-3" /> {item.phone}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                <Mail className="h-3 w-3" /> {item.email}
                            </div>
                        </TableCell>
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
