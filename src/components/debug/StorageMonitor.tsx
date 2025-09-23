'use client';

import { useState, useEffect } from 'react';
import { mediaStorage } from '@/lib/indexed-db';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2, RefreshCw, Database, HardDrive } from 'lucide-react';

interface StorageInfo {
  used: number;
  available: number;
  percentage: number;
  files: Array<{
    id: string;
    size: number;
    sizeMB: string;
    timestamp: number;
    age: number;
  }>;
}

export function StorageMonitor() {
  const [storageInfo, setStorageInfo] = useState<StorageInfo | null>(null);
  const [loading, setLoading] = useState(false);

  const loadStorageInfo = async () => {
    setLoading(true);
    try {
      const info = await mediaStorage.getStorageInfo();
      setStorageInfo(info);
    } catch (error) {
      console.error('Failed to load storage info:', error);
    } finally {
      setLoading(false);
    }
  };

  const cleanOldFiles = async () => {
    if (confirm('Clean files older than 7 days?')) {
      try {
        await mediaStorage.cleanOldFiles();
        await loadStorageInfo();
        alert('Old files cleaned successfully!');
      } catch (error) {
        console.error('Failed to clean old files:', error);
        alert('Failed to clean old files');
      }
    }
  };

  const deleteFile = async (fileId: string) => {
    if (confirm(`Delete file ${fileId}?`)) {
      try {
        await mediaStorage.deleteFile(fileId);
        await loadStorageInfo();
        alert('File deleted successfully!');
      } catch (error) {
        console.error('Failed to delete file:', error);
        alert('Failed to delete file');
      }
    }
  };

  useEffect(() => {
    loadStorageInfo();
  }, []);

  if (!storageInfo) {
    return (
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Storage Monitor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Loading storage information...</p>
        </CardContent>
      </Card>
    );
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStorageColor = (percentage: number) => {
    if (percentage > 90) return 'destructive';
    if (percentage > 70) return 'secondary';
    return 'default';
  };

  const totalVideoSize = storageInfo.files.reduce((sum, file) => sum + file.size, 0);

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Storage Monitor
          <Button
            variant="outline"
            size="sm"
            onClick={loadStorageInfo}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Storage Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <HardDrive className="h-4 w-4" />
            <div>
              <p className="text-sm font-medium">Browser Storage</p>
              <p className="text-xs text-muted-foreground">
                {formatBytes(storageInfo.used)} / {formatBytes(storageInfo.available)}
              </p>
            </div>
            <Badge variant={getStorageColor(storageInfo.percentage)}>
              {storageInfo.percentage.toFixed(1)}%
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <div>
              <p className="text-sm font-medium">Video Files</p>
              <p className="text-xs text-muted-foreground">
                {storageInfo.files.length} files ({formatBytes(totalVideoSize)})
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={cleanOldFiles}
              className="flex items-center gap-1"
            >
              <Trash2 className="h-3 w-3" />
              Clean Old
            </Button>
          </div>
        </div>

        {/* Storage Warnings */}
        {storageInfo.percentage > 80 && (
          <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
            <p className="text-sm font-medium text-yellow-800">
              ⚠️ Storage Warning: {storageInfo.percentage.toFixed(1)}% Full
            </p>
            <p className="text-xs text-yellow-600 mt-1">
              Consider deleting old videos to free up space. Multiple 97MB videos can quickly fill storage.
            </p>
          </div>
        )}

        {/* Files List */}
        {storageInfo.files.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">IndexedDB Files ({storageInfo.files.length})</h4>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {storageInfo.files
                .sort((a, b) => b.timestamp - a.timestamp)
                .map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-2 border rounded-lg text-sm"
                  >
                    <div className="flex-1">
                      <p className="font-mono text-xs">{file.id}</p>
                      <p className="text-xs text-muted-foreground">
                        {file.sizeMB}MB • {new Date(file.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{file.sizeMB}MB</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteFile(file.id)}
                        className="h-6 w-6 p-0"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Multiple Large Files Warning */}
        {storageInfo.files.filter(f => parseFloat(f.sizeMB) > 50).length > 2 && (
          <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
            <p className="text-sm font-medium text-blue-800">
              📊 Multiple Large Files Detected
            </p>
            <p className="text-xs text-blue-600 mt-1">
              You have {storageInfo.files.filter(f => parseFloat(f.sizeMB) > 50).length} files over 50MB. 
              This is fine, but monitor storage usage to prevent quota issues.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}