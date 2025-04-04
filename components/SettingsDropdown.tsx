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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Switch } from "@/components/ui/switch";
import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import { ChangePasswordDialog } from "@/components/ChangePasswordDialog";
import {toast} from "@/hooks/use-toast";
import {signOutAction} from "@/app/actions/signOutAction";
import {router} from "next/client";

export function SettingsDropdown() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

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

  // Added delete account functionality based on User Testing Responses
  const handleDeleteAccount = async () => {
    try {
      const response = await fetch("/api/delete-account", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        toast({
          title: "Error",
          description: data.error || "Failed to delete account.",
        });
        return;
      }

      toast({
        title: "Account deleted",
        description: "Your account has been successfully deleted.",
      });

      try {
        await signOutAction();
      } catch (signOutError) {
        console.error("Sign out error:", signOutError);
      }

      window.location.href = "/sign-in";

    } catch (error) {
      console.error("Delete account error:", error);
      toast({
        title: "Error",
        description: "An error occurred while deleting your account.",
      });
    }
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

            <DropdownMenuItem onSelect={() => setConfirmDeleteDialog(true)}>
              Delete Account
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>

        <ChangePasswordDialog open={openDialog} onOpenChange={setOpenDialog} />

        <AlertDialog open={confirmDeleteDialog} onOpenChange={setConfirmDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Account</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete your account? This action cannot be reversed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteAccount} className="text-white">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
  );
}
