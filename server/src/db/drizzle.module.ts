import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Pool } from "pg";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";

export const DrizzleDB = Symbol("drizzle-connection");

import * as schema from "./schema";

@Module({
  providers: [
    {
      provide: DrizzleDB,
      inject: [ConfigService],
      useFactory: () => {
        const pool = new Pool({
          connectionString: process.env.DATABASE_URL!,
        });
        return drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;
      },
    },
  ],
  exports: [DrizzleDB],
})
export class DrizzleModule {}
