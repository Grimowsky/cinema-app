import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import "dotenv/config";
import { DrizzleSchema } from "./types/drizzle.type";
import * as schema from "./schema";
import { seed, reset } from "drizzle-seed";
import { faker } from "@faker-js/faker";
import { Genre } from "./schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  user: "postgres",
});

const genres = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi"] as const;

const db = drizzle(pool, { schema }) as DrizzleSchema;

async function main() {
  await reset(db, schema);

  await seed(db, schema).refine((f) => ({
    directorsSchema: {
      count: 50,
    },
    actorsSchema: {
      count: 500,
    },
    genreSchema: {
      columns: {
        genre: f.valuesFromArray({ values: [...genres], isUnique: true }),
      },
      count: 5,
    },
    moviesSchema: {
      title: faker.commerce.productName(),
      description: faker.lorem.paragraph(),
      durationMins: faker.number.int({ min: 80, max: 200 }),
      rating: faker.number.int({ min: 1, max: 10 }),
      premiereDate: faker.date.past({ years: 20 }),
    },
  }));

  console.log("✅ Seed completed!");
}

main()
  .then()
  .catch((e) => {
    console.log(e);
  });
