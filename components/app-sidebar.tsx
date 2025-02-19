"use client";

import React from "react";
import Link from "next/link";
import { Home, User, Settings } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar() {
    const navItems = [
        { title: "Home", href: "/", icon: Home },
        { title: "Profile", href: "/my-profile", icon: User },
        { title: "Settings", href: "/settings", icon: Settings },
    ];

    return (
        <Sidebar
            variant="floating"
            collapsible="offcanvas"
            side="left"
        >
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Rookies</SidebarGroupLabel>
                    <SidebarMenu>
                        {navItems.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <Link href={item.href} className="flex items-center gap-2">
                                        <item.icon size={24} />
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
