'use client';

import React, { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
    }

    // Listen for storage changes from other tabs/windows
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          const newValue = JSON.parse(e.newValue);
          setStoredValue(newValue);
        } catch (error) {
          console.error(`Error parsing storage change for ${key}:`, error);
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }
    
    return () => {};
  }, [key]);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      if (isClient) {
        const jsonString = JSON.stringify(valueToStore);
        
        // Check size before attempting to store
        const sizeInMB = jsonString.length / (1024 * 1024);
        console.log(`Attempting to store ${key}: ${sizeInMB.toFixed(2)}MB`);
        
        // Handle large data with different strategies
        if (sizeInMB > 2) { // 2MB threshold for cleanup
          console.warn(`Large data (${sizeInMB.toFixed(2)}MB) for ${key}. Implementing storage management...`);
          
          // Smart cleanup to make space - only clear temporary/test items initially
          const keys = Object.keys(localStorage);
          let clearedCount = 0;
          keys.forEach(storageKey => {
            if (storageKey.includes('temp') || 
                storageKey.includes('cache') || 
                storageKey.includes('storage-test')) {
              localStorage.removeItem(storageKey);
              clearedCount++;
            }
          });
          console.log(`Initial cleanup: cleared ${clearedCount} temporary items`);
          
          // For mediaItems, implement smart limiting
          if (key === 'mediaItems' && Array.isArray(valueToStore)) {
            // Smart handling for different media types
            const items = valueToStore as any[];
            const videos = items.filter(item => item.type === 'Video');
            const photos = items.filter(item => item.type !== 'Video');
            
            // Convert photos with data URLs to storage references to reduce size
            const processedPhotos = photos.map(photo => {
              if (photo.imageUrl?.startsWith('data:')) {
                // Check if this photo is already stored individually
                const storageKey = `media-image-${photo.id}`;
                try {
                  const storedData = window.localStorage.getItem(storageKey) || window.sessionStorage.getItem(storageKey);
                  if (storedData) {
                    const useLocal = window.localStorage.getItem(storageKey) !== null;
                    console.log(`Converting photo "${photo.title}" to ${useLocal ? 'local' : 'session'} reference`);
                    return {
                      ...photo,
                      imageUrl: useLocal ? `local:${photo.id}` : `session:${photo.id}`
                    };
                  }
                } catch (e) {
                  console.warn(`Could not check storage for photo: ${photo.title}`);
                }
              }
              return photo;
            });
            
            // Keep recent items, prioritizing videos and photos with storage references
            const limitedVideos = videos.slice(0, 4); // Keep more videos now that photos are smaller
            const limitedPhotos = processedPhotos.slice(0, 20); // More photos since they're mostly references
            const limitedItems = [...limitedVideos, ...limitedPhotos].sort((a, b) => 
              new Date(b.date).getTime() - new Date(a.date).getTime()
            );
            
            const limitedJson = JSON.stringify(limitedItems);
            const limitedSizeMB = limitedJson.length / (1024 * 1024);
            console.log(`Smart limited mediaItems: ${limitedVideos.length} videos, ${limitedPhotos.length} photos (~${limitedSizeMB.toFixed(2)}MB)`);
            
            try {
              window.localStorage.setItem(key, limitedJson);
              console.log(`Successfully stored smart limited ${key}`);
              return;
            } catch (limitError) {
              console.warn('Even smart limited data failed, using emergency storage');
              // Emergency: convert ALL photos to references, only keep video data URLs
              const emergencyItems = limitedItems.map(item => {
                if (item.type !== 'Video' && item.imageUrl?.startsWith('data:')) {
                  // For photos, try to preserve storage reference if available
                  const storageKey = `media-image-${item.id}`;
                  try {
                    const storedData = window.localStorage.getItem(storageKey) || window.sessionStorage.getItem(storageKey);
                    if (storedData) {
                      const useLocal = window.localStorage.getItem(storageKey) !== null;
                      return { ...item, imageUrl: useLocal ? `local:${item.id}` : `session:${item.id}` };
                    }
                  } catch (e) {
                    console.warn(`Emergency: could not preserve photo ${item.title}`);
                  }
                  // If no storage reference, remove data URL but keep metadata
                  return { ...item, imageUrl: undefined };
                }
                return item; // Keep videos as-is
              });
              const emergencyJson = JSON.stringify(emergencyItems);
              window.localStorage.setItem(key, emergencyJson);
              console.log('Emergency: stored metadata with video data preserved');
              return;
            }
          }
        }
        
        // Try normal storage
        window.localStorage.setItem(key, jsonString);
        console.log(`Successfully stored ${key}`);
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        console.warn(`QUOTA EXCEEDED for ${key}. Implementing safe storage fallback...`);
        
        try {
          // Smart cleanup - only clear old/unused media images, preserve recent ones
          const keys = Object.keys(localStorage);
          let clearedCount = 0;
          
          // Get current media items to know which images are still needed
          let currentMediaIds: string[] = [];
          try {
            const currentItems = JSON.parse(localStorage.getItem('mediaItems') || '[]');
            currentMediaIds = currentItems.map((item: any) => item.id);
          } catch (e) {
            console.warn('Could not parse current media items for cleanup');
          }
          
          keys.forEach(storageKey => {
            if (storageKey.startsWith('media-image-')) {
              const itemId = storageKey.replace('media-image-', '');
              // Only clear images that are not in current media items
              if (!currentMediaIds.includes(itemId)) {
                localStorage.removeItem(storageKey);
                clearedCount++;
              }
            }
            // Clear other temporary/cache items
            else if (storageKey.includes('temp') || storageKey.includes('cache') || storageKey.includes('storage-test')) {
              localStorage.removeItem(storageKey);
              clearedCount++;
            }
          });
          console.log(`Smart cleanup: cleared ${clearedCount} unused storage items, preserved active media`);
          
          // If it's mediaItems, store metadata only (without large files)
          if (key === 'mediaItems') {
            const valueToStore = value instanceof Function ? value(initialValue) : value;
            if (Array.isArray(valueToStore)) {
              // Create metadata-only version but preserve storage references
              const metadataItems = valueToStore.map(item => {
                // Don't remove data URLs entirely, convert them to storage references if they exist
                if (item.imageUrl?.startsWith('data:')) {
                  if (item.type === 'Video') {
                    // Keep video data URLs (they're in IndexedDB)
                    return item;
                  } else {
                    // For photos, check if we have a storage reference instead
                    const storageKey = `media-image-${item.id}`;
                    try {
                      const storedData = window.localStorage.getItem(storageKey) || window.sessionStorage.getItem(storageKey);
                      if (storedData) {
                        // We have the actual data stored, use local/session reference
                        const useLocal = window.localStorage.getItem(storageKey) !== null;
                        return {
                          ...item,
                          imageUrl: useLocal ? `local:${item.id}` : `session:${item.id}`
                        };
                      }
                    } catch (e) {
                      console.warn(`Could not check storage for ${item.title}`);
                    }
                    // If no storage reference available, keep the data URL
                    return item;
                  }
                }
                // Keep existing storage references
                return item;
              });
              const metadataJson = JSON.stringify(metadataItems);
              
              try {
                window.localStorage.setItem(key, metadataJson);
                console.log(`Stored metadata for ${metadataItems.length} items (preserving storage references)`);
                return;
              } catch (metadataError) {
                console.warn('Even metadata storage failed, keeping in memory only');
                return;
              }
            }
          }
          
          console.warn(`Quota exceeded for ${key}. Data kept in memory only.`);
        } catch (cleanupError) {
          console.error(`Cleanup failed:`, cleanupError);
        }
      } else {
        console.error(`Error writing ${key} to localStorage:`, error);
      }
    }
  };

  return [storedValue, setValue, isClient] as const;
}