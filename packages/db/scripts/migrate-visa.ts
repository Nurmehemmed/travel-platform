import { config } from "dotenv";
import { resolve } from "node:path";
config({ path: resolve(process.cwd(), ".env") });

import { db } from "../src/index";
import { sql } from "drizzle-orm";

async function main() {
  console.log("Creating visa types and table in Neon DB...");

  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."visa_type" AS ENUM('standard', 'urgent');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `);

  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."visa_status" AS ENUM('received', 'submitted_to_govt', 'approved', 'rejected');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "visa_applications" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "application_number" varchar(32) NOT NULL,
      "user_id" text REFERENCES "public"."users"("id") ON DELETE set null,
      "visa_type" "visa_type" DEFAULT 'standard' NOT NULL,
      "status" "visa_status" DEFAULT 'received' NOT NULL,
      "nationality" varchar(100) NOT NULL,
      "passport_type" varchar(50) DEFAULT 'Ordinary passport' NOT NULL,
      "arrival_date" date NOT NULL,
      "purpose_of_visit" varchar(100) DEFAULT 'Tourism' NOT NULL,
      "stay_address" text NOT NULL,
      "surname" varchar(100) NOT NULL,
      "given_names" varchar(150) NOT NULL,
      "gender" varchar(20) NOT NULL,
      "birth_date" date NOT NULL,
      "birth_country" varchar(100) NOT NULL,
      "birth_place" varchar(100) NOT NULL,
      "occupation" varchar(150) NOT NULL,
      "phone_number" varchar(50) NOT NULL,
      "email" varchar(255) NOT NULL,
      "residential_address" text NOT NULL,
      "passport_number" varchar(50) NOT NULL,
      "passport_issue_date" date NOT NULL,
      "passport_expiry_date" date NOT NULL,
      "passport_scan_url" text,
      "photo_url" text,
      "gov_fee" numeric(10, 2) NOT NULL,
      "service_fee" numeric(10, 2) NOT NULL,
      "total_amount" numeric(10, 2) NOT NULL,
      "payment_status" varchar(30) DEFAULT 'paid' NOT NULL,
      "asan_application_id" varchar(100),
      "evisa_pdf_url" text,
      "admin_notes" text,
      "created_at" timestamp with time zone DEFAULT now() NOT NULL,
      "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
      CONSTRAINT "visa_applications_application_number_unique" UNIQUE("application_number")
    );
  `);

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "visa_apps_status_idx" ON "visa_applications" ("status");
  `);
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "visa_apps_user_idx" ON "visa_applications" ("user_id");
  `);
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "visa_apps_email_idx" ON "visa_applications" ("email");
  `);
  await db.execute(sql`
    CREATE UNIQUE INDEX IF NOT EXISTS "visa_apps_app_num_idx" ON "visa_applications" ("application_number");
  `);

  console.log("✓ Visa subsystem database migration completed successfully!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Migration error:", err);
  process.exit(1);
});
