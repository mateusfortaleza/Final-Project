import  "dotenv/config"
import { drizzle } from "drizzle-orm/neon-http";
import { usersTable } from "../db/schema";

const db = drizzle(process.env.DATABASE_URL!);

export async function getUsers() {
    return await db.select().from(usersTable);
}

console.log(await getUsers());