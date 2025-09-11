import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Header } from './Header';
import { Nav } from './Nav';
import { Footer } from './Footer';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
     <SidebarProvider>
        <Nav />
        <SidebarInset className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <div className="container p-4 md:p-8">
              {children}
            </div>
          </main>
          <Footer />
        </SidebarInset>
    </SidebarProvider>
  );
}
