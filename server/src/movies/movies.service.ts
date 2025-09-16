import { Inject, Injectable } from "@nestjs/common";
import { DrizzleDB } from "src/db/drizzle.module";
import { DrizzleSchema } from "../db/types/drizzle.type";
import * as schema from "../db/schema";

@Injectable()
export class MoviesService {
  constructor(@Inject(DrizzleDB) private db: DrizzleSchema) {}

  getAllMovies() {
    return this.db.select().from(schema.moviesSchema);
  }
}
