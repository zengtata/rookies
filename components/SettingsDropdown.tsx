"use client";

import React, { useState } from "react";
import { ChevronsUpDown, Settings } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";

export function SettingsDropdown() {
    const [darkMode, setDarkMode] = useState(() => {
        // Check localStorage on initial load
        if (typeof window !== "undefined") {
            return localStorage.getItem("theme") === "dark";
        }
        return false;
    });

    const handleDarkModeToggle = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        if (newDarkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    const handleChangePassword = () => {
        // TODO: Open a shadcn dialog for changing password
        console.log("Change Password clicked");
    };

    const { isMobile } = useSidebar();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                    <Settings className="h-6 w-6" />
                    <span>Settings</span>
                    <ChevronsUpDown className="ml-auto h-6 w-6 shrink-0" />
                </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
            >
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <div className="flex items-center justify-between w-full">
                        <span>Dark Mode</span>
                        <Switch checked={darkMode} onCheckedChange={handleDarkModeToggle} />
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={handleChangePassword}>
                    Change Password
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
