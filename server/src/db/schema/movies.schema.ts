import { relations } from "drizzle-orm";
import { date, integer, pgTable, real, text } from "drizzle-orm/pg-core";
import { actorsToMovies } from "./actors.schema";
import { directorsSchema } from "./directors.schema";
import { genresToMovies } from "./genres.schema";

export const moviesSchema = pgTable("movies", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: text().notNull(),
  description: text().notNull(),
  durationSeconds: integer("duration_seconds").notNull(),
  premiereDate: date("premiere_date").notNull(),
  rating: real().notNull(),
  directorId: integer().notNull(),
});

export const moviesRelations = relations(moviesSchema, ({ one, many }) => ({
  director: one(directorsSchema, {
    relationName: "movies_director",
    fields: [moviesSchema.directorId],
    references: [directorsSchema.id],
  }),
  cast: many(actorsToMovies),
  genresToMovies: many(genresToMovies),
}));
