// app/api/update-progress/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { userProgress } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
    const session = await auth();
    if (!session || !session.user) {
        return NextResponse.json({ success: false, error: "User not authenticated" });
    }
    const { currentMilestone, completedMilestones } = await request.json();
    const user = session.user;
    const userId = user.id as string;

    const progressData = {
        current_milestone: currentMilestone,
        completed_milestones: JSON.stringify(completedMilestones),
    };

    try {
        // Upsert progress: update if exists, insert if not
        const existing = await db
            .select()
            .from(userProgress)
            .where(eq(userProgress.user_id, userId))
            .limit(1);

        if (existing.length) {
            await db.update(userProgress).set(progressData).where(eq(userProgress.user_id, userId));
        } else {
            await db.insert(userProgress).values({ user_id: userId, ...progressData });
        }
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error updating progress:", error);
        return NextResponse.json({ success: false, error: "Failed to update progress" });
    }
}
