
'use client';

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

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
  const [users, setUsers] = useState<User[]>(initialUsers);

  useEffect(() => {
    try {
      const storedItems = window.localStorage.getItem('users');
      if (storedItems) {
        setUsers(JSON.parse(storedItems));
      }
    } catch (error) {
      console.error('Error reading from localStorage', error);
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem('users', JSON.stringify(users));
    } catch (error) {
      console.error('Error writing to localStorage', error);
    }
  }, [users]);

  const addUser = (item: User) => {
    setUsers((prev) => [item, ...prev]);
  };

  const updateUser = (id: string, updatedItem: Partial<User>) => {
    setUsers((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
    );
  };

  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((item) => item.id !== id));
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
