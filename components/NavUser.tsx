"use client";

import {
    BadgeCheck,
    Bell,
    BriefcaseBusiness,
    ChevronsUpDown,
    CreditCard,
    LogOut,
    NotebookPen, PersonStanding,
    Sparkles
} from "lucide-react";
import { useRouter } from "next/navigation";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { signOutAction } from "@/app/actions/signOutAction";
import {Button} from "@/components/ui/button";


export function NavUser({
                            user,
                        }: {
    user?: {
        name?: string;
        email?: string;
    };
}) {
    const { isMobile } = useSidebar();
    const router = useRouter();
    const userName = user?.name || "Anonymous";
    const userEmail = user?.email || "no-email@example.com";

    const handleSignOut = async () => {
        await signOutAction();
        router.push("/sign-in");
    };

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <PersonStanding className={"mr-2 h-8 w-8"}/>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{userName}</span>
                                <span className="truncate text-xs">{userEmail}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto h-6 w-6 shrink-0" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-component"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{userName}</span>
                                    <span className="truncate text-xs">{userEmail}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onSelect={handleSignOut}>
                            <LogOut className="mr-2 h-4 w-4" />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
