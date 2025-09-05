import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";

export const DrizzleDB = Symbol("drizzle-connection");

import * as schema from "./schema";

@Module({
  providers: [
    {
      provide: DrizzleDB,
      inject: [ConfigService],
      useFactory: () => {
        return drizzle({
          connection: process.env.DATABASE_URL!,
          schema: schema,
          casing: "snake_case",
        }) as NodePgDatabase<typeof schema>;
      },
    },
  ],
  exports: [DrizzleDB],
})
export class DrizzleModule {}
