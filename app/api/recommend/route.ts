import { NextResponse } from "next/server";
import { getRecommendations } from "@/lib/recommendation";

export async function POST(request: Request) {
  try {
    // Parse the incoming JSON data
    const { skills, interests, workPreference } = await request.json();

    // Ensure both skills and interests are provided
    if (!skills || !interests) {
      console.error("Skills or interests are missing");
      return NextResponse.json({
        success: false,
        error: "Skills and interests are required",
      });
    }

    // Get recommendations based on the user's skills and interests
    const recommendedCareers = getRecommendations(
      skills,
      interests,
      workPreference,
    );

    // Ensure the recommendations are not empty
    if (!recommendedCareers || recommendedCareers.length === 0) {
      console.error("No careers found based on your answers");
      return NextResponse.json({
        success: false,
        error: "No careers found based on your answers",
      });
    }

    // Send back the recommended careers
    return NextResponse.json({ success: true, careers: recommendedCareers });
  } catch (error) {
    console.error("Error in /api/recommend:", error);
    return NextResponse.json({
      success: false,
      error: "Error in recommendation",
    });
  }
}
