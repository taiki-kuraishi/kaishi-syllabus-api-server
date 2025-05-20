import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export const drizzleClient = (database_url: string) => {
  const client = postgres(database_url, { prepare: false });
  return drizzle(client);
};

export type DrizzleClient = ReturnType<typeof drizzleClient>;
