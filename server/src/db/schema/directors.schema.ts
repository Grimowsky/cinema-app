import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const directorsSchema = pgTable("directors", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  surname: text().notNull(),
});
