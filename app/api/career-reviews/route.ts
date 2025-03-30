import { NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { careerReviews } from "@/database/schema";
import { eq, asc } from "drizzle-orm/expressions";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const careerId = searchParams.get("careerId");
    if (!careerId) {
        return NextResponse.json({ success: false, error: "No careerId provided" });
    }

    // Fetch career reviews ordered by year
    const reviewsResult = await db
        .select()
        .from(careerReviews)
        .where(eq(careerReviews.career_id, careerId))
        .orderBy(asc(careerReviews.year));

    return NextResponse.json({
        success: true,
        reviews: reviewsResult,
    });
}

export default GET;
