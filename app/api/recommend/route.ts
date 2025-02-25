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
    // Authenticate the user.
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({
        success: false,
        error: "User not authenticated",
      });
    }
    const user = session.user;
    const userId = user.id as string;

    // Fetch the stored quiz answers for this user.
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

    // Parse the stored answers.
    const storedAnswers = JSON.parse(result[0].answers);

    // Validate that we have all required answers (adjust the number if needed)
    if (!storedAnswers || storedAnswers.length < 11) {
      console.error("Incomplete responses stored");
      return NextResponse.json({
        success: false,
        error: "Incomplete responses stored",
      });
    }

    // Get recommended career titles based on the stored responses.
    const recommendedTitles = getRecommendations(storedAnswers);
    console.log("Recommended Titles:", recommendedTitles);

    // Fetch the detailed career data from the database.
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

    // Re-sort careersData to match the order in recommendedTitles.
    const orderedCareersData = careersData.sort((a, b) => {
      return (
        recommendedTitles.indexOf(a.title) - recommendedTitles.indexOf(b.title)
      );
    });

    // Return the career details as the API response.
    return NextResponse.json({ success: true, careers: orderedCareersData });
  } catch (error) {
    console.error("Error in /api/recommend:", error);
    return NextResponse.json({
      success: false,
      error: "Error in recommendation",
    });
  }
}
