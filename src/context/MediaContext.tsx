
'use client';

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { mediaItems as initialMediaItems } from '@/lib/placeholder-data';

export type MediaItem = {
  id: string;
  title: string;
  description: string;
  type: string;
  date: string;
  imageUrl?: string;
};

type MediaContextType = {
  mediaItems: MediaItem[];
  addMediaItem: (item: MediaItem) => void;
  updateMediaItem: (id: string, updatedItem: Partial<MediaItem>) => void;
  deleteMediaItem: (id: string) => void;
};

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export function MediaProvider({ children }: { children: ReactNode }) {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(initialMediaItems);

  useEffect(() => {
    try {
      const storedItems = window.localStorage.getItem('mediaItems');
      if (storedItems) {
        setMediaItems(JSON.parse(storedItems));
      }
    } catch (error) {
      console.error('Error reading from localStorage', error);
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem('mediaItems', JSON.stringify(mediaItems));
    } catch (error) {
      console.error('Error writing to localStorage', error);
    }
  }, [mediaItems]);


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
