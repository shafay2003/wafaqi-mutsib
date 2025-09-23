
'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';

export type User = {
    id: string;
    name: string;
    email: string;
    role: 'Administrator' | 'Editor' | 'Viewer';
};

const initialUsers: User[] = [
    { id: 'user-1', name: 'Admin User', email: 'admin@example.com', role: 'Administrator' },
    { id: 'user-2', name: 'Content Manager', email: 'manager@example.com', role: 'Editor' },
];


type UsersContextType = {
  users: User[];
  addUser: (item: User) => void;
  updateUser: (id: string, updatedItem: Partial<User>) => void;
  deleteUser: (id: string) => void;
};

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export function UsersProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useLocalStorage<User[]>('users', initialUsers);

  const addUser = (item: User) => {
    setUsers((prev: User[]) => [item, ...prev]);
  };

  const updateUser = (id: string, updatedItem: Partial<User>) => {
    setUsers((prev: User[]) =>
      prev.map((item: User) => (item.id === id ? { ...item, ...updatedItem } : item))
    );
  };

  const deleteUser = (id: string) => {
    setUsers((prev: User[]) => prev.filter((item: User) => item.id !== id));
  };

  return (
    <UsersContext.Provider value={{ users, addUser, updateUser, deleteUser }}>
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error('useUsers must be used within a UsersProvider');
  }
  return context;
}
