import { Inject, Injectable } from "@nestjs/common";
import { DrizzleDB } from "src/db/drizzle.module";
import * as schema from "../db/schema";
import { DrizzleSchema } from "../db/types/drizzle.type";
import { eq, sql } from "drizzle-orm";

const { moviesSchema, genresToMovies, directorsSchema, genreSchema } = schema;

@Injectable()
export class MoviesService {
  constructor(@Inject(DrizzleDB) private db: DrizzleSchema) {}

  async getAllMovies(genre?: string) {
    const movies = await this.db.query.moviesSchema.findMany({
      with: {
        director: true,
        genresToMovies: {
          columns: {},
          with: {
            genre: true,
          },
        },
        cast: {
          with: {
            actor: true,
          },
        },
      },
    });

    return movies.map(({ genresToMovies, ...restMovie }) => {
      return { ...restMovie, genres: genresToMovies.map((g) => g.genre) };
    });
    // const movies = await this.db
    //   .select({
    //     id: moviesSchema.id,
    //     title: moviesSchema.title,
    //     description: moviesSchema.description,
    //     durationSeconds: moviesSchema.durationSeconds,
    //     premiereDate: moviesSchema.premiereDate,
    //     rating: moviesSchema.rating,
    //     genres: sql`COALESCE(
    //      array_agg(json_build_object('name', ${genreSchema.genre}))
    //       FILTER (WHERE ${genreSchema.id} IS NOT NULL), '{}')`,
    //     director: sql`json_build_object(
    //       'id', ${directorsSchema.id},
    //       'name', ${directorsSchema.name},
    //       'surname', ${directorsSchema.surname})`,
    //   })
    //   .from(moviesSchema)
    //   .leftJoin(genresToMovies, eq(moviesSchema.id, genresToMovies.movieId))
    //   .leftJoin(genreSchema, eq(genresToMovies.genreId, genreSchema.id))
    //   .leftJoin(
    //     directorsSchema,
    //     eq(moviesSchema.directorId, directorsSchema.id),
    //   )
    //   .groupBy(moviesSchema.id, directorsSchema.id)
    //   .orderBy(moviesSchema.id);
  }
}
