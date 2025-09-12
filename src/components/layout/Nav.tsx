
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
    <Sidebar className="border-r bg-white">
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2.5">
          <Logo className="h-9 w-9 text-primary" />
          <div className="flex flex-col">
            <h2 className="text-base font-semibold tracking-tight text-gray-800">
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
                    className="w-full justify-between font-medium"
                    variant="ghost"
                  >
                    <div className="flex items-center gap-3">
                      <link.icon className="h-5 w-5 text-muted-foreground" />
                      <span>{link.label}</span>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="pl-8 py-1 space-y-1 border-l-2 ml-[1.3rem]">
                    {link.links.map((subLink) => (
                      <Link key={subLink.href} href={subLink.href} className="block">
                          <SidebarMenuButton
                            isActive={pathname === subLink.href}
                            variant="ghost"
                            className="w-full justify-start h-9 text-sm font-normal text-muted-foreground data-[active=true]:text-primary data-[active=true]:bg-primary/10"
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
                    className="gap-3 font-medium data-[active=true]:bg-primary/10"
                    variant="ghost"
                  >
                    <link.icon className="h-5 w-5 text-muted-foreground" />
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
            <div className="p-4 rounded-lg bg-gray-100 text-center space-y-3">
                <h4 className="font-semibold text-sm text-gray-800">Need Help?</h4>
                <p className="text-xs text-muted-foreground">
                    Visit our help center or contact support for assistance.
                </p>
                <Link href="/faq">
                  <Button size="sm" className="w-full">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Help Center
                  </Button>
                </Link>
            </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
