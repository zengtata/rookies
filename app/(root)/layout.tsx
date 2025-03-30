import React, { ReactNode } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import PixelTransition from "@/components/TransitionWrapper";
import { AutoCollapseSidebar } from "@/components/AutoCollapseSidebar";

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
      <AutoCollapseSidebar />

      <AppSidebar user={userForSidebar} />

      <SidebarInset className="h-screen relative flex flex-col bg-white">
        <PixelTransition>
          <main className="flex-1 overflow-hidden">{children}</main>
        </PixelTransition>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
