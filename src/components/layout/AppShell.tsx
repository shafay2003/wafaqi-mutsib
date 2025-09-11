import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Header } from './Header';
import { Nav } from './Nav';
import { Footer } from './Footer';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader />
        <SidebarContent>
          <Nav />
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
      <SidebarInset className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}
