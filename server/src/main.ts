import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { logger } from "./common/logger.middleware";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //global logging middleware
  app.use(logger);
  await app.listen(8080);
}
bootstrap();
