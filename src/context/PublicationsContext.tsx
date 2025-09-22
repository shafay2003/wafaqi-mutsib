

'use client';

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { publications as initialPublications } from '@/lib/placeholder-data';

export type PublicationItem = (typeof initialPublications)[0];

type PublicationsContextType = {
  publications: PublicationItem[];
  addPublication: (item: PublicationItem) => void;
  updatePublication: (id: string, updatedItem: Partial<PublicationItem>) => void;
  deletePublication: (id: string) => void;
};

const PublicationsContext = createContext<PublicationsContextType | undefined>(undefined);

export function PublicationsProvider({ children }: { children: ReactNode }) {
  const [publications, setPublications] = useState<PublicationItem[]>(initialPublications);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedItems = window.localStorage.getItem('publications');
      if (storedItems) {
        setPublications(JSON.parse(storedItems));
      }
    } catch (error) {
      console.error('Error reading from localStorage', error);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        window.localStorage.setItem('publications', JSON.stringify(publications));
      } catch (error) {
        console.error('Error writing to localStorage', error);
      }
    }
  }, [publications, isLoaded]);


  const addPublication = (item: PublicationItem) => {
    setPublications((prev) => [item, ...prev]);
  };

  const updatePublication = (id: string, updatedItem: Partial<PublicationItem>) => {
    setPublications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
    );
  };

  const deletePublication = (id: string) => {
    setPublications((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <PublicationsContext.Provider value={{ publications, addPublication, updatePublication, deletePublication }}>
      {children}
    </PublicationsContext.Provider>
  );
}

export function usePublications() {
  const context = useContext(PublicationsContext);
  if (context === undefined) {
    throw new Error('usePublications must be used within a PublicationsProvider');
  }
  return context;
}
