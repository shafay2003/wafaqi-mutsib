import type { Metadata } from 'next';
import { PT_Sans } from 'next/font/google';
import { AppShell } from '@/components/layout/AppShell';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';

const ptSans = PT_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: ['400', '700']
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
      <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${ptSans.variable} font-body antialiased`}>
        <AppShell>
          {children}
        </AppShell>
        <Toaster />
      </body>
    </html>
  );
}
