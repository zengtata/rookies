import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { userCareer, careers, careerMilestone, milestones } from "@/database/schema";
import { eq } from "drizzle-orm/expressions";
import { asc } from "drizzle-orm/expressions"; // Import the asc function

export async function GET() {
    const session = await auth();
    if (!session || !session.user) return NextResponse.redirect("/sign-in");

    const user = session.user;
    const userId = user.id as string;

    // Get the user's selected career from the user_career table
    const userCareerResult = await db
        .select()
        .from(userCareer)
        .where(eq(userCareer.user_id, userId))
        .limit(1);

    if (userCareerResult.length === 0) {
        return NextResponse.json({ success: false, error: "No career selected" });
    }
    const selectedCareerId = userCareerResult[0].career_id;

    // Fetch the career details from the careers table
    const careerResult = await db
        .select()
        .from(careers)
        .where(eq(careers.id, selectedCareerId))
        .limit(1);

    if (careerResult.length === 0) {
        return NextResponse.json({ success: false, error: "Career not found" });
    }
    const careerData = careerResult[0];

    // Fetch milestones for the career by joining careerMilestone and milestones,
    // ordered by the step_order field using the asc helper.
    const milestonesResult = await db
        .select({
            step_order: careerMilestone.step_order,
            milestone: milestones,
        })
        .from(careerMilestone)
        .innerJoin(milestones, eq(milestones.id, careerMilestone.milestone_id))
        .where(eq(careerMilestone.career_id, selectedCareerId))
        .orderBy(asc(careerMilestone.step_order));

    return NextResponse.json({
        success: true,
        career: careerData,
        milestones: milestonesResult,
    });
}

export default GET;
