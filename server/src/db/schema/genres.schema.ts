import { relations } from "drizzle-orm";
import { pgTable, integer, primaryKey, text } from "drizzle-orm/pg-core";
import { moviesSchema } from "./movies.schema";

export const genreSchema = pgTable("genres", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  genre: text().notNull(),
});

export const genreRelations = relations(genreSchema, ({ many }) => ({
  genreToMovies: many(genresToMovies),
}));

export const genresToMovies = pgTable(
  "genres_to_movies",
  {
    movieId: integer("movie_id")
      .notNull()
      .references(() => moviesSchema.id),
    genreId: integer("genre_id")
      .notNull()
      .references(() => genreSchema.id),
  },
  (t) => [primaryKey({ columns: [t.movieId, t.genreId] })],
);
