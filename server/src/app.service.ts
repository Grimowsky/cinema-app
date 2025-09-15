import { Injectable, Inject } from "@nestjs/common";
import { DrizzleSchema } from "./db/types/drizzle.type";
import { DrizzleDB } from "./db/drizzle.module";

@Injectable()
export class AppService {
  constructor(@Inject(DrizzleDB) private db: DrizzleSchema) {}

  async getHello() {}
}
