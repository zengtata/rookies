import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { users, quizAnswers, userProgress, userCareer } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function DELETE(request: Request) {
    const session = await auth();
    if (!session || !session.user) {
        return NextResponse.json({ success: false, error: "User not authenticated" }, { status: 401 });
    }

    const userId = session.user.id as string;
    try {
        await db.delete(quizAnswers).where(eq(quizAnswers.user_id, userId));

        await db.delete(userProgress).where(eq(userProgress.user_id, userId));

        await db.delete(userCareer).where(eq(userCareer.user_id, userId));

        await db.delete(users).where(eq(users.id, userId));

        return NextResponse.json({
            success: true,
            message: "user account deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting account:", error);
        return NextResponse.json({ success: false, error: "Failed to delete account" }, { status: 500 });
    }
}
