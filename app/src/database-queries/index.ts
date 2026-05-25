import { createHash } from "node:crypto";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import { alternativesTable, questionsTable, usersTable } from "../db/schema";
import type { QuizQuestion } from "../definitions";
import type { CreateAccountInput, SignInInput } from "../validation/auth";

const db = drizzle({
  connection: process.env.DATABASE_URL!,
  casing: "snake_case",
});

function hashPassword(password: string) {
  return createHash("sha256").update(password).digest("hex");
}

export async function createUser(input: CreateAccountInput) {
  const existingUser = await db
    .select({ id: usersTable.id })
    .from(usersTable)
    .where(eq(usersTable.email, input.email))
    .limit(1);

  if (existingUser.length > 0) {
    return {
      ok: false as const,
      field: "email" as const,
      message: "An account with this email already exists.",
    };
  }

  const [user] = await db
    .insert(usersTable)
    .values({
      name: input.name,
      email: input.email,
      password: hashPassword(input.password),
      isAdmin: input.isAdmin,
    })
    .returning({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
      isAdmin: usersTable.isAdmin,
    });

  return { ok: true as const, user };
}

export async function signInUser(input: SignInInput) {
  const [user] = await db
    .select({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
      isAdmin: usersTable.isAdmin,
    })
    .from(usersTable)
    .where(
      and(
        eq(usersTable.name, input.name),
        eq(usersTable.password, hashPassword(input.password)),
        eq(usersTable.isAdmin, input.isAdmin),
      ),
    )
    .limit(1);

  if (!user) {
    return {
      ok: false as const,
      message: "No matching account found.",
    };
  }

  return { ok: true as const, user };
}

export async function getQuizQuestions(): Promise<QuizQuestion[]> {
  const rows = await db
    .select({
      questionId: questionsTable.id,
      title: questionsTable.title,
      alternativeId: alternativesTable.id,
      description: alternativesTable.description,
      passes: alternativesTable.passes,
    })
    .from(questionsTable)
    .innerJoin(
      alternativesTable,
      eq(alternativesTable.idQuestion, questionsTable.id),
    )
    .where(eq(questionsTable.active, true))
    .orderBy(questionsTable.id, alternativesTable.id);

  const questionsById = new Map<number, QuizQuestion>();

  for (const row of rows) {
    const question =
      questionsById.get(row.questionId) ??
      ({
        id: row.questionId,
        title: row.title,
        alternatives: [],
      } satisfies QuizQuestion);

    question.alternatives.push({
      id: row.alternativeId,
      description: row.description,
      isCorrect: row.passes > 0,
    });

    questionsById.set(row.questionId, question);
  }

  return Array.from(questionsById.values());
}
