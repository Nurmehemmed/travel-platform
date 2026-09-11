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

const connectionString = process.env["DATABASE_URL"];

if (!connectionString) {
  throw new Error(
    "[packages/db] DATABASE_URL environment variable is not set. " +
      "Copy .env.example → .env and configure your Postgres connection string."
  );
}

// `max: 1` is safe for serverless. Increase to ~10 for long-lived server processes.
const queryClient = postgres(connectionString, { max: 1 });

export const db = drizzle(queryClient, { schema });
export type Database = typeof db;
