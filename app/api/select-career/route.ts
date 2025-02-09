import { NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { userCareer } from "@/database/schema";
import { auth } from "@/auth";

export async function POST(request: Request) {
  const { careerId } = await request.json();

  // Get the user from the session
  const session = await auth();

  if (!session) return NextResponse.redirect("/sign-in");

  const user = session.user;

  if (!user?.id) {
    return NextResponse.json({
      success: false,
      error: "User ID is missing",
    });
  }

  try {
    // Insert the selected career into the user-career table
    await db.insert(userCareer).values({
      user_id: user.id, // `user.id` is now guaranteed to be a string
      career_id: careerId,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      error: "Failed to store career choice",
    });
  }
}
