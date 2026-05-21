import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import {
  alternativesTable,
  answersTable,
  questionsTable,
  testsTable,
} from "./schema";
import { inArray } from "drizzle-orm";

const db = drizzle({
  connection: process.env.DATABASE_URL!,
  casing: "snake_case",
});

const questionSeeds = [
  {
    title: "What does HTML stand for?",
    alternatives: [
      { description: "HyperText Markup Language", passes: 10 },
      { description: "HighText Machine Language", passes: 0 },
      { description: "HyperTool Multi Language", passes: 0 },
      { description: "HomeText Markup Links", passes: 0 },
    ],
  },
  {
    title: "Which keyword declares a constant in JavaScript?",
    alternatives: [
      { description: "const", passes: 10 },
      { description: "var", passes: 0 },
      { description: "let", passes: 0 },
      { description: "static", passes: 0 },
    ],
  },
  {
    title: "Which SQL command reads rows from a table?",
    alternatives: [
      { description: "SELECT", passes: 10 },
      { description: "INSERT", passes: 0 },
      { description: "UPDATE", passes: 0 },
      { description: "DELETE", passes: 0 },
    ],
  },
  {
    title: "Which HTTP status code means Not Found?",
    alternatives: [
      { description: "404", passes: 10 },
      { description: "200", passes: 0 },
      { description: "301", passes: 0 },
      { description: "500", passes: 0 },
    ],
  },
  {
    title: "Which CSS property changes text color?",
    alternatives: [
      { description: "color", passes: 10 },
      { description: "font-style", passes: 0 },
      { description: "background", passes: 0 },
      { description: "text-size", passes: 0 },
    ],
  },
  {
    title: "Which React hook stores component state?",
    alternatives: [
      { description: "useState", passes: 10 },
      { description: "useEffect", passes: 0 },
      { description: "useMemo", passes: 0 },
      { description: "useRef", passes: 0 },
    ],
  },
  {
    title: "Which command creates a new Git commit?",
    alternatives: [
      { description: "git commit", passes: 10 },
      { description: "git push", passes: 0 },
      { description: "git pull", passes: 0 },
      { description: "git clone", passes: 0 },
    ],
  },
  {
    title: "Which data type stores true or false?",
    alternatives: [
      { description: "boolean", passes: 10 },
      { description: "string", passes: 0 },
      { description: "integer", passes: 0 },
      { description: "array", passes: 0 },
    ],
  },
  {
    title: "Which tag creates a link in HTML?",
    alternatives: [
      { description: "<a>", passes: 10 },
      { description: "<p>", passes: 0 },
      { description: "<img>", passes: 0 },
      { description: "<section>", passes: 0 },
    ],
  },
  {
    title: "Which operator compares value and type in JavaScript?",
    alternatives: [
      { description: "===", passes: 10 },
      { description: "==", passes: 0 },
      { description: "=", passes: 0 },
      { description: "!=", passes: 0 },
    ],
  },
];

const testDates = [
  new Date("2026-05-20T12:00:00.000Z"),
  new Date("2026-05-20T13:00:00.000Z"),
];

async function deleteExistingSeedData() {
  const seedQuestions = await db
    .select({ id: questionsTable.id })
    .from(questionsTable)
    .where(
      inArray(
        questionsTable.title,
        questionSeeds.map(({ title }) => title),
      ),
    );

  const questionIds = seedQuestions.map(({ id }) => id);

  const seedAlternatives = questionIds.length
    ? await db
        .select({ id: alternativesTable.id })
        .from(alternativesTable)
        .where(inArray(alternativesTable.idQuestion, questionIds))
    : [];

  const alternativeIds = seedAlternatives.map(({ id }) => id);

  const seedTests = await db
    .select({ id: testsTable.id })
    .from(testsTable)
    .where(inArray(testsTable.date, testDates));

  const testIds = seedTests.map(({ id }) => id);

  if (alternativeIds.length) {
    await db
      .delete(answersTable)
      .where(inArray(answersTable.idAlternative, alternativeIds));
  }

  if (testIds.length) {
    await db.delete(answersTable).where(inArray(answersTable.idTest, testIds));
  }

  if (alternativeIds.length) {
    await db
      .delete(alternativesTable)
      .where(inArray(alternativesTable.id, alternativeIds));
  }

  if (testIds.length) {
    await db.delete(testsTable).where(inArray(testsTable.id, testIds));
  }

  if (questionIds.length) {
    await db
      .delete(questionsTable)
      .where(inArray(questionsTable.id, questionIds));
  }
}

async function seed() {
  await deleteExistingSeedData();

  const questions = await db
    .insert(questionsTable)
    .values(questionSeeds.map(({ title }) => ({ title })))
    .returning();

  const alternatives = await db
    .insert(alternativesTable)
    .values(
      questionSeeds.flatMap((question, index) =>
        question.alternatives.map((alternative) => ({
          ...alternative,
          idQuestion: questions[index].id,
        })),
      ),
    )
    .returning();

  const tests = await db
    .insert(testsTable)
    .values(testDates.map((date) => ({ date })))
    .returning();

  await db.insert(answersTable).values([
    {
      idAlternative: alternatives[0].id,
      idTest: tests[0].id,
      points: true,
    },
    {
      idAlternative: alternatives[5].id,
      idTest: tests[0].id,
      points: false,
    },
    {
      idAlternative: alternatives[8].id,
      idTest: tests[1].id,
      points: true,
    },
  ]);
}

seed()
  .then(() => {
    console.log("Seed completed.");
  })
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });
