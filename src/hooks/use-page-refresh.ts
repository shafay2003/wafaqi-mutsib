'use client';

import React, { useEffect, useState } from 'react';

// Custom hook to refresh data when page becomes visible
export function usePageRefresh() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const handleFocus = () => {
      setRefreshTrigger(prev => prev + 1);
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setRefreshTrigger(prev => prev + 1);
      }
    };

    // Refresh when window gains focus or page becomes visible
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return refreshTrigger;
}

// Force refresh of localStorage data
export function forceRefreshLocalStorage(key: string) {
  if (typeof window !== 'undefined') {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        // Trigger a storage event manually
        window.dispatchEvent(new StorageEvent('storage', {
          key,
          newValue: item,
          oldValue: item,
          url: window.location.href
        }));
      }
    } catch (error) {
      console.warn('Could not force refresh localStorage:', error);
    }
  }
}