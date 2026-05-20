import { integer, pgTable, varchar, boolean, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar( { length: 200 }).notNull(),
    email: varchar( { length: 255 }).notNull(),
});

export const testsTable = pgTable("tests", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    date: timestamp().notNull(),
    idUser: integer().references(() => usersTable.id),
});

export const questionsTable = pgTable("questions", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: varchar( { length: 150 }).notNull(),
    active: boolean().notNull(),
});

export const alternativesTable = pgTable("alternatives", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    description: varchar( { length: 150 }).notNull(),
    idQuestion: integer().references(() => questionsTable.id),
    points: integer().notNull(),
});

export const answersTable = pgTable("answers", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    idAlternative: integer().notNull().references(() => alternativesTable.id),
    idTest: integer().notNull().references(() => testsTable.id),
    passed: boolean().notNull(),
});
