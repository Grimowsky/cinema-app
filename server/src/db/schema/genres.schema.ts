import { relations } from "drizzle-orm";
import { pgTable, integer, primaryKey, pgEnum } from "drizzle-orm/pg-core";
import { moviesSchema } from "./movies.schema";

export const genreEnum = pgEnum("genre", [
  "Action",
  "Comedy",
  "Drama",
  "Horror",
  "Sci-Fi",
]);

export type Genre = (typeof genreEnum.enumValues)[number];

export const genreSchema = pgTable("genres", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  genre: genreEnum().notNull(),
});

export const genreRelations = relations(genreSchema, ({ many }) => ({
  genreToMovies: many(genresToMovies),
}));

export const genresToMovies = pgTable(
  "genres_to_movies",
  {
    movieId: integer()
      .notNull()
      .references(() => moviesSchema.id),
    genreId: integer()
      .notNull()
      .references(() => genreSchema.id),
  },
  (t) => [primaryKey({ columns: [t.movieId, t.genreId] })],
);
