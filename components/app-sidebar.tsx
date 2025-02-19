"use client";

import React from "react";
import Link from "next/link";
import { Home, Settings, User } from "lucide-react";
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

export function AppSidebar() {
    // Removed the "Profile" item from the main nav
    // because we want "Profile" in the footer.
    const navItems = [
        { title: "Home", href: "/", icon: Home },
        { title: "Settings", href: "/settings", icon: Settings },
    ];

    return (
        <Sidebar variant="floating" collapsible="offcanvas" side="left">
            {/* Header: Favicon + "Rookies" title */}
            <SidebarHeader>
                <div className="flex items-center gap-2 p-2">
                    {/* The favicon can be any image or icon */}
                    <img
                        src="/favicon.ico"
                        alt="Favicon"
                        className="h-10 w-10"
                    />
                    <span className="font-semibold text-lg">Rookies</span>
                </div>
            </SidebarHeader>

            {/* Main nav content */}
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
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

            {/* Footer: a link to the Profile page */}
            <SidebarFooter>
                <div className="p-2">
                    <Link href="/my-profile" className="flex items-center gap-2">
                        <User size={24} />
                        <span>Profile</span>
                    </Link>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}
