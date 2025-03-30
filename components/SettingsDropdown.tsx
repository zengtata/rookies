"use client";

import React, { useState, useEffect } from "react";
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
import { ChangePasswordDialog } from "@/components/ChangePasswordDialog";

export function SettingsDropdown() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
  };

  const { isMobile } = useSidebar();

  return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
                size="lg"
                className="data-[state=open]:text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent"
            >
              <Settings className="h-6 w-6" />
              <span>Settings</span>
              <ChevronsUpDown className="ml-auto h-6 w-6 shrink-0" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-component"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
          >
            <DropdownMenuLabel>Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex items-center justify-between w-full">
                <span>Dark Mode</span>
                <Switch
                    checked={darkMode}
                    onCheckedChange={handleDarkModeToggle}
                />
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  setOpenDialog(true);
                }}
            >
              Change Password
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ChangePasswordDialog open={openDialog} onOpenChange={setOpenDialog} />
      </>
  );
}
