import { NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { compare, hash } from "bcryptjs";
import { auth } from "@/auth";
import { z } from "zod";
import {toast} from "@/hooks/use-toast";

const passwordSchema = z.string().min(8).refine(
    (val) => /[a-z]/.test(val) && /[A-Z]/.test(val),
    {
      message: "Password must contain at least one uppercase and one lowercase letter.",
    }
);

export async function POST(request: Request) {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
    );
  }

  if (!session.user?.email) {
    return NextResponse.json({
      success: false,
      error: "User Email is missing",
    });
  }

  const { oldPassword, newPassword } = await request.json();

  const parsedPassword = passwordSchema.safeParse(newPassword);
  if (!parsedPassword.success) {
    return NextResponse.json(
        { success: false, error: parsedPassword.error.errors[0].message },
        { status: 400 }
    );
  }

  const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, session.user.email))
      .limit(1);
  if (!user) {
    return NextResponse.json({ success: false, error: "User not found" });
  }

  const isValid = await compare(oldPassword, user.password);
  if (!isValid) {
    return NextResponse.json({
      success: false,
      error: "Old password is incorrect",
    });
  }

  const hashedNewPassword = await hash(newPassword, 10);
  await db
      .update(users)
      .set({ password: hashedNewPassword })
      .where(eq(users.email, session.user.email));

  return NextResponse.json({ success: true });
}
