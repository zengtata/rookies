// /api/change-password/route.ts
import { NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { compare, hash } from "bcryptjs";
import { auth } from "@/auth";

export async function POST(request: Request) {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  if (!session.user?.email) {
    return NextResponse.json({
      success: false,
      error: "User Email is missing",
    });
  }

  const { oldPassword, newPassword } = await request.json();

  // Fetch the user
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, session.user.email))
    .limit(1);
  if (!user) {
    return NextResponse.json({ success: false, error: "User not found" });
  }

  // Compare the old password
  const isValid = await compare(oldPassword, user.password);
  if (!isValid) {
    return NextResponse.json({
      success: false,
      error: "Old password is incorrect",
    });
  }

  // Hash the new password
  const hashedNewPassword = await hash(newPassword, 10);
  await db
    .update(users)
    .set({ password: hashedNewPassword })
    .where(eq(users.email, session.user.email));

  return NextResponse.json({ success: true });
}
