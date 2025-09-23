import type { Metadata } from 'next';
import { PT_Sans } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import { MediaProvider } from '@/context/MediaContext';
import { NotificationsProvider } from '@/context/NotificationsContext';
import { PublicationsProvider } from '@/context/PublicationsContext';
import { SuccessStoriesProvider } from '@/context/SuccessStoriesContext';
import { SettingsProvider } from '@/context/SettingsContext';
import { RegionalOfficesProvider } from '@/context/RegionalOfficesContext';
import { FaqProvider } from '@/context/FaqContext';
import { PagesProvider } from '@/context/PagesContext';
import { KeyPersonnelProvider } from '@/context/KeyPersonnelContext';
import { UsersProvider } from '@/context/UsersContext';
import ClientOnly from '@/components/ClientOnly';
import ErrorBoundary from '@/components/ErrorBoundary';
import { MediaStorageDebug } from '@/components/debug/MediaStorageDebug';

const ptSans = PT_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'Wafaqi Mohtasib (Federal Ombudsman) of Pakistan',
    template: '%s | Wafaqi Mohtasib',
  },
  description: 'The official website of the Wafaqi Mohtasib (Federal Ombudsman) of Pakistan, committed to redressing public grievances against government agencies.',
  keywords: ['Wafaqi Mohtasib', 'Federal Ombudsman', 'Pakistan', 'Complaint Resolution', 'Government Accountability'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${ptSans.variable} font-body antialiased`}>
        <ClientOnly fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <ErrorBoundary>
            <SettingsProvider>
              <UsersProvider>
                <PagesProvider>
                  <SuccessStoriesProvider>
                    <PublicationsProvider>
                      <NotificationsProvider>
                         <RegionalOfficesProvider>
                            <MediaProvider>
                              <FaqProvider>
                                <KeyPersonnelProvider>
                                  {children}
                                  <MediaStorageDebug />
                                </KeyPersonnelProvider>
                              </FaqProvider>
                            </MediaProvider>
                        </RegionalOfficesProvider>
                      </NotificationsProvider>
                    </PublicationsProvider>
                  </SuccessStoriesProvider>
                </PagesProvider>
              </UsersProvider>
            </SettingsProvider>
          </ErrorBoundary>
        </ClientOnly>
        <Toaster />
      </body>
    </html>
  );
}
