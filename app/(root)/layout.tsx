import React, { ReactNode } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/database/drizzle";
import { userCareer } from "@/database/schema";
import { eq } from "drizzle-orm";
import {
    SidebarProvider,
    SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const Layout = async ({ children }: { children: ReactNode }) => {
    const session = await auth();
    if (!session) redirect("/sign-in");

    // Check if user has selected a career
    const userCareerExists = await db
        .select()
        .from(userCareer)
        .where(eq(userCareer.user_id, `${session.user?.id}`))
        .limit(1);
    if (!userCareerExists.length) {
        redirect("/quiz");
    }

    return (
        <SidebarProvider>
            {/* The pinned sidebar on the left */}
            <AppSidebar />

            {/* The main content area, offset by the sidebar's state */}
            <SidebarInset className="h-screen relative flex flex-col bg-white">
                <main className="flex-1 overflow-hidden">{children}</main>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default Layout;
