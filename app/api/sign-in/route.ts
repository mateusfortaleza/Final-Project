import { NextResponse } from "next/server";
import { signInUser } from "@/app/src/database-queries";
import { signInSchema } from "@/app/src/validation/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const result = signInSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        message: "Invalid sign-in details.",
        errors: result.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const signedInUser = await signInUser(result.data);

  if (!signedInUser.ok) {
    return NextResponse.json(
      { message: signedInUser.message },
      { status: 401 },
    );
  }

  return NextResponse.json({
    message: "Signed in.",
    user: signedInUser.user,
  });
}
