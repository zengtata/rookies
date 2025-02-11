import { NextResponse } from "next/server";
import { getRecommendations } from "@/lib/recommendation";
import { careers } from "@/database/schema";
import { db } from "@/database/drizzle";
import { inArray } from "drizzle-orm/expressions";

export async function POST(request: Request) {
  try {
    // Parse the incoming JSON data, expecting an object with a "responses" property.
    const { responses } = await request.json();

    // Validate that responses exist and have the expected number of answers (e.g., 11)
    if (!responses || responses.length < 11) {
      console.error("Incomplete responses received");
      return NextResponse.json({
        success: false,
        error: "Incomplete responses received",
      });
    }

    // Get recommended career titles based on all the responses
    const recommendedTitles = getRecommendations(responses);

    // Log the recommended titles for debugging
    console.log("Recommended Titles:", recommendedTitles);

    // Fetch the detailed career data from the database for the recommended titles.
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
      return recommendedTitles.indexOf(a.title) - recommendedTitles.indexOf(b.title);
    });

    // Return the career details as the API response
    return NextResponse.json({ success: true, careers: orderedCareersData });
  } catch (error) {
    console.error("Error in /api/recommend:", error);
    return NextResponse.json({
      success: false,
      error: "Error in recommendation",
    });
  }
}
