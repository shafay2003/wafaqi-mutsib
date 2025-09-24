
'use client';

import Link from 'next/link';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useSettings } from '@/context/SettingsContext';

export function Header() {
    const { settings } = useSettings();
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-lg px-4 md:px-8">
            {/* Mobile sidebar trigger */}
            <div className="md:hidden">
                <SidebarTrigger />
            </div>
            
            {/* Mobile-only compact branding - only shows when sidebar is closed */}
            <div className="flex items-center gap-2 md:hidden">
                <div className="relative h-8 w-8 flex-shrink-0">
                    <img
                        src="/images/ombudsman-logo.png"
                        alt="Wafaqi Mohtasib Logo"
                        className="h-full w-full object-contain"
                    />
                </div>
                <span className="font-semibold text-gray-800 text-sm truncate">
                    Wafaqi Mohtasib
                </span>
            </div>
            
            {/* Search and Actions */}
            <div className="flex-1 flex items-center gap-4 justify-end">
                <div className="max-w-sm w-full">
                    <form>
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search website..."
                                className="w-full rounded-full pl-8 bg-gray-100"
                            />
                        </div>
                    </form>
                </div>
                
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/admin/login">Admin Login</Link>
                    </Button>
                </div>
            </div>
        </header>
    )
}
