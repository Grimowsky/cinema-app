import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import "dotenv/config";
import { DrizzleSchema } from "./types/drizzle.type";
import * as schema from "./schema";
import { seed, reset } from "drizzle-seed";
import { getMovies, imdbSelectors } from "./imdb";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  user: "postgres",
});

const db = drizzle(pool, { schema }) as DrizzleSchema;

async function main() {
  await reset(db, schema);

  //get movies
  console.log("@@ getting movies from imdb db");

  const movies = await getMovies();

  console.log("@@@", movies.length);

  const genres = imdbSelectors.getGenres(movies);
  const titles = imdbSelectors.getTitles(movies);
  const ratings = imdbSelectors.getRating(movies.length);
  const descriptions = imdbSelectors.getDescription(movies);
  const runtime = imdbSelectors.getRuntime(movies.length);
  const premiere = imdbSelectors.premiereDate(movies.length);

  console.log("✅ data from imdb completed!");

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
      count: genres.length,
    },
    moviesSchema: {
      columns: {
        title: f.valuesFromArray({ values: [...titles], isUnique: true }),
        description: f.valuesFromArray({
          values: [...descriptions],
          isUnique: true,
        }),
        rating: f.valuesFromArray({ values: [...ratings] }),
        durationSeconds: f.valuesFromArray({ values: [...runtime] }),
        premiereDate: f.valuesFromArray({ values: [...premiere] }),
      },
      count: movies.length,
    },
    genresToMovies: {
      count: 50,
    },
    actorsToMovies: {
      count: 100,
    },
  }));

  console.log("✅ Seed completed!");
}

main()
  .then()
  .catch((e) => {
    console.log(e);
  });
