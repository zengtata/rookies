import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { userProgress } from "@/database/schema";
import { eq, and } from "drizzle-orm";

export async function GET(request: Request) {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({
      success: false,
      error: "User not authenticated",
    });
  }
  const user = session.user;
  const userId = user.id as string;

  const { searchParams } = new URL(request.url);
  const careerId = searchParams.get("careerId");
  if (!careerId) {
    return NextResponse.json({ success: false, error: "Missing careerId" });
  }

  try {
    const progress = await db
      .select()
      .from(userProgress)
      .where(
        and(
          eq(userProgress.user_id, userId),
          eq(userProgress.career_id, careerId),
        ),
      )
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
    return NextResponse.json({
      success: false,
      error: "Failed to retrieve progress",
    });
  }
}
