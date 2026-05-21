import  "dotenv/config"
import { drizzle } from "drizzle-orm/neon-http";
import { usersTable } from "../db/schema";

const db = drizzle({connection: process.env.DATABASE_URL!, casing: "snake_case"});

export async function getTableRows(table: any) {
    return await db.select().from(table)
}

export async function insertIntoTable(table: any, ...values: any[]) {
    return await db.insert(table).values(values)
}

console.log(getTableRows(usersTable))