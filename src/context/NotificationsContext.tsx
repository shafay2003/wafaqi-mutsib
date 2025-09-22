
'use client';

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
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

  useEffect(() => {
    try {
      const storedItems = window.localStorage.getItem('notifications');
      if (storedItems) {
        setNotifications(JSON.parse(storedItems));
      }
    } catch (error) {
      console.error('Error reading from localStorage', error);
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem('notifications', JSON.stringify(notifications));
    } catch (error) {
      console.error('Error writing to localStorage', error);
    }
  }, [notifications]);

  const addNotification = (item: NotificationItem) => {
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
