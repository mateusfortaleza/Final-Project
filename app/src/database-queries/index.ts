import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { alternativesTable, questionsTable } from "../db/schema";
import type { QuizQuestion } from "../definitions";

const db = drizzle({
  connection: process.env.DATABASE_URL!,
  casing: "snake_case",
});

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
