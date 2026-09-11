/**
 * @file index.ts
 * @description Public API for @travel/db.
 *
 * Consumers import from "@travel/db":
 *   import { db } from "@travel/db";
 *   import { packages, destinations } from "@travel/db/schema";
 */

// Database client
export { db } from "./client";
export type { Database } from "./client";

// Full schema — tables, relations, enums, and inferred types
export * from "./schema";
