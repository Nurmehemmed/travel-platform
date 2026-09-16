const postgres = require("postgres");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL not found in environment");
  process.exit(1);
}

const sql = postgres(connectionString, { max: 1 });

async function main() {
  console.log("Creating custom_itineraries table and indexes in Neon PostgreSQL...");

  await sql.unsafe(`
    CREATE TABLE IF NOT EXISTS "custom_itineraries" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "reference_code" varchar(32) NOT NULL,
      "user_id" text,
      "traveler_name" varchar(200) NOT NULL,
      "email" varchar(255) NOT NULL,
      "phone_number" varchar(50) NOT NULL,
      "duration_days" integer DEFAULT 5 NOT NULL,
      "arrival_date" date NOT NULL,
      "adults" integer DEFAULT 2 NOT NULL,
      "children" integer DEFAULT 0 NOT NULL,
      "hotel_tier" varchar(100) NOT NULL,
      "vehicle_class" varchar(100) NOT NULL,
      "destinations" jsonb NOT NULL,
      "estimated_price_usd" numeric(10, 2) NOT NULL,
      "currency" varchar(10) DEFAULT 'USD' NOT NULL,
      "special_requests" text,
      "status" varchar(30) DEFAULT 'pending' NOT NULL,
      "admin_notes" text,
      "created_at" timestamp with time zone DEFAULT now() NOT NULL,
      "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
      CONSTRAINT "custom_itineraries_reference_code_unique" UNIQUE("reference_code")
    );

    DO $$ BEGIN
      ALTER TABLE "custom_itineraries" ADD CONSTRAINT "custom_itineraries_user_id_users_id_fk" 
      FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    CREATE INDEX IF NOT EXISTS "custom_itin_status_idx" ON "custom_itineraries" USING btree ("status");
    CREATE INDEX IF NOT EXISTS "custom_itin_date_idx" ON "custom_itineraries" USING btree ("arrival_date");
    CREATE UNIQUE INDEX IF NOT EXISTS "custom_itin_ref_idx" ON "custom_itineraries" USING btree ("reference_code");
  `);

  console.log("Successfully created custom_itineraries table and indexes in Neon PostgreSQL!");
  await sql.end();
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
