
'use client';

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { faqs as initialFaqs } from '@/lib/placeholder-data';

type FaqItem = (typeof initialFaqs)[0];

type FaqContextType = {
  faqs: FaqItem[];
  addFaq: (item: FaqItem) => void;
  updateFaq: (id: string, updatedItem: Partial<FaqItem>) => void;
  deleteFaq: (id: string) => void;
};

const FaqContext = createContext<FaqContextType | undefined>(undefined);

export function FaqProvider({ children }: { children: ReactNode }) {
  const [faqs, setFaqs] = useState<FaqItem[]>(initialFaqs);

    useEffect(() => {
    try {
      const storedItems = window.localStorage.getItem('faqs');
      if (storedItems) {
        setFaqs(JSON.parse(storedItems));
      }
    } catch (error) {
      console.error('Error reading from localStorage', error);
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem('faqs', JSON.stringify(faqs));
    } catch (error) {
      console.error('Error writing to localStorage', error);
    }
  }, [faqs]);

  const addFaq = (item: FaqItem) => {
    setFaqs((prev) => [item, ...prev]);
  };

  const updateFaq = (id: string, updatedItem: Partial<FaqItem>) => {
    setFaqs((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
    );
  };

  const deleteFaq = (id: string) => {
    setFaqs((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <FaqContext.Provider value={{ faqs, addFaq, updateFaq, deleteFaq }}>
      {children}
    </FaqContext.Provider>
  );
}

export function useFaqs() {
  const context = useContext(FaqContext);
  if (context === undefined) {
    throw new Error('useFaqs must be used within a FaqProvider');
  }
  return context;
}
