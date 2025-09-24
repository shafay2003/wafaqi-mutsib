
'use client';

import { createContext, useContext, ReactNode, useState, useEffect, useCallback, useMemo } from 'react';
import { mediaItems as initialMediaItems } from '@/lib/placeholder-data';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { mediaStorage } from '@/lib/indexed-db';
import { processMediaFile, ProcessedMedia } from '@/lib/media-processing';

export type MediaItem = {
  id: string;
  title: string;
  description: string;
  type: 'Photo' | 'Video';
  date: string;
  imageUrl?: string;
  thumbnailUrl?: string; // For video thumbnails and optimized image previews
  location?: string;
  isLoading?: boolean;
  loadError?: boolean;
  isPinned?: boolean;
};

interface MediaContextType {
  mediaItems: MediaItem[];
  addMediaItem: (item: MediaItem) => void;
  addMediaFromFile: (file: File, title: string, description: string, location?: string) => Promise<void>;
  updateMediaItem: (id: string, updatedItem: Partial<MediaItem>) => void;
  deleteMediaItem: (id: string) => void;
  refreshFromStorage: () => void;
}

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export function MediaProvider({ children }: { children: ReactNode }) {
  const [mediaItems, setMediaItemsRaw] = useLocalStorage<MediaItem[]>('mediaItems', initialMediaItems as MediaItem[]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  // Separate state for IndexedDB loaded videos (not persisted to localStorage)
  const [loadedVideos, setLoadedVideos] = useState<Map<string, string>>(new Map());
  // Separate state for thumbnails (not persisted to localStorage)
  const [loadedThumbnails, setLoadedThumbnails] = useState<Map<string, string>>(new Map());

  // Debug log for media items state
  console.log('📊 MediaProvider render - Current media items count:', mediaItems.length);
  console.log('📹 Loaded videos in memory:', loadedVideos.size);
  console.log('🖼️ Loaded thumbnails in memory:', loadedThumbnails.size);
  
  // Clean up old files from IndexedDB on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Clean files older than 7 days
      mediaStorage.cleanOldFiles(7 * 24 * 60 * 60 * 1000);
    }
  }, []);

  // Process media items to restore base64 images/videos from storage
  const processedMediaItems = mediaItems.map((item: MediaItem) => {
    let processedItem = { ...item };

    if (typeof window !== 'undefined') {
      // Handle main content (imageUrl)
      if (item.imageUrl) {
        // Handle localStorage stored files (cross-tab compatible)
        if (item.imageUrl.startsWith('local:')) {
          const fileId = item.imageUrl.replace('local:', '');
          try {
            const storageKey = `media-image-${fileId}`;
            const storedFile = window.localStorage.getItem(storageKey);
            if (storedFile && storedFile.startsWith('data:')) {
              processedItem.imageUrl = storedFile;
            } else {
              console.warn(`❌ No file found in localStorage for ${item.type}:`, item.title);
              processedItem.imageUrl = '';
              processedItem.loadError = true;
            }
          } catch (error) {
            console.warn('Could not retrieve file from localStorage:', error);
            processedItem.imageUrl = '';
            processedItem.loadError = true;
          }
        }
        // Handle IndexedDB stored files (large videos)
        else if (item.imageUrl.startsWith('indexeddb:')) {
          const fileId = item.imageUrl.replace('indexeddb:', '');
          
          // Check if we already have this video loaded in memory
          const loadedVideoData = loadedVideos.get(fileId);
          if (loadedVideoData) {
            console.log(`📹 Using cached video data for ${item.type}: ${item.title}`);
            processedItem.imageUrl = loadedVideoData;
            processedItem.isLoading = false;
          } else {
            // Try to load from IndexedDB asynchronously (only once)
            if (!loadedVideos.has(fileId)) {
              mediaStorage.getFile(fileId).then((storedFile) => {
                if (storedFile) {
                  console.log(`✅ Retrieved ${item.type} from IndexedDB:`, item.title);
                  // Store in separate state that doesn't trigger localStorage saves
                  setLoadedVideos((prev) => new Map(prev.set(fileId, storedFile)));
                }
              }).catch((error) => {
                console.error('❌ Error loading from IndexedDB:', error);
              });
            }
            
            // Return item with empty imageUrl while loading to prevent Next.js Image errors
            processedItem.imageUrl = '';
            processedItem.isLoading = true;
          }
        }
        // Handle direct data URLs (memory-only storage)
        else if (item.imageUrl.startsWith('data:')) {
          processedItem.imageUrl = item.imageUrl;
        }
      }

      // Handle thumbnails (thumbnailUrl)
      if (item.thumbnailUrl) {
        if (item.thumbnailUrl.startsWith('local:')) {
          const fileId = item.thumbnailUrl.replace('local:', '');
          try {
            const storageKey = `media-thumbnail-${fileId}`;
            const storedThumbnail = window.localStorage.getItem(storageKey);
            if (storedThumbnail && storedThumbnail.startsWith('data:')) {
              processedItem.thumbnailUrl = storedThumbnail;
            } else {
              // Clear thumbnailUrl if not found to prevent Next.js Image errors
              processedItem.thumbnailUrl = '';
            }
          } catch (error) {
            console.warn('Could not retrieve thumbnail from localStorage:', error);
            processedItem.thumbnailUrl = '';
          }
        } else if (item.thumbnailUrl.startsWith('indexeddb:')) {
          const fileId = item.thumbnailUrl.replace('indexeddb:', '');
          
          // Check if we already have this thumbnail loaded in memory
          const loadedThumbnailData = loadedThumbnails.get(fileId);
          if (loadedThumbnailData) {
            processedItem.thumbnailUrl = loadedThumbnailData;
          } else {
            // Try to load thumbnail from IndexedDB asynchronously
            if (!loadedThumbnails.has(fileId)) {
              mediaStorage.getFile(`${fileId}-thumbnail`).then((storedThumbnail) => {
                if (storedThumbnail) {
                  console.log(`🖼️ Retrieved thumbnail from IndexedDB:`, item.title);
                  setLoadedThumbnails((prev) => new Map(prev.set(fileId, storedThumbnail)));
                }
              }).catch((error) => {
                console.warn('Could not retrieve thumbnail from IndexedDB:', error);
              });
            }
            
            // IMPORTANT: Clear thumbnailUrl while loading to prevent Next.js Image errors
            processedItem.thumbnailUrl = '';
          }
        } else if (item.thumbnailUrl.startsWith('data:')) {
          processedItem.thumbnailUrl = item.thumbnailUrl;
        }
      }
    }

    // SAFETY CHECK: Ensure no invalid URL schemes are passed to Next.js Image
    if (processedItem.imageUrl && !processedItem.imageUrl.startsWith('data:') && !processedItem.imageUrl.startsWith('http://') && !processedItem.imageUrl.startsWith('https://') && !processedItem.imageUrl.startsWith('/')) {
      console.warn(`🚨 Invalid imageUrl detected and cleared: ${processedItem.imageUrl.substring(0, 50)}...`);
      processedItem.imageUrl = '';
      processedItem.loadError = true;
    }
    
    if (processedItem.thumbnailUrl && !processedItem.thumbnailUrl.startsWith('data:') && !processedItem.thumbnailUrl.startsWith('http://') && !processedItem.thumbnailUrl.startsWith('https://') && !processedItem.thumbnailUrl.startsWith('/')) {
      console.warn(`🚨 Invalid thumbnailUrl detected and cleared: ${processedItem.thumbnailUrl.substring(0, 50)}...`);
      processedItem.thumbnailUrl = '';
    }

    return processedItem;
  });

  // Create a stable reference for processed media items
  const processedMediaItemsMemo = useMemo(() => processedMediaItems, [mediaItems, refreshTrigger, loadedVideos, loadedThumbnails]);

  const setMediaItems = setMediaItemsRaw;

  // New function to handle file processing with thumbnails and optimization
  const addMediaFromFile = async (file: File, title: string, description: string, location?: string): Promise<void> => {
    const itemId = Date.now().toString();
    
    try {
      console.log(`🔄 Processing ${file.type.startsWith('video/') ? 'video' : 'image'} file:`, title);
      
      // Process the media file to get optimized content and thumbnail
      const processedMedia: ProcessedMedia = await processMediaFile(file);
      
      // Create media item
      const mediaItem: MediaItem = {
        id: itemId,
        title,
        description,
        type: processedMedia.type === 'video' ? 'Video' : 'Photo',
        date: new Date().toLocaleDateString(),
        location,
        isLoading: false,
        loadError: false
      };

      const fileSizeInMB = processedMedia.size / (1024 * 1024);
      console.log(`📊 Processed file size: ${fileSizeInMB.toFixed(2)}MB`);

      // Store main content and thumbnail
      try {
        // For large videos (>5MB), use IndexedDB for main content
        if (processedMedia.type === 'video' && fileSizeInMB > 5) {
          console.log(`🎬 Large video detected, using IndexedDB for main content`);
          
          // Store main video content in IndexedDB
          const videoStored = await mediaStorage.storeFile(itemId, processedMedia.dataUrl);
          if (videoStored) {
            mediaItem.imageUrl = `indexeddb:${itemId}`;
            console.log('✅ Large video successfully stored in IndexedDB');
          } else {
            console.warn('❌ Failed to store video in IndexedDB, using memory only');
            mediaItem.imageUrl = processedMedia.dataUrl;
          }

          // Store thumbnail in IndexedDB as well (smaller, but keeps consistency)
          if (processedMedia.thumbnail) {
            const thumbnailStored = await mediaStorage.storeFile(`${itemId}-thumbnail`, processedMedia.thumbnail);
            if (thumbnailStored) {
              mediaItem.thumbnailUrl = `indexeddb:${itemId}`;
              console.log('✅ Video thumbnail stored in IndexedDB');
            } else {
              mediaItem.thumbnailUrl = processedMedia.thumbnail;
            }
          }
        } else {
          // For smaller files, try localStorage first
          try {
            const imageKey = `media-image-${itemId}`;
            const thumbnailKey = `media-thumbnail-${itemId}`;
            
            // Store main content
            window.localStorage.setItem(imageKey, processedMedia.dataUrl);
            mediaItem.imageUrl = `local:${itemId}`;
            
            // Store thumbnail if available
            if (processedMedia.thumbnail) {
              window.localStorage.setItem(thumbnailKey, processedMedia.thumbnail);
              mediaItem.thumbnailUrl = `local:${itemId}`;
            }
            
            console.log(`📝 File and thumbnail stored in localStorage`);
          } catch (localError) {
            console.warn('localStorage failed, using memory only:', localError);
            mediaItem.imageUrl = processedMedia.dataUrl;
            mediaItem.thumbnailUrl = processedMedia.thumbnail;
          }
        }
      } catch (storageError) {
        console.error('Storage error:', storageError);
        // Fallback to memory storage
        mediaItem.imageUrl = processedMedia.dataUrl;
        mediaItem.thumbnailUrl = processedMedia.thumbnail;
      }

      // Add to media items list
      setMediaItems(prev => [mediaItem, ...prev]);
      console.log(`✅ Media item added successfully: ${title}`);
      
    } catch (error) {
      console.error('❌ Error processing media file:', error);
      throw error;
    }
  };

  const addMediaItem = (item: MediaItem) => {
    const itemWithId = { ...item, id: item.id || Date.now().toString() };
    const itemForStorage = { ...itemWithId };
    
    // Handle base64 images/videos - implement smart storage strategy
    if (itemForStorage.imageUrl && itemForStorage.imageUrl.startsWith('data:')) {
      try {
        const fileSizeInMB = (itemForStorage.imageUrl.length * 3) / (4 * 1024 * 1024);
        const isVideo = itemForStorage.type === 'Video' || itemForStorage.imageUrl.startsWith('data:video');
        
        try {
          const imageKey = `media-image-${item.id}`;
          
          // For large videos (>5MB), use IndexedDB
          if (isVideo && fileSizeInMB > 5) {
            console.log(`🎬 Large video detected (${fileSizeInMB.toFixed(2)}MB), using IndexedDB`);
            
            mediaStorage.storeFile(item.id, itemForStorage.imageUrl!).then((success) => {
              if (success) {
                console.log('✅ Large video successfully stored in IndexedDB');
              }
            }).catch((error) => {
              console.error('❌ IndexedDB storage error:', error);
            });
            
            itemForStorage.imageUrl = `indexeddb:${item.id}`;
          } else {
            // For smaller files, try localStorage first
            try {
              window.localStorage.setItem(imageKey, itemForStorage.imageUrl!);
              itemForStorage.imageUrl = `local:${item.id}`;
              console.log(`📝 Small file stored in localStorage`);
            } catch (localError) {
              console.warn('localStorage failed, using memory only:', localError);
              itemForStorage.imageUrl = item.imageUrl;
            }
          }
        } catch (error) {
          console.error('Storage error:', error);
          itemForStorage.imageUrl = item.imageUrl;
        }
      } catch (error) {
        console.error('Error processing media item:', error);
      }
    }
    
    setMediaItems((prev: MediaItem[]) => [itemForStorage, ...prev]);
  };

  const updateMediaItem = (id: string, updatedItem: Partial<MediaItem>) => {
    setMediaItems((prev: MediaItem[]) => {
      // Preserve any video data URLs that are currently loaded in memory
      const preservedVideoData = new Map<string, string>();
      prev.forEach(item => {
        if (item.type === 'Video' && item.imageUrl?.startsWith('data:')) {
          preservedVideoData.set(item.id, item.imageUrl);
          console.log(`📹 Preserving video data for ${item.title}`);
        }
      });
      
      return prev.map((item: MediaItem) => {
        if (item.id === id) {
          let updated = { ...item, ...updatedItem };
          
          // Handle base64 images/videos for updates with same logic as addMediaItem
          if (updatedItem.imageUrl && updatedItem.imageUrl.startsWith('data:')) {
            console.log('🔄 Updating media item with new file:', updated.title);
            const fileSizeInMB = (updatedItem.imageUrl.length * 3) / (4 * 1024 * 1024);
            const isVideo = updated.type === 'Video' || updatedItem.imageUrl.startsWith('data:video');
            console.log(`📊 Updated file size: ${fileSizeInMB.toFixed(2)}MB, Type: ${updated.type}`);
            
            try {
              const imageKey = `media-image-${id}`;
              console.log(`🔑 Update storage key for "${updated.title}" (${updated.type}): ${imageKey}`);
              
              // For large videos (>5MB), use IndexedDB storage like addMediaItem
              if (isVideo && fileSizeInMB > 5) {
                console.log(`🎬 Large video update detected (${fileSizeInMB.toFixed(2)}MB), using IndexedDB storage`);
                
                // Store video in IndexedDB first
                mediaStorage.storeFile(id, updatedItem.imageUrl).then((success) => {
                  if (success) {
                    console.log('✅ Updated large video successfully stored in IndexedDB');
                  } else {
                    console.warn('❌ IndexedDB failed for updated video, but using reference anyway');
                  }
                }).catch((error) => {
                  console.error('❌ IndexedDB storage error for update:', error);
                });
                
                // Use IndexedDB reference to prevent localStorage quota issues
                updated.imageUrl = `indexeddb:${id}`;
                console.log('🗄️ Using IndexedDB reference for updated video');
              } else {
                // For smaller files, try localStorage first
                try {
                  console.log(`🔄 Storing updated image for: ${updated.title}`);
                  
                  // Store the new image data
                  window.localStorage.setItem(`media-image-${id}`, updatedItem.imageUrl);
                  updated.imageUrl = `local:${id}`;
                  
                  console.log(`✅ Updated image stored in localStorage for: ${updated.title}`);
                } catch (localError) {
                  console.warn('localStorage failed for update, using memory only:', localError);
                  updated.imageUrl = updatedItem.imageUrl;
                  alert('Warning: Updated file stored in memory only. It will not persist after page refresh.');
                }
              }
            } catch (error) {
              console.error('Storage error during update:', error);
              updated.imageUrl = updatedItem.imageUrl;
            }
          }
          
          return updated;
        } else {
          // For non-updated items, restore preserved video data if needed
          if (item.type === 'Video' && preservedVideoData.has(item.id)) {
            const preservedUrl = preservedVideoData.get(item.id);
            if (item.imageUrl?.startsWith('indexeddb:') && preservedUrl) {
              console.log(`🔄 Restoring preserved video data for ${item.title}`);
              return { ...item, imageUrl: preservedUrl };
            }
          }
          return item;
        }
      });
    });
    
    // Force refresh after update
    setTimeout(() => {
      setRefreshTrigger(prev => prev + 1);
    }, 100);
  };

  const deleteMediaItem = (id: string) => {
    // Clean up stored images and thumbnails when deleting
    try {
      if (typeof window !== 'undefined') {
        // Clean up main content
        window.localStorage.removeItem(`media-image-${id}`);
        mediaStorage.deleteFile(id);
        
        // Clean up thumbnail
        window.localStorage.removeItem(`media-thumbnail-${id}`);
        mediaStorage.deleteFile(`${id}-thumbnail`);
      }
    } catch (error) {
      console.warn('Could not clean up stored files for deleted item');
    }
    
    // Also clean up from loaded videos and thumbnails cache
    setLoadedVideos((prev) => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
    
    setLoadedThumbnails((prev) => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
    
    setMediaItems((prev: MediaItem[]) => prev.filter((item: MediaItem) => item.id !== id));
  };

  const refreshFromStorage = useCallback(() => {
    try {
      if (typeof window !== 'undefined') {
        const stored = window.localStorage.getItem('mediaItems');
        if (stored) {
          const parsedItems = JSON.parse(stored);
          console.log('🔍 Refreshing from storage:', parsedItems.length, 'items');
          setMediaItems(parsedItems);
        }
      }
    } catch (error) {
      console.warn('❌ Failed to refresh media items from localStorage:', error);
    }
  }, [setMediaItems]);

  return (
    <MediaContext.Provider value={{ 
      mediaItems: processedMediaItemsMemo, 
      addMediaItem,
      addMediaFromFile, 
      updateMediaItem, 
      deleteMediaItem, 
      refreshFromStorage 
    }}>
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
