
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
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const initialUsers = [
    { id: 'user-1', name: 'Admin User', email: 'admin@example.com', role: 'Administrator' },
    { id: 'user-2', name: 'Content Manager', email: 'manager@example.com', role: 'Editor' },
];

type UserItem = typeof initialUsers[0];
const roles = ['Administrator', 'Editor', 'Viewer'];

export default function AdminUsersPage() {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState(initialUsers);
  const [editingItem, setEditingItem] = useState<UserItem | null>(null);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      role: roles[1],
    },
  });

  useEffect(() => {
    if (editingItem) {
      form.reset({
        name: editingItem.name,
        email: editingItem.email,
        role: editingItem.role
      });
    } else {
      form.reset({
        name: "",
        email: "",
        role: roles[1],
      });
    }
  }, [editingItem, form, open]);

  const handleAddNew = () => {
    setEditingItem(null);
    setOpen(true);
  };

  const handleEdit = (item: UserItem) => {
    setEditingItem(item);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    setUsers(users.filter(item => item.id !== id));
  };
  
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setEditingItem(null);
    }
  };


  const onSubmit = (data: any) => {
    if (editingItem) {
        const updatedList = users.map(user => user.id === editingItem.id ? { ...user, ...data } : user);
        setUsers(updatedList);
    } else {
        const newUser = {
        id: `user-${users.length + 1}`,
        name: data.name,
        email: data.email,
        role: data.role,
        };
        setUsers([newUser, ...users]);
    }
    
    setOpen(false);
    setEditingItem(null);
  };

  return (
    <Card>
      <CardHeader>
         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage administrators and their roles.</CardDescription>
            </div>
            <Dialog open={open} onOpenChange={handleOpenChange}>
              <DialogTrigger asChild>
                <Button size="sm" className="h-7 gap-1 mt-4 sm:mt-0" onClick={handleAddNew}>
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add User</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{editingItem ? 'Edit User' : 'Add User'}</DialogTitle>
                  <DialogDescription>
                    {editingItem ? 'Update the details for this administrative user.' : 'Fill in the details to create a new administrative user.'}
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., John Doe" {...field} />
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
                            <Input type="email" placeholder="user@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a role" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {roles.map((role) => (
                                <SelectItem key={role} value={role}>{role}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <Button type="submit">{editingItem ? 'Save' : 'Create User'}</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                          <AvatarImage src={`/avatars/${user.name.slice(0, 1)}.png`} alt="Avatar" />
                          <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-0.5">
                          <p className="font-medium leading-none">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={user.role === 'Administrator' ? 'default' : 'secondary'}>
                    {user.role}
                  </Badge>
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
                      <DropdownMenuItem onClick={() => handleEdit(user)}>Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(user.id)}>Delete</DropdownMenuItem>
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
