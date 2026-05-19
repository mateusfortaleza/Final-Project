import { integer, pgTable, varchar, boolean, serial } from "drizzle-orm/pg-core";

export const questionsTable = pgTable("questions", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: varchar({length: 150}).notNull(),
    active: boolean().notNull(),
})

export const alternativesTable = pgTable("alternatives", {
    id: serial().primaryKey(),
    description: varchar({length: 150}).notNull(),
    id_questions: integer().references(() => questionsTable.id),

})

export const answersTable = pgTable("answers", {
    id_test: serial().primaryKey().notNull(),
    id_question: integer().notNull(),
    id_alternative: integer().notNull(),
    point: integer().notNull(),
})

export const usersTable = pgTable("users", {
    id: serial().primaryKey().notNull(),
    name: varchar({length: 200}).notNull(),
    email: varchar({length: 255}).notNull(),
})

