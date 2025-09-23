'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function StorageDebug() {
  const [storageInfo, setStorageInfo] = useState<any>({});
  
  const updateStorageInfo = () => {
    try {
      const mediaItems = localStorage.getItem('mediaItems');
      const mediaItemsData = mediaItems ? JSON.parse(mediaItems) : [];
      
      const imageKeys = Object.keys(localStorage).filter(key => key.startsWith('media-image-'));
      
      // Calculate storage usage
      let totalSize = 0;
      let storageUsage = '';
      try {
        const storageString = JSON.stringify(localStorage);
        totalSize = storageString.length;
        const sizeInMB = totalSize / (1024 * 1024);
        storageUsage = `${sizeInMB.toFixed(2)} MB`;
      } catch (e) {
        storageUsage = 'Unknown';
      }
      
      setStorageInfo({
        mediaItemsCount: mediaItemsData.length,
        mediaItems: mediaItemsData,
        imageKeysCount: imageKeys.length,
        imageKeys: imageKeys.slice(0, 5), // Show first 5
        storageUsage,
        lastUpdated: new Date().toLocaleTimeString()
      });
    } catch (error) {
      setStorageInfo({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  };
  
  useEffect(() => {
    updateStorageInfo();
    
    // Update every 2 seconds
    const interval = setInterval(updateStorageInfo, 2000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Card className="w-full max-w-xs opacity-90 hover:opacity-100 transition-opacity">
      <CardHeader className="pb-2">
        <CardTitle className="text-xs">Storage Debug</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 text-xs pt-0">
        <div>
          <strong>Media Items:</strong> {storageInfo.mediaItemsCount || 0}
        </div>
        <div>
          <strong>Image Keys:</strong> {storageInfo.imageKeysCount || 0}
        </div>
        <div>
          <strong>Storage Used:</strong> {storageInfo.storageUsage || 'Unknown'}
        </div>
        <div>
          <strong>Last Updated:</strong> {storageInfo.lastUpdated}
        </div>
        {storageInfo.mediaItems && storageInfo.mediaItems.length > 0 && (
          <div>
            <strong>Latest Item:</strong> {storageInfo.mediaItems[0]?.title}
          </div>
        )}
        <div className="flex gap-1">
          <Button onClick={updateStorageInfo} size="sm" className="text-xs px-2 py-1 h-6">
            Refresh
          </Button>
          <Button 
            onClick={() => {
              localStorage.clear();
              sessionStorage.clear();
              window.location.reload();
            }} 
            size="sm" 
            variant="destructive" 
            className="text-xs px-2 py-1 h-6"
          >
            Clear
          </Button>
        </div>
        {storageInfo.error && (
          <div className="text-red-500">Error: {storageInfo.error}</div>
        )}
      </CardContent>
    </Card>
  );
}