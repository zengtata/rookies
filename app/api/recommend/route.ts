import { NextResponse } from "next/server";
import { getRecommendations } from "@/lib/recommendation";
import { careers, quizAnswers } from "@/database/schema";
import { db } from "@/database/drizzle";
import { inArray } from "drizzle-orm/expressions";
import { auth } from "@/auth";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({
        success: false,
        error: "User not authenticated",
      });
    }
    const user = session.user;
    const userId = user.id as string;

    const result = await db
      .select()
      .from(quizAnswers)
      .where(eq(quizAnswers.user_id, userId))
      .limit(1);

    if (!result || result.length === 0) {
      console.error("No quiz answers found for user");
      return NextResponse.json({
        success: false,
        error: "No quiz answers found",
      });
    }

    const storedAnswers = JSON.parse(result[0].answers);

    if (!storedAnswers || storedAnswers.length < 11) {
      console.error("Incomplete responses stored");
      return NextResponse.json({
        success: false,
        error: "Incomplete responses stored",
      });
    }

    const recommendedTitles = getRecommendations(storedAnswers);
    console.log("Recommended Titles:", recommendedTitles);

    const careersData = await db
      .select()
      .from(careers)
      .where(inArray(careers.title, recommendedTitles));

    if (!careersData || careersData.length === 0) {
      console.error("No careers found based on your responses");
      return NextResponse.json({
        success: false,
        error: "No careers found based on your responses",
      });
    }

    const orderedCareersData = careersData.sort((a, b) => {
      return (
        recommendedTitles.indexOf(a.title) - recommendedTitles.indexOf(b.title)
      );
    });

    return NextResponse.json({ success: true, careers: orderedCareersData });
  } catch (error) {
    console.error("Error in /api/recommend:", error);
    return NextResponse.json({
      success: false,
      error: "Error in recommendation",
    });
  }
}
