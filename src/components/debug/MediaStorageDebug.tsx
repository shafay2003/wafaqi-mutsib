// Debug component to monitor media storage state
'use client';

import { useMedia } from '@/context/MediaContext';
import { useEffect, useState } from 'react';

export function MediaStorageDebug() {
  const { mediaItems } = useMedia();
  const [storageInfo, setStorageInfo] = useState<any>({});

  useEffect(() => {
    const checkStorageInfo = () => {
      if (typeof window !== 'undefined') {
        const localStorageItems = window.localStorage.getItem('mediaItems');
        const parsedItems = localStorageItems ? JSON.parse(localStorageItems) : [];
        
        const videoItems = mediaItems.filter(item => item.type === 'Video');
        const dataVideoItems = videoItems.filter(item => item.imageUrl?.startsWith('data:'));
        
        const info = {
          totalItems: mediaItems.length,
          totalVideos: videoItems.length,
          storageTypes: {
            data: mediaItems.filter(item => item.imageUrl?.startsWith('data:')).length,
            local: mediaItems.filter(item => item.imageUrl?.startsWith('local:')).length,
            session: mediaItems.filter(item => item.imageUrl?.startsWith('session:')).length,
            indexeddb: mediaItems.filter(item => item.imageUrl?.startsWith('indexeddb:')).length,
            loading: mediaItems.filter(item => item.isLoading).length,
            error: mediaItems.filter(item => item.loadError).length,
            empty: mediaItems.filter(item => !item.imageUrl).length,
          },
          localStorageItems: parsedItems.length,
          indexedDBRefsInStorage: parsedItems.filter((item: any) => item.imageUrl?.startsWith('indexeddb:')).length,
          videoSizes: dataVideoItems.map(item => ({
            title: item.title,
            size: item.imageUrl ? Math.round(item.imageUrl.length / (1024 * 1024)) + 'MB' : 'N/A'
          }))
        };
        
        setStorageInfo(info);
      }
    };

    checkStorageInfo();
    const interval = setInterval(checkStorageInfo, 2000); // Check every 2 seconds

    return () => clearInterval(interval);
  }, [mediaItems]);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs font-mono z-50 max-w-xs">
      <div className="font-bold mb-2">📊 Media Storage Debug</div>
      <div>Total Items: {storageInfo.totalItems}</div>
      <div>Videos: {storageInfo.totalVideos}</div>
      <div className="mt-2">Storage Types:</div>
      <div className="ml-2">
        <div>• Data URLs: {storageInfo.storageTypes?.data || 0}</div>
        <div>• Local: {storageInfo.storageTypes?.local || 0}</div>
        <div>• Session: {storageInfo.storageTypes?.session || 0}</div>
        <div>• IndexedDB: {storageInfo.storageTypes?.indexeddb || 0}</div>
        <div>• Loading: {storageInfo.storageTypes?.loading || 0}</div>
        <div>• Error: {storageInfo.storageTypes?.error || 0}</div>
      </div>
      <div className="mt-2">
        <div>localStorage Items: {storageInfo.localStorageItems}</div>
        <div>IndexedDB Refs Saved: {storageInfo.indexedDBRefsInStorage}</div>
        <div>Empty URLs: {storageInfo.storageTypes?.empty || 0}</div>
      </div>
      {storageInfo.videoSizes?.length > 0 && (
        <div className="mt-2 text-xs">
          <div>Video Sizes:</div>
          {storageInfo.videoSizes.slice(0, 3).map((video: any, idx: number) => (
            <div key={idx} className="ml-2">• {video.title}: {video.size}</div>
          ))}
        </div>
      )}
    </div>
  );
}