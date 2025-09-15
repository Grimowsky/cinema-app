import { relations } from "drizzle-orm";
import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { moviesSchema } from "./movies.schema";

export const directorsSchema = pgTable("directors", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  surname: text().notNull(),
});

export const directorsRelations = relations(directorsSchema, ({ many }) => ({
  movies: many(moviesSchema),
}));
