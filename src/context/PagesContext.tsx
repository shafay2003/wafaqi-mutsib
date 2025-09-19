
'use client';

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export type PageContent = {
  about: string;
  contact: string;
};

const initialPageContent: PageContent = {
  about: `The institution of Wafaqi Mohtasib (Ombudsman) was established in Pakistan on January 24, 1983, through the Establishment of the Office of Wafaqi Mohtasib (Ombudsman) Order, 1983 (President's Order No. 1 of 1983). It is an independent and impartial body that provides a check on the executive branch of the government and has resolved millions of cases, providing relief to the common man without any cost.`,
  contact: `We are here to help. Find the contact details for our head office and regional centers below.`,
};

type PagesContextType = {
  pages: PageContent;
  updatePage: (page: keyof PageContent, content: string) => void;
  loading: boolean;
};

const PagesContext = createContext<PagesContextType | undefined>(undefined);

export function PagesProvider({ children }: { children: ReactNode }) {
  const [pages, setPages] = useState<PageContent>(initialPageContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedPages = window.localStorage.getItem('pageContent');
      if (storedPages) {
        setPages(JSON.parse(storedPages));
      }
    } catch (error) {
      console.error('Error reading page content from localStorage', error);
    }
    setLoading(false);
  }, []);

  const updatePage = (page: keyof PageContent, content: string) => {
    const newPages = { ...pages, [page]: content };
    setPages(newPages);
    try {
        window.localStorage.setItem('pageContent', JSON.stringify(newPages));
    } catch (error) {
        console.error('Error writing page content to localStorage', error);
    }
  };

  return (
    <PagesContext.Provider value={{ pages, updatePage, loading }}>
      {children}
    </PagesContext.Provider>
  );
}

export function usePages() {
  const context = useContext(PagesContext);
  if (context === undefined) {
    throw new Error('usePages must be used within a PagesProvider');
  }
  return context;
}
