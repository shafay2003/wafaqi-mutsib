import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { adminNavLinks } from "@/lib/admin-nav-links";
import Link from 'next/link';
import { Logo } from "@/components/icons";

function AdminNav() {
  return (
    <Sidebar className="border-r bg-muted/40">
        <SidebarHeader className="border-b">
             <div className="flex items-center gap-2.5">
                <Logo className="h-9 w-9 text-primary" />
                <div className="flex flex-col">
                    <h2 className="text-base font-semibold tracking-tight text-gray-800">
                    Wafaqi Mohtasib
                    </h2>
                    <p className="text-xs text-muted-foreground">Admin Panel</p>
                </div>
            </div>
        </SidebarHeader>
        <SidebarContent>
            <SidebarMenu>
                 {adminNavLinks.map((link) => (
                    <SidebarMenuItem key={link.href}>
                        <Link href={link.href} className="w-full">
                            <SidebarMenuButton className="gap-3 font-medium" variant="ghost">
                                <link.icon className="h-5 w-5 text-muted-foreground" />
                                <span>{link.label}</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                 ))}
            </SidebarMenu>
        </SidebarContent>
    </Sidebar>
  );
}


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminNav />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
