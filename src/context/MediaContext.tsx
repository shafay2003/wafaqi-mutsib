'use client';

import { createContext, useState, useContext, ReactNode } from 'react';
import { mediaItems as initialMediaItems } from '@/lib/placeholder-data';

type MediaItem = typeof initialMediaItems[0];

type MediaContextType = {
  mediaItems: MediaItem[];
  addMediaItem: (item: MediaItem) => void;
  updateMediaItem: (id: string, updatedItem: Partial<MediaItem>) => void;
  deleteMediaItem: (id: string) => void;
};

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export function MediaProvider({ children }: { children: ReactNode }) {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(initialMediaItems);

  const addMediaItem = (item: MediaItem) => {
    setMediaItems((prev) => [item, ...prev]);
  };

  const updateMediaItem = (id: string, updatedItem: Partial<MediaItem>) => {
    setMediaItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
    );
  };

  const deleteMediaItem = (id: string) => {
    setMediaItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <MediaContext.Provider value={{ mediaItems, addMediaItem, updateMediaItem, deleteMediaItem }}>
      {children}
    </MediaContext.Provider>
  );
}

export function useMedia() {
  const context = useContext(MediaContext);
  if (context === undefined) {
    throw new Error('useMedia must be used within a MediaProvider');
  }
  return context;
}
