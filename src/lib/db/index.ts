import "server-only";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schemas/companies-schema";

export * from "./schemas/companies-schema";

const connectionString = process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error("POSTGRES_URL is not set");
}

const globalForDb = globalThis as unknown as {
  postgresClient: ReturnType<typeof postgres> | undefined;
};

const client =
  globalForDb.postgresClient ??
  postgres(connectionString, {
    prepare: false,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.postgresClient = client;
}

export const db = drizzle(client, { schema });
