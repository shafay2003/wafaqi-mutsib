
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { adminNavLinks, type AdminNavLink } from "@/lib/admin-nav-links";
import { Logo } from "@/components/icons";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { Menu, Search, UserCircle, Bell, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from '@/hooks/use-auth';
import { usePathname } from 'next/navigation';
import { SettingsProvider, useSettings } from '@/context/SettingsContext';


function AdminHeader() {
  const { user } = useAuth();
  const { settings } = useSettings();
  
  return (
      <header className="flex h-16 items-center justify-between gap-4 border-b bg-background px-4 lg:px-6 sticky top-0 z-30">
        <div className="flex items-center gap-4 flex-1">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0">
               <div className="flex h-16 items-center border-b px-4 bg-gradient-to-r from-white to-green-50/20">
                 <Link href="/admin/dashboard" className="flex items-center gap-3 font-semibold group">
                   <div className="relative flex-shrink-0">
                     <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-2 shadow-sm border border-green-200/50 group-hover:shadow-md group-hover:border-green-300 transition-all duration-200">
                       <Image
                         src="/images/ombudsman-logo.png"
                         alt="Wafaqi Mohtasib Logo"
                         width={24}
                         height={24}
                         className="object-contain"
                       />
                     </div>
                   </div>
                   <div className="flex flex-col justify-center min-w-0 flex-1">
                     <span className="text-sm font-bold text-gray-900">{settings?.siteName || 'Admin Portal'}</span>
                     <p className="text-xs text-green-700 font-semibold">Admin Portal</p>
                     <div className="flex items-center gap-1 mt-0.5">
                       <div className="h-0.5 w-4 bg-gradient-to-r from-green-600 to-green-400"></div>
                       <p className="text-xs text-green-800 font-medium tracking-wide uppercase">Govt of Pakistan</p>
                     </div>
                   </div>
                 </Link>
               </div>
               <AdminNavMobile />
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
          <form>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
              />
            </div>
          </form>
        </div>
        </div>
        
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <UserCircle className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user?.name || 'My Account'}</DropdownMenuLabel>
              <p className="text-xs text-muted-foreground px-2 -mt-1 mb-2">{user?.role}</p>
              <DropdownMenuSeparator />
               <DropdownMenuItem asChild>
                <Link href="/" target="_blank">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Site
                </Link>
              </DropdownMenuItem>
              {adminNavLinks.find(l => l.href === '/admin/settings')?.roles.includes(user?.role || '') && (
                 <DropdownMenuItem asChild>
                    <Link href="/admin/settings">Settings</Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
               <DropdownMenuItem asChild>
                <Link href="/admin/login">Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
  );
}


function AdminNavMobile() {
  const { user } = useAuth();
  const pathname = usePathname();
  const { settings } = useSettings();
  const visibleLinks = adminNavLinks.filter(link => user && link.roles.includes(user.role));

  return (
    <div className="flex-1 py-4">
      <nav className="grid items-start px-2 text-sm font-medium">
        {visibleLinks.map((link) => (
           <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-green-50 ${pathname === link.href ? 'bg-green-100 text-green-700 font-semibold' : ''}`}
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}

function AdminNav() {
  const { user } = useAuth();
  const pathname = usePathname();
  const { settings } = useSettings();
  const visibleLinks = adminNavLinks.filter(link => user && link.roles.includes(user.role));

  return (
    <nav className="hidden border-r bg-muted/40 md:block md:w-72">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-16 items-center border-b px-4 lg:px-6 bg-gradient-to-r from-white to-green-50/20">
          <Link href="/admin/dashboard" className="flex items-center gap-3 font-semibold group">
            <div className="relative flex-shrink-0">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-2.5 shadow-sm border border-green-200/50 group-hover:shadow-md group-hover:border-green-300 transition-all duration-200">
                <Image
                  src="/images/ombudsman-logo.png"
                  alt="Wafaqi Mohtasib Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center min-w-0 flex-1">
              <span className="text-base font-bold text-gray-900 group-hover:text-green-700 transition-colors">{settings.siteName}</span>
              <p className="text-sm text-green-700 font-semibold leading-tight">Admin Portal</p>
              <div className="flex items-center gap-1 mt-1">
                <div className="h-0.5 w-6 bg-gradient-to-r from-green-600 to-green-400"></div>
                <p className="text-xs text-green-800 font-medium tracking-wide uppercase">Govt of Pakistan</p>
              </div>
            </div>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8 border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1 overflow-auto">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 py-2">
            {visibleLinks.map((link) => (
               <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all hover:bg-green-50 hover:text-green-700 ${
                  pathname === link.href 
                    ? 'bg-green-100 text-green-700 font-semibold' 
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                <link.icon className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </nav>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === '/admin/login' || pathname === '/admin/forgot-password') {
    return <SettingsProvider>{children}</SettingsProvider>;
  }

  return (
    <SettingsProvider>
      <div className="grid min-h-screen w-full md:grid-cols-[288px_1fr]">
        <AdminNav />
        <div className="flex flex-col">
          <AdminHeader />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </SettingsProvider>
  );
}
