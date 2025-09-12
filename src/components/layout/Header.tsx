'use client';

import Link from 'next/link';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Logo } from '../icons';

export function Header() {
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-8">
            <div className="flex items-center gap-2 md:hidden">
                 <SidebarTrigger />
            </div>
            
            <div className="flex w-full items-center gap-4">
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
            </div>
        </header>
    )
}
