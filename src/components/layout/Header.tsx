'use client';

import Link from 'next/link';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Logo } from '../icons';

export function Header() {
    const pathname = usePathname();
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur-sm px-4 md:px-8">
            <div className="flex items-center gap-2">
                 <SidebarTrigger className="md:hidden" />
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <Logo className="h-8 w-8 text-primary" />
                    <span className="hidden sm:inline-block font-headline">Wafaqi Mohtasib</span>
                </Link>
            </div>
            
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <form className="ml-auto flex-1 sm:flex-initial">
                    <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search website..."
                        className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                    />
                    </div>
                </form>
                <Button variant="outline" size="icon" className="md:hidden">
                    <Search className="h-5 w-5" />
                    <span className="sr-only">Search</span>
                </Button>
            </div>
        </header>
    )
}
