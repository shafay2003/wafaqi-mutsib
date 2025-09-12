import { SidebarProvider } from '@/components/ui/sidebar';
import { Header } from './Header';
import { Nav } from './Nav';
import { Footer } from './Footer';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
     <SidebarProvider>
        <div className="flex min-h-screen">
          <Nav />
          <div className="flex flex-1 flex-col">
            <Header />
            <main className="flex-1">
              <div className="container p-4 sm:p-6 md:p-8">
                {children}
              </div>
            </main>
            <Footer />
          </div>
        </div>
    </SidebarProvider>
  );
}
