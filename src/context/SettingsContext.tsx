
'use client';

import { createContext, useState, useContext, ReactNode } from 'react';

type Settings = {
  siteName: string;
};

type SettingsContextType = {
  settings: Settings;
  setSettings: (settings: Partial<Settings>) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettingsState] = useState<Settings>({
    siteName: 'Wafaqi Mohtasib',
  });

  const setSettings = (newSettings: Partial<Settings>) => {
    setSettingsState((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
