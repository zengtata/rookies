// app/api/get-progress/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { userProgress } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function GET() {
    const session = await auth();
    if (!session || !session.user) {
        return NextResponse.json({ success: false, error: "User not authenticated" });
    }
    const user = session.user;
    const userId = user.id as string;

    try {
        const progress = await db
            .select()
            .from(userProgress)
            .where(eq(userProgress.user_id, userId))
            .limit(1);

        if (progress.length) {
            const data = progress[0];
            return NextResponse.json({
                success: true,
                currentMilestone: data.current_milestone,
                completedMilestones: JSON.parse(data.completed_milestones),
            });
        } else {
            return NextResponse.json({
                success: true,
                currentMilestone: 0,
                completedMilestones: [],
            });
        }
    } catch (error) {
        console.error("Error retrieving progress:", error);
        return NextResponse.json({ success: false, error: "Failed to retrieve progress" });
    }
}
