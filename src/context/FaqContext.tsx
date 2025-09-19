'use client';

import { createContext, useState, useContext, ReactNode } from 'react';
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
