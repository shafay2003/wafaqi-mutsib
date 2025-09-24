
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
    <Sidebar className="border-r bg-white w-72">
      <SidebarHeader className="border-b border-green-100/50 bg-gradient-to-r from-white to-green-50/20 p-4">
        <Link href="/" className="group">
          <div className="flex items-center gap-3">
            {/* Compact Logo Design */}
            <div className="relative flex-shrink-0">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-2.5 shadow-sm border border-green-200/50 group-hover:shadow-md group-hover:border-green-300 transition-all duration-200">
                <img
                  src="/images/ombudsman-logo.png"
                  alt="Wafaqi Mohtasib (Ombudsman) Logo"
                  className="h-10 w-10 object-contain"
                />
              </div>
            </div>
            
            {/* Compact Typography */}
            <div className="flex flex-col justify-center min-w-0 flex-1">
              <h1 className="text-base font-bold text-gray-900 leading-tight tracking-tight group-hover:text-green-700 transition-colors">
                Wafaqi Mohtasib
              </h1>
              <p className="text-sm text-green-700 font-semibold leading-tight">
                Ombudsman's Secretariat
              </p>
              <div className="flex items-center gap-1 mt-1">
                <div className="h-0.5 w-6 bg-gradient-to-r from-green-600 to-green-400"></div>
                <p className="text-xs text-green-800 font-medium tracking-wide uppercase">
                  Govt of Pakistan
                </p>
              </div>
            </div>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navLinks.map((link, index) =>
            link.links ? (
              <Collapsible key={index} className="w-full">
                <div className="flex items-center">
                   <Link href={link.href!} className="flex-1">
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
                   </Link>
                </div>
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
        <div className="border-t border-green-100/50 bg-gradient-to-r from-white to-green-50/20 p-4">
            <div className="text-center space-y-3">
                <div className="space-y-2">
                  <h4 className="font-bold text-gray-900 text-base">Citizen Services</h4>
                  <div className="h-0.5 w-10 bg-gradient-to-r from-green-600 to-green-400 mx-auto"></div>
                </div>
                
                <div className="space-y-2">
                  <Button 
                    size="sm" 
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-sm hover:shadow-md transition-all text-white font-semibold text-sm" 
                    asChild
                  >
                    <Link href="/complaint">
                        🏛️ File Complaint
                    </Link>
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full border border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 font-medium text-sm" 
                    asChild
                  >
                    <Link href="/contact">
                        📞 Contact Support
                    </Link>
                  </Button>
                </div>
                
                <div className="pt-2 border-t border-green-200/50">
                  <p className="text-sm font-bold text-green-800">
                    Helpline: +92-51-9201715
                  </p>
                  <p className="text-xs text-gray-600 mt-0.5 font-medium">
                    Free Service • 24/7
                  </p>
                </div>
            </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
