import { relations } from "drizzle-orm";
import { pgTable, integer, text, primaryKey } from "drizzle-orm/pg-core";
import { moviesSchema } from "./movies.schema";

export const actorsSchema = pgTable("actors", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  surname: text().notNull(),
});

export const actorsRelations = relations(actorsSchema, ({ many }) => ({
  actorsToMovies: many(actorsToMovies),
}));

export const actorsToMovies = pgTable(
  "actors_to_movies",
  {
    movieId: integer()
      .notNull()
      .references(() => moviesSchema.id),
    actorId: integer()
      .notNull()
      .references(() => actorsSchema.id),
  },
  (t) => [primaryKey({ columns: [t.movieId, t.actorId] })],
);
