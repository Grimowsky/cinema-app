import * as schema from "../schema";

export type Movie = typeof schema.moviesSchema.$inferSelect;
