import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

/**
 * Singleton Postgres connection pool via postgres.js.
 *
 * In Next.js we rely on Node's module cache for the singleton pattern.
 * For serverless/edge environments (Neon, Supabase), set max: 1 to avoid
 * connection exhaustion in stateless Lambda-style deployments.
 */

const connectionString =
  process.env["DATABASE_URL"] ||
  "postgresql://postgres:postgres@localhost:5432/travel_db";

// Singleton pattern with globalThis prevents connection exhaustion during Next.js dev HMR
const globalForDb = globalThis as unknown as {
  conn?: postgres.Sql;
};

// `max: 1` is safe for serverless Lambdas.
const queryClient =
  globalForDb.conn ??
  postgres(connectionString, {
    max: 1,
    idle_timeout: 20,
    connect_timeout: 10,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.conn = queryClient;
}

export const db = drizzle(queryClient, { schema });
export type Database = typeof db;
