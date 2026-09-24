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
  console.log("Applying eSIM orders schema and transfer booking options to database...");

  // 1. Create eSIM status enum if not exists
  await sql.unsafe(`
    DO $$ BEGIN
      CREATE TYPE "public"."esim_status" AS ENUM('pending', 'confirmed', 'delivered', 'cancelled');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `);
  console.log("✓ esim_status enum checked/created");

  // 2. Create esim_orders table if not exists
  await sql.unsafe(`
    CREATE TABLE IF NOT EXISTS "esim_orders" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "order_number" varchar(32) NOT NULL,
      "user_id" text,
      "customer_name" varchar(200) NOT NULL,
      "email" varchar(255) NOT NULL,
      "phone" varchar(50) NOT NULL,
      "plan_id" varchar(50) NOT NULL,
      "plan_name" varchar(100) NOT NULL,
      "data_amount_gb" integer NOT NULL,
      "duration_days" integer NOT NULL,
      "price_usd" numeric(10, 2) NOT NULL,
      "currency" varchar(10) DEFAULT 'USD' NOT NULL,
      "device_model" varchar(100),
      "arrival_date" date,
      "status" "esim_status" DEFAULT 'pending' NOT NULL,
      "payment_method" varchar(30) DEFAULT 'online' NOT NULL,
      "payment_status" varchar(30) DEFAULT 'pending' NOT NULL,
      "qr_code_url" text,
      "activation_notes" text,
      "admin_notes" text,
      "created_at" timestamp with time zone DEFAULT now() NOT NULL,
      "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
      CONSTRAINT "esim_orders_order_number_unique" UNIQUE("order_number")
    );

    DO $$ BEGIN
      ALTER TABLE "esim_orders" ADD CONSTRAINT "esim_orders_user_id_users_id_fk" 
      FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "esim_orders" ADD COLUMN "cost_price_usd" numeric(10, 2);
    EXCEPTION
      WHEN duplicate_column THEN null;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "esim_orders" ADD COLUMN "commission_usd" numeric(10, 2);
    EXCEPTION
      WHEN duplicate_column THEN null;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "esim_orders" ADD COLUMN "payriff_order_id" varchar(100);
    EXCEPTION
      WHEN duplicate_column THEN null;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "esim_orders" ADD COLUMN "payriff_session_id" varchar(100);
    EXCEPTION
      WHEN duplicate_column THEN null;
    END $$;


    CREATE INDEX IF NOT EXISTS "esim_orders_status_idx" ON "esim_orders" USING btree ("status");
    CREATE INDEX IF NOT EXISTS "esim_orders_email_idx" ON "esim_orders" USING btree ("email");
    CREATE UNIQUE INDEX IF NOT EXISTS "esim_orders_num_idx" ON "esim_orders" USING btree ("order_number");
  `);
  console.log("✓ esim_orders table and indexes checked/created");

  // 3. Add female_driver and additional_guide to transfer_bookings
  await sql.unsafe(`
    DO $$ BEGIN
      ALTER TABLE "transfer_bookings" ADD COLUMN "female_driver" boolean DEFAULT false;
    EXCEPTION
      WHEN duplicate_column THEN null;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "transfer_bookings" ADD COLUMN "additional_guide" boolean DEFAULT false;
    EXCEPTION
      WHEN duplicate_column THEN null;
    END $$;
  `);
  console.log("✓ transfer_bookings columns checked/added");

  console.log("Database schema successfully synchronized!");
  await sql.end();
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
