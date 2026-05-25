import { NextResponse } from "next/server";
import { createUser } from "@/app/src/database-queries";
import { createAccountSchema } from "@/app/src/validation/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const result = createAccountSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        message: "Invalid account details.",
        errors: result.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const createdUser = await createUser(result.data);

  if (!createdUser.ok) {
    return NextResponse.json(
      {
        message: createdUser.message,
        errors: { [createdUser.field]: [createdUser.message] },
      },
      { status: 409 },
    );
  }

  return NextResponse.json({
    message: "Account created.",
    user: createdUser.user,
  });
}
