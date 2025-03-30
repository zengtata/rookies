import { NextResponse } from "next/server";
import { quizAnswers } from "@/database/schema";
import { db } from "@/database/drizzle";
import { auth } from "@/auth";

export async function POST(request: Request) {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
    );
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
    const { answers } = await request.json();

    await db
        .insert(quizAnswers)
        .values({
          user_id: userId,
          answers: JSON.stringify(answers),
        })
        .onConflictDoUpdate({
          target: [quizAnswers.user_id],
          set: {
            answers: JSON.stringify(answers),
          },
        });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving quiz answers:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to save quiz answers",
    });
  }
}
