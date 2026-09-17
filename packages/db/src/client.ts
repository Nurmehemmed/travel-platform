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

// `max: 5` provides headroom for concurrent queries and transactions in serverless environments.
const maxConnections = process.env.DB_MAX_CONNECTIONS ? Number(process.env.DB_MAX_CONNECTIONS) : 5;

const queryClient =
  globalForDb.conn ??
  postgres(connectionString, {
    max: maxConnections,
    idle_timeout: 20,
    connect_timeout: 8,
  });

globalForDb.conn = queryClient;

export const db = drizzle(queryClient, { schema });
export type Database = typeof db;
