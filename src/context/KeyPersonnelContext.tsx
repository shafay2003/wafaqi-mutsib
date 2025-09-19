
'use client';

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { keyPersonnel as initialKeyPersonnel } from '@/lib/placeholder-data';

type Personnel = (typeof initialKeyPersonnel)[0];

type KeyPersonnelContextType = {
  keyPersonnel: Personnel[];
  addPersonnel: (item: Personnel) => void;
  updatePersonnel: (id: string, updatedItem: Partial<Personnel>) => void;
  deletePersonnel: (id: string) => void;
};

const KeyPersonnelContext = createContext<KeyPersonnelContextType | undefined>(undefined);

export function KeyPersonnelProvider({ children }: { children: ReactNode }) {
  const [keyPersonnel, setKeyPersonnel] = useState<Personnel[]>(initialKeyPersonnel);

  useEffect(() => {
    // Load from localStorage only on the client-side after initial render
    try {
      const storedItems = window.localStorage.getItem('keyPersonnel');
      if (storedItems) {
        setKeyPersonnel(JSON.parse(storedItems));
      }
    } catch (error) {
      console.error('Error reading from localStorage', error);
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem('keyPersonnel', JSON.stringify(keyPersonnel));
    } catch (error) {
      console.error('Error writing to localStorage', error);
    }
  }, [keyPersonnel]);

  const addPersonnel = (item: Personnel) => {
    setKeyPersonnel((prev) => [item, ...prev]);
  };

  const updatePersonnel = (id: string, updatedItem: Partial<Personnel>) => {
    setKeyPersonnel((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
    );
  };

  const deletePersonnel = (id: string) => {
    setKeyPersonnel((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <KeyPersonnelContext.Provider value={{ keyPersonnel, addPersonnel, updatePersonnel, deletePersonnel }}>
      {children}
    </KeyPersonnelContext.Provider>
  );
}

export function useKeyPersonnel() {
  const context = useContext(KeyPersonnelContext);
  if (context === undefined) {
    throw new Error('useKeyPersonnel must be used within a KeyPersonnelProvider');
  }
  return context;
}
