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
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { navLinks } from "@/lib/placeholder-data";
import { Logo } from "../icons";
import { ChevronDown } from "lucide-react";

export function Nav() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Logo className="h-10 w-10 text-primary" />
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold font-headline">
              Wafaqi Mohtasib
            </h2>
            <p className="text-xs text-muted-foreground">Pakistan</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navLinks.map((link, index) =>
            link.links ? (
              <Collapsible key={index}>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    className="w-full justify-between"
                    variant="ghost"
                  >
                    <div className="flex items-center gap-2">
                      <link.icon />
                      <span>{link.label}</span>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenu>
                    {link.links.map((subLink) => (
                      <SidebarMenuItem key={subLink.href}>
                        <Link href={subLink.href} className="w-full">
                          <SidebarMenuButton
                            isActive={pathname === subLink.href}
                            tooltip={{ children: subLink.label }}
                            variant="ghost"
                            className="w-full justify-start ml-6"
                          >
                            <span>{subLink.label}</span>
                          </SidebarMenuButton>
                        </Link>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <SidebarMenuItem key={link.href}>
                <Link href={link.href!} className="w-full">
                  <SidebarMenuButton
                    isActive={pathname === link.href}
                    tooltip={{ children: link.label }}
                  >
                    <link.icon />
                    <span>{link.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            )
          )}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarTrigger />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
