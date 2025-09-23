// Utility functions for managing browser storage

export function clearOldStorageData() {
  try {
    // Clear old base64 images from sessionStorage that might be taking up space
    const keysToRemove: string[] = [];
    
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key && key.startsWith('media-image-')) {
        keysToRemove.push(key);
      }
    }
    
    // Remove old media images (keep only the most recent 10)
    if (keysToRemove.length > 10) {
      keysToRemove.slice(10).forEach(key => {
        sessionStorage.removeItem(key);
      });
    }
  } catch (error) {
    console.warn('Error clearing old storage data:', error);
  }
}

export function getStorageInfo() {
  try {
    const localStorageSize = JSON.stringify(localStorage).length;
    const sessionStorageSize = JSON.stringify(sessionStorage).length;
    
    return {
      localStorage: `${(localStorageSize / 1024 / 1024).toFixed(2)} MB`,
      sessionStorage: `${(sessionStorageSize / 1024 / 1024).toFixed(2)} MB`,
      total: `${((localStorageSize + sessionStorageSize) / 1024 / 1024).toFixed(2)} MB`
    };
  } catch (error) {
    return { localStorage: 'Unknown', sessionStorage: 'Unknown', total: 'Unknown' };
  }
}