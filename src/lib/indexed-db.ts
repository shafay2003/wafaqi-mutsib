// IndexedDB utility for storing large media files
export class MediaStorage {
  private dbName = 'wafaqi-media-storage';
  private version = 1;
  private storeName = 'media-files';

  private async openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: 'id' });
          store.createIndex('timestamp', 'timestamp', { unique: false });
        }
      };
    });
  }

  async storeFile(id: string, dataUrl: string): Promise<boolean> {
    try {
      const db = await this.openDB();
      const transaction = db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      
      const fileData = {
        id,
        dataUrl,
        timestamp: Date.now(),
        size: dataUrl.length
      };
      
      await new Promise((resolve, reject) => {
        const request = store.put(fileData);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
      
      console.log(`Successfully stored file in IndexedDB: ${id} (${(dataUrl.length / (1024 * 1024)).toFixed(2)}MB)`);
      return true;
    } catch (error) {
      console.error('Failed to store file in IndexedDB:', error);
      return false;
    }
  }

  async getFile(id: string): Promise<string | null> {
    try {
      const db = await this.openDB();
      const transaction = db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      
      const result = await new Promise<any>((resolve, reject) => {
        const request = store.get(id);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
      
      if (result) {
        console.log(`Retrieved file from IndexedDB: ${id} (${(result.dataUrl.length / (1024 * 1024)).toFixed(2)}MB)`);
        return result.dataUrl;
      }
      
      return null;
    } catch (error) {
      console.error('Failed to retrieve file from IndexedDB:', error);
      return null;
    }
  }

  async deleteFile(id: string): Promise<boolean> {
    try {
      const db = await this.openDB();
      const transaction = db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      
      await new Promise((resolve, reject) => {
        const request = store.delete(id);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
      
      console.log(`Deleted file from IndexedDB: ${id}`);
      return true;
    } catch (error) {
      console.error('Failed to delete file from IndexedDB:', error);
      return false;
    }
  }

  async cleanOldFiles(maxAgeMs: number = 7 * 24 * 60 * 60 * 1000): Promise<void> {
    try {
      const db = await this.openDB();
      const transaction = db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const index = store.index('timestamp');
      
      const cutoffTime = Date.now() - maxAgeMs;
      const range = IDBKeyRange.upperBound(cutoffTime);
      
      const request = index.openCursor(range);
      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest).result as IDBCursorWithValue;
        if (cursor) {
          cursor.delete();
          cursor.continue();
        }
      };
      
      console.log('Cleaned old files from IndexedDB');
    } catch (error) {
      console.error('Failed to clean old files from IndexedDB:', error);
    }
  }

  async getStorageInfo(): Promise<{ used: number; available: number; percentage: number; files: any[] }> {
    try {
      // Get overall storage usage
      let used = 0;
      let available = 0;
      if ('storage' in navigator && 'estimate' in navigator.storage) {
        const estimate = await navigator.storage.estimate();
        used = estimate.usage || 0;
        available = estimate.quota || 0;
      }
      
      // Get IndexedDB files info
      const files = await this.getAllFiles();
      
      return {
        used,
        available,
        percentage: available > 0 ? (used / available) * 100 : 0,
        files
      };
    } catch (error) {
      console.error('Could not get storage info:', error);
      return { used: 0, available: 0, percentage: 0, files: [] };
    }
  }

  async getAllFiles(): Promise<any[]> {
    try {
      const db = await this.openDB();
      const transaction = db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      
      const result = await new Promise<any[]>((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
      });
      
      return result.map(file => ({
        id: file.id,
        size: file.size,
        sizeMB: (file.size / (1024 * 1024)).toFixed(2),
        timestamp: file.timestamp,
        age: Date.now() - file.timestamp
      }));
    } catch (error) {
      console.error('Failed to get all files from IndexedDB:', error);
      return [];
    }
  }
}

// Singleton instance
export const mediaStorage = new MediaStorage();