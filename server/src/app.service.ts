import { Injectable, Inject } from "@nestjs/common";
import { DrizzleSchema } from "./db/types/drizzle.type";
import { DrizzleDB } from "./db/drizzle.module";
import { usersTable } from "./db/schema";

type Users = typeof usersTable.$inferSelect;

@Injectable()
export class AppService {
  constructor(@Inject(DrizzleDB) private db: DrizzleSchema) {}

  async getHello(): Promise<Users[]> {
    const users = await this.db.query.usersTable.findMany();

    return users;
  }
}
