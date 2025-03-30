import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { userProgress } from "@/database/schema";
import { eq, and } from "drizzle-orm";

export async function POST(request: Request) {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({
      success: false,
      error: "User not authenticated",
    });
  }
  const { careerId, currentMilestone, completedMilestones } =
    await request.json();
  if (!careerId) {
    return NextResponse.json({ success: false, error: "Missing careerId" });
  }
  const userId = session.user.id as string;

  const progressData = {
    current_milestone: currentMilestone,
    completed_milestones: JSON.stringify(completedMilestones),
  };

  try {
    const existing = await db
      .select()
      .from(userProgress)
      .where(
        and(
          eq(userProgress.user_id, userId),
          eq(userProgress.career_id, careerId),
        ),
      )
      .limit(1);

    if (existing.length) {
      await db
        .update(userProgress)
        .set(progressData)
        .where(
          and(
            eq(userProgress.user_id, userId),
            eq(userProgress.career_id, careerId),
          ),
        );
    } else {
      await db.insert(userProgress).values({
        user_id: userId,
        career_id: careerId,
        ...progressData,
      });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating progress:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to update progress",
    });
  }
}
