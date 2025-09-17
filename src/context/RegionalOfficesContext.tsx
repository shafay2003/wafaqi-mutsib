'use client';

import { createContext, useState, useContext, ReactNode } from 'react';
import { regionalOffices as initialRegionalOffices } from '@/lib/placeholder-data';

type OfficeItem = typeof initialRegionalOffices[0];

type RegionalOfficesContextType = {
  regionalOffices: OfficeItem[];
  addRegionalOffice: (item: OfficeItem) => void;
  updateRegionalOffice: (id: string, updatedItem: Partial<OfficeItem>) => void;
  deleteRegionalOffice: (id: string) => void;
};

const RegionalOfficesContext = createContext<RegionalOfficesContextType | undefined>(undefined);

export function RegionalOfficesProvider({ children }: { children: ReactNode }) {
  const [regionalOffices, setRegionalOffices] = useState<OfficeItem[]>(initialRegionalOffices);

  const addRegionalOffice = (item: OfficeItem) => {
    setRegionalOffices((prev) => [item, ...prev]);
  };

  const updateRegionalOffice = (id: string, updatedItem: Partial<OfficeItem>) => {
    setRegionalOffices((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
    );
  };

  const deleteRegionalOffice = (id: string) => {
    setRegionalOffices((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <RegionalOfficesContext.Provider value={{ regionalOffices, addRegionalOffice, updateRegionalOffice, deleteRegionalOffice }}>
      {children}
    </RegionalOfficesContext.Provider>
  );
}

export function useRegionalOffices() {
  const context = useContext(RegionalOfficesContext);
  if (context === undefined) {
    throw new Error('useRegionalOffices must be used within a RegionalOfficesProvider');
  }
  return context;
}
