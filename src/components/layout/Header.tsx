'use client';

import Link from 'next/link';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Logo } from '../icons';

export function Header() {
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-lg px-4 md:px-8">
            <div className="flex items-center gap-2 md:hidden">
                 <SidebarTrigger />
            </div>
            
            <div className="flex w-full items-center gap-4 md:gap-8">
               <div className="hidden md:flex items-center gap-2.5 font-semibold">
                 <Logo className="h-8 w-8 text-primary" />
                 <span className="font-semibold text-lg text-gray-800">Wafaqi Mohtasib</span>
               </div>
               <div className="w-full flex-1">
                 <form>
                    <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search website..."
                        className="w-full rounded-full pl-8 md:w-[200px] lg:w-[320px] bg-gray-100"
                    />
                    </div>
                </form>
               </div>
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm">Log In</Button>
                  <Button size="sm">Sign Up</Button>
                </div>
            </div>
        </header>
    )
}
