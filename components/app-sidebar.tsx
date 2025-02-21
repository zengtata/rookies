"use client";

import React from "react";
import Link from "next/link";
import { Home, Settings, User, BriefcaseBusiness, NotebookPen, Info } from "lucide-react";
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

interface AppSidebarProps {
    user: {
        name: string;
        email: string;
    };
}

export function AppSidebar({ user }: AppSidebarProps) {
    // Main nav items for the first group
    const mainNavItems = [
        { title: "Home", href: "/", icon: Home },
        { title: "Change Career", href: "/recommendation", icon: BriefcaseBusiness },
        { title: "Retake Quiz", href: "/quiz", icon: NotebookPen },
    ];

    // Additional nav items to display just above the footer
    const additionalNavItems = [
        { title: "How Rookies Work", href: "/about", icon: Info },
        { title: "Settings", href: "/settings", icon: Settings },
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

            {/* Sidebar Content */}
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarMenu>
                        {mainNavItems.map((item) => (
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
                {/* Additional navigation group placed just above the footer */}
                <SidebarGroup className={"mt-auto"}>
                    <SidebarGroupLabel>More</SidebarGroupLabel>
                    <SidebarMenu>
                        {additionalNavItems.map((item) => (
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

            {/* Sidebar Footer with NavUser */}
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
        </Sidebar>
    );
}
