import React, { ReactNode } from "react";
import Header from "@/components/Header";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/database/drizzle";
import { userCareer } from "@/database/schema";
import { eq } from "drizzle-orm";

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
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        <Header session={session} />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
