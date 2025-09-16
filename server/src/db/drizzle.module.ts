import { Global, Module } from "@nestjs/common";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { Pool } from "pg";

export const DrizzleDB = Symbol("drizzle-connection");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  user: "postgres",
});

@Global()
@Module({
  providers: [
    {
      provide: DrizzleDB,
      useFactory: () => {
        return drizzle({
          client: pool,
          schema: schema,
          casing: "snake_case",
        }) as NodePgDatabase<typeof schema>;
      },
    },
  ],
  exports: [DrizzleDB],
})
export class DrizzleModule {}
