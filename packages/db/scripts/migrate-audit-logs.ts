import { config } from "dotenv";
import { resolve } from "node:path";
config({ path: resolve(process.cwd(), ".env") });

import { db } from "../src/index";
import { sql } from "drizzle-orm";

async function main() {
  console.log("Creating audit_logs table and indexes in Neon DB...");

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "audit_logs" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "entity_type" varchar(50) NOT NULL,
      "entity_id" varchar(100) NOT NULL,
      "action" varchar(50) NOT NULL,
      "actor_email" varchar(255),
      "actor_role" varchar(50) DEFAULT 'system' NOT NULL,
      "metadata" jsonb,
      "created_at" timestamp with time zone DEFAULT now() NOT NULL
    );
  `);

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "audit_logs_entity_idx" ON "audit_logs" ("entity_type", "entity_id");
  `);
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "audit_logs_action_idx" ON "audit_logs" ("action");
  `);
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "audit_logs_created_at_idx" ON "audit_logs" ("created_at");
  `);
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "audit_logs_actor_idx" ON "audit_logs" ("actor_email");
  `);

  console.log("✓ audit_logs table and indexes created successfully!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Migration error:", err);
  process.exit(1);
});
