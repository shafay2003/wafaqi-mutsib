'use client';

import { createContext, useState, useContext, ReactNode } from 'react';
import { notifications as initialNotifications } from '@/lib/placeholder-data';

type NotificationItem = typeof initialNotifications[0];

type NotificationsContextType = {
  notifications: NotificationItem[];
  addNotification: (item: NotificationItem) => void;
  updateNotification: (id: string, updatedItem: Partial<NotificationItem>) => void;
  deleteNotification: (id: string) => void;
};

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  const addNotification = (item: NotificationItem) => {
    // Ensure new items have a URL property
    const newItem = { ...item, url: item.url || '#' };
    setNotifications((prev) => [newItem, ...prev]);
  };

  const updateNotification = (id: string, updatedItem: Partial<NotificationItem>) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <NotificationsContext.Provider value={{ notifications, addNotification, updateNotification, deleteNotification }}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
}
