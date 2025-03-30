import { NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { userCareer } from "@/database/schema";
import { auth } from "@/auth";
import { eq } from "drizzle-orm/expressions";

export async function POST(request: Request) {
  const { careerId } = await request.json();

  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({
      success: false,
      error: "User not authenticated. Please sign in.",
    });
  }

  const user = session.user;
  if (!user?.id) {
    return NextResponse.json({
      success: false,
      error: "User ID is missing",
    });
  }
  const userId = user.id as string;

  try {
    const existingRecord = await db
        .select()
        .from(userCareer)
        .where(eq(userCareer.user_id, userId))
        .limit(1);

    if (existingRecord.length > 0) {
      await db
          .update(userCareer)
          .set({ career_id: careerId })
          .where(eq(userCareer.user_id, userId));
    } else {
      await db.insert(userCareer).values({
        user_id: userId,
        career_id: careerId,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      error: "Failed to store career choice",
    });
  }
}
