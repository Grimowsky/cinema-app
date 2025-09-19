import { Controller, Get, Query } from "@nestjs/common";
import { MoviesService } from "./movies.service";

@Controller("movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(@Query("genre") genre?: string): Promise<unknown[]> {
    return this.moviesService.getAllMovies(genre);
  }
}
