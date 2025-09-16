import { Controller, Get } from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { Movie } from "src/db/types/movies.type";

@Controller("movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  movies(): Promise<Movie[]> {
    return this.moviesService.getAllMovies();
  }
}
