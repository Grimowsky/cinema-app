import { text, real, integer, pgTable, date } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { directorsSchema } from "./directors.schema";
import { actorsToMovies } from "./actors.schema";
import { genresToMovies } from "./genres.schema";

export const moviesSchema = pgTable("movies", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: text().notNull(),
  description: text().notNull(),
  durationSeconds: integer("duration_seconds").notNull(),
  premiereDate: date("premiere_date").notNull(),
  rating: real().notNull(),
  directorId: integer("director_id")
    .references(() => directorsSchema.id)
    .notNull(),
});

export const moviesRelations = relations(moviesSchema, ({ one, many }) => ({
  director: one(directorsSchema),
  genresToMovie: many(genresToMovies),
  cast: many(actorsToMovies),
}));
