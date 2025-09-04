import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import "dotenv/config";
import { DrizzleSchema } from "./types/drizzle.type";
import * as schema from "./schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema }) as DrizzleSchema;

async function main() {
  await db.insert(schema.usersTable).values({
    name: "john",
  });
}

main()
  .then()
  .catch((e) => {
    console.log(e);
  });
