"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BriefcaseBusiness, NotebookPen, Info } from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/NavUser";
import { SettingsDropdown } from "@/components/SettingsDropdown";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
  user: {
    name: string;
    email: string;
  };
}

export function AppSidebar({ user }: AppSidebarProps) {
  const pathname = usePathname();

  const mainNavItems = [
    { title: "Home", href: "/", icon: Home },
    {
      title: "Change Career",
      href: "/recommendation",
      icon: BriefcaseBusiness,
    },
    { title: "Retake Quiz", href: "/quiz", icon: NotebookPen },
  ];

  const additionalNavItems = [
    { title: "How Rookies Work", href: "/about", icon: Info },
  ];

  return (
    <Sidebar variant="floating" collapsible="offcanvas" side="left">
      {/* Sidebar Header */}
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <img src="/favicon.ico" alt="Favicon" className="h-10 w-10" />
          <span className="font-semibold text-lg">Rookies</span>
        </div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {mainNavItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2",
                      pathname === item.href && "bg-buttonHover",
                    )}
                  >
                    <item.icon size={24} />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel>More</SidebarGroupLabel>
          <SidebarMenu>
            {additionalNavItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2",
                      pathname === item.href && "bg-buttonHover",
                    )}
                  >
                    <item.icon size={24} />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            <SidebarMenuItem>
              <SettingsDropdown />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
