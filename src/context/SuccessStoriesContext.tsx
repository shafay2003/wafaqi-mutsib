'use client';

import { createContext, useState, useContext, ReactNode } from 'react';
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
