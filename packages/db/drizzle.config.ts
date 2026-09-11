import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";
import { resolve } from "node:path";

// Load .env from the monorepo root (two levels up from packages/db)
config({ path: resolve(process.cwd(), "../../.env") });

if (!process.env["DATABASE_URL"]) {
  throw new Error(
    "[packages/db] DATABASE_URL is not set.\n" +
    "  → Copy .env.example → .env at the monorepo root and fill in DATABASE_URL."
  );
}

export default defineConfig({
  schema:    "./src/schema.ts",
  out:       "./drizzle",        // Generated SQL migrations land here
  dialect:   "postgresql",
  dbCredentials: {
    url: process.env["DATABASE_URL"],
  },
  // Print verbose SQL in logs during generation
  verbose: true,
  strict:  true,
});
