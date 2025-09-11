import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AppShell } from '@/components/layout/AppShell';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
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
      <body className={`${inter.variable} font-sans antialiased`}>
        <AppShell>
          {children}
        </AppShell>
        <Toaster />
      </body>
    </html>
  );
}
