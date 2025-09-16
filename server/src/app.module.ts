import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DrizzleModule } from "./db/drizzle.module";
import { MoviesModule } from "./movies/movies.module";

@Module({
  imports: [DrizzleModule, MoviesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
