import React, { ReactNode } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

import {
    SidebarProvider,
    SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import {NextResponse} from "next/server";


const Layout = async ({ children }: { children: ReactNode }) => {
    const session = await auth();
    if (!session || !session.user) {
        redirect("/sign-in");
    }
    const userForSidebar = {
        name: session.user.name || "Anonymous",
        email: session.user.email || "no-email@example.com",
    };

    return (
        <SidebarProvider>
            {/* The pinned sidebar on the left */}
            <AppSidebar user={userForSidebar} />

            {/* The main content area, offset by the sidebar's state */}
            <SidebarInset className="h-screen relative flex flex-col bg-white">
                <main className="flex-1 overflow-hidden">{children}</main>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default Layout;
