'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { navLinks } from '@/lib/placeholder-data';
import { Logo } from '@/components/icons';

export function Nav() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col p-4">
       <div className="flex items-center gap-3 px-2 pb-4 border-b mb-4">
          <Logo className="h-10 w-10 text-primary" />
          <div className="flex flex-col">
            <span className="font-headline text-lg font-bold leading-none">Wafaqi Mohtasib</span>
            <span className="text-sm text-muted-foreground">Pakistan</span>
          </div>
        </div>
      <SidebarMenu>
        {navLinks.map((link) => (
          <SidebarMenuItem key={link.href}>
            <Link href={link.href}>
              <SidebarMenuButton
                isActive={
                  link.href === '/'
                    ? pathname === link.href
                    : pathname.startsWith(link.href)
                }
                className="w-full"
              >
                <link.icon className="h-5 w-5" />
                <span>{link.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </div>
  );
}
