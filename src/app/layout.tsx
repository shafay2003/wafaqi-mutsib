import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import { MediaProvider } from '@/context/MediaContext';
import { NotificationsProvider } from '@/context/NotificationsContext';
import { PublicationsProvider } from '@/context/PublicationsContext';
import { SuccessStoriesProvider } from '@/context/SuccessStoriesContext';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
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
      <body className={`${inter.variable} font-body antialiased`}>
        <SuccessStoriesProvider>
          <PublicationsProvider>
            <NotificationsProvider>
              <MediaProvider>
                {children}
              </MediaProvider>
            </NotificationsProvider>
          </PublicationsProvider>
        </SuccessStoriesProvider>
        <Toaster />
      </body>
    </html>
  );
}
