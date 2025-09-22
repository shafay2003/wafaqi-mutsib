
'use client';

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { successStories as initialSuccessStories } from '@/lib/placeholder-data';

type StoryItem = typeof initialSuccessStories[0];

type SuccessStoriesContextType = {
  successStories: StoryItem[];
  addSuccessStory: (item: StoryItem) => void;
  updateSuccessStory: (id: string, updatedItem: Partial<StoryItem>) => void;
  deleteSuccessStory: (id: string) => void;
};

const SuccessStoriesContext = createContext<SuccessStoriesContextType | undefined>(undefined);

export function SuccessStoriesProvider({ children }: { children: ReactNode }) {
  const [successStories, setSuccessStories] = useState<StoryItem[]>(initialSuccessStories);

  useEffect(() => {
    try {
      const storedItems = window.localStorage.getItem('successStories');
      if (storedItems) {
        setSuccessStories(JSON.parse(storedItems));
      }
    } catch (error) {
      console.error('Error reading from localStorage', error);
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem('successStories', JSON.stringify(successStories));
    } catch (error) {
      console.error('Error writing to localStorage', error);
    }
  }, [successStories]);


  const addSuccessStory = (item: StoryItem) => {
    setSuccessStories((prev) => [item, ...prev]);
  };

  const updateSuccessStory = (id: string, updatedItem: Partial<StoryItem>) => {
    setSuccessStories((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
    );
  };

  const deleteSuccessStory = (id: string) => {
    setSuccessStories((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <SuccessStoriesContext.Provider value={{ successStories, addSuccessStory, updateSuccessStory, deleteSuccessStory }}>
      {children}
    </SuccessStoriesContext.Provider>
  );
}

export function useSuccessStories() {
  const context = useContext(SuccessStoriesContext);
  if (context === undefined) {
    throw new Error('useSuccessStories must be used within a SuccessStoriesProvider');
  }
  return context;
}
