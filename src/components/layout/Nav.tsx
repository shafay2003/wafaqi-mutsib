"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { navLinks } from "@/lib/placeholder-data";
import { Logo } from "../icons";
import { ChevronDown, ExternalLink } from "lucide-react";
import { Button } from "../ui/button";

export function Nav() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2.5">
          <Logo className="h-10 w-10 text-primary" />
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold font-headline tracking-tight">
              Wafaqi Mohtasib
            </h2>
            <p className="text-xs text-muted-foreground">Ombudsman's Secretariat</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navLinks.map((link, index) =>
            link.links ? (
              <Collapsible key={index} className="w-full">
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    className="w-full justify-between"
                    variant="ghost"
                  >
                    <div className="flex items-center gap-3">
                      <link.icon className="h-5 w-5" />
                      <span>{link.label}</span>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="pl-8 py-1 space-y-1 border-l-2 ml-5">
                    {link.links.map((subLink) => (
                      <Link key={subLink.href} href={subLink.href} className="block">
                          <SidebarMenuButton
                            isActive={pathname === subLink.href}
                            variant="ghost"
                            className="w-full justify-start h-8 text-sm font-normal"
                          >
                            <span>{subLink.label}</span>
                          </SidebarMenuButton>
                        </Link>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <SidebarMenuItem key={link.href}>
                <Link href={link.href!} className="w-full">
                  <SidebarMenuButton
                    isActive={pathname === link.href}
                    tooltip={{ children: link.label }}
                    className="gap-3"
                  >
                    <link.icon className="h-5 w-5" />
                    <span>{link.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            )
          )}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="border-t -mx-2 p-4">
            <div className="p-4 rounded-lg bg-muted/50 text-center space-y-3">
                <h4 className="font-semibold text-sm">Need Help?</h4>
                <p className="text-xs text-muted-foreground">
                    Visit our help center or contact support for assistance.
                </p>
                <Button size="sm" className="w-full">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Help Center
                </Button>
            </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
