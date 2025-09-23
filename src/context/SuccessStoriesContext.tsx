

'use client';

import { createContext, useContext, ReactNode } from 'react';
import { successStories as initialSuccessStories } from '@/lib/placeholder-data';
import { useLocalStorage } from '@/hooks/use-local-storage';

export type StoryItem = (typeof initialSuccessStories)[0] & { imageUrl?: string };

type SuccessStoriesContextType = {
  successStories: StoryItem[];
  addSuccessStory: (item: StoryItem) => void;
  updateSuccessStory: (id: string, updatedItem: Partial<StoryItem>) => void;
  deleteSuccessStory: (id: string) => void;
};

const SuccessStoriesContext = createContext<SuccessStoriesContextType | undefined>(undefined);

export function SuccessStoriesProvider({ children }: { children: ReactNode }) {
  const [successStories, setSuccessStories] = useLocalStorage<StoryItem[]>('successStories', initialSuccessStories);

  const addSuccessStory = (item: StoryItem) => {
    setSuccessStories((prev: StoryItem[]) => [item, ...prev]);
  };

  const updateSuccessStory = (id: string, updatedItem: Partial<StoryItem>) => {
    setSuccessStories((prev: StoryItem[]) =>
      prev.map((item: StoryItem) => (item.id === id ? { ...item, ...updatedItem } : item))
    );
  };

  const deleteSuccessStory = (id: string) => {
    setSuccessStories((prev: StoryItem[]) => prev.filter((item: StoryItem) => item.id !== id));
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
