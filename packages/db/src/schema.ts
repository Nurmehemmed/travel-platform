/**
 * @file schema.ts
 * @description Drizzle ORM schema for the Travel Platform.
 *
 * Table groups:
 *  1. Auth.js v5 Drizzle Adapter tables (MUST NOT be renamed/altered)
 *     - users, accounts, sessions, verification_tokens
 *
 *  2. Domain tables
 *     - destinations
 *     - packages
 *     - inclusions  (tag dictionary)
 *     - package_inclusions  (M:N pivot)
 *     - availability_slots  (departure inventory)
 *     - pricing_tiers
 *     - bookings
 *     - saved_packages  (user wishlist, M:N pivot)
 *     - reviews
 *     - visa_applications
 *     - transfer_bookings
 *
 * Drizzle `relations()` are defined after every group to enable
 * type-safe relational queries via db.query.*
 */

import { relations, sql } from "drizzle-orm";
import {
  boolean,
  date,
  index,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

// ─────────────────────────────────────────────────────────────────────────────
// Shared helpers
// ─────────────────────────────────────────────────────────────────────────────

/** Default server-side `now()` for created_at columns */
const createdAt = timestamp("created_at", { withTimezone: true })
  .notNull()
  .default(sql`now()`);

/** Pair of created_at + updated_at for mutable entities */
const timestamps = {
  createdAt,
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .default(sql`now()`)
    .$onUpdate(() => new Date()),
};

// ─────────────────────────────────────────────────────────────────────────────
// Enums
// ─────────────────────────────────────────────────────────────────────────────

export const slotStatusEnum = pgEnum("slot_status", [
  "open",
  "closed",
  "soldout",
]);

export const bookingStatusEnum = pgEnum("booking_status", [
  "pending",
  "confirmed",
  "cancelled",
  "refunded",
]);

export const visaTypeEnum = pgEnum("visa_type", [
  "standard",
  "urgent",
]);

export const visaStatusEnum = pgEnum("visa_status", [
  "received",
  "submitted_to_govt",
  "approved",
  "rejected",
]);

export const transferDirectionEnum = pgEnum("transfer_direction", [
  "arrival",
  "departure",
  "round_trip",
]);

export const transferAirportEnum = pgEnum("transfer_airport", [
  "GYD",  // Heydar Aliyev International Airport (Baku)
  "GJA",  // Ganja Airport
  "NAJ",  // Nakhchivan Airport
]);

export const transferVehicleEnum = pgEnum("transfer_vehicle", [
  "sedan",      // Sedan up to 3 pax
  "suv",        // SUV up to 4 pax
  "minivan",    // Minivan up to 7 pax
  "sprinter",   // Minibus up to 16 pax
  "economy",    // Backward compatibility
  "business",
  "executive",
]);

export const transferPaymentMethodEnum = pgEnum("transfer_payment_method", [
  "online",
  "on_arrival",
]);

export const transferStatusEnum = pgEnum("transfer_status", [
  "pending",
  "confirmed",
  "in_progress",
  "completed",
  "cancelled",
]);

// ─────────────────────────────────────────────────────────────────────────────
// 1. Auth.js v5 — Drizzle Adapter Tables
//    Source: https://authjs.dev/getting-started/adapters/drizzle
//    ⚠️  Column names and types must match exactly — Auth.js reads them directly.
// ─────────────────────────────────────────────────────────────────────────────

export const users = pgTable("users", {
  id:            text("id").primaryKey(),
  name:          text("name"),
  email:         text("email").unique(),
  emailVerified: timestamp("email_verified", { mode: "date", withTimezone: true }),
  image:         text("image"),
  passwordHash:  text("password_hash"),
  role:          text("role").notNull().default("customer"),
  ...timestamps,
});

export const accounts = pgTable(
  "accounts",
  {
    userId:            text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type:              text("type").notNull(),
    provider:          text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refresh_token:     text("refresh_token"),
    access_token:      text("access_token"),
    expires_at:        integer("expires_at"),
    token_type:        text("token_type"),
    scope:             text("scope"),
    id_token:          text("id_token"),
    session_state:     text("session_state"),
  },
  (account) => [
    primaryKey({ columns: [account.provider, account.providerAccountId] }),
  ]
);

export const sessions = pgTable("sessions", {
  sessionToken: text("session_token").primaryKey(),
  userId:       text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires:      timestamp("expires", { mode: "date", withTimezone: true }).notNull(),
});

export const verificationTokens = pgTable(
  "verification_tokens",
  {
    identifier: text("identifier").notNull(),
    token:      text("token").notNull(),
    expires:    timestamp("expires", { mode: "date", withTimezone: true }).notNull(),
  },
  (vt) => [primaryKey({ columns: [vt.identifier, vt.token] })]
);

// ─────────────────────────────────────────────────────────────────────────────
// Auth.js Relations
// ─────────────────────────────────────────────────────────────────────────────

export const usersRelations = relations(users, ({ many }) => ({
  accounts:       many(accounts),
  sessions:       many(sessions),
  bookings:       many(bookings),
  savedPackages:  many(savedPackages),
  reviews:        many(reviews),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

// ─────────────────────────────────────────────────────────────────────────────
// 2. Destinations
// ─────────────────────────────────────────────────────────────────────────────

export const destinations = pgTable(
  "destinations",
  {
    id:           uuid("id").primaryKey().defaultRandom(),
    name:         varchar("name", { length: 150 }).notNull(),
    country:      varchar("country", { length: 100 }).notNull(),
    /** URL-safe slug for routing: /destinations/[slug] */
    slug:         varchar("slug", { length: 200 }).notNull(),
    heroImageUrl: text("hero_image_url"),
    /**
     * package_count is NOT stored here; computed at query time via
     * COUNT(*) subquery in repository functions. Keeps data consistent
     * without any sync logic.
     */
    createdAt,
  },
  (t) => [uniqueIndex("destinations_slug_idx").on(t.slug)]
);

export const destinationsRelations = relations(destinations, ({ many }) => ({
  packages: many(packages),
}));

// ─────────────────────────────────────────────────────────────────────────────
// 3. Packages
// ─────────────────────────────────────────────────────────────────────────────

export const packages = pgTable(
  "packages",
  {
    id:            uuid("id").primaryKey().defaultRandom(),
    title:         varchar("title", { length: 200 }).notNull(),
    /** URL-safe slug for routing: /packages/[slug] */
    slug:          varchar("slug", { length: 250 }).notNull(),
    destinationId: uuid("destination_id")
      .notNull()
      .references(() => destinations.id, { onDelete: "restrict" }),
    overview:      text("overview").notNull(),
    coverImageUrl: text("cover_image_url"),
    /** Ordered list of gallery image URLs stored as a Postgres text array */
    galleryUrls:   text("gallery_urls").array().notNull().default(sql`'{}'::text[]`),
    durationDays:   integer("duration_days").notNull(),
    durationNights: integer("duration_nights").notNull(),
    /**
     * Denormalized rating cache. Recomputed by a background job or
     * upsert trigger whenever a new review is inserted/updated/deleted.
     */
    ratingAvg:    numeric("rating_avg", { precision: 3, scale: 2 })
      .notNull()
      .default("0.00"),
    reviewCount:  integer("review_count").notNull().default(0),
    /** Rack rate — always present */
    basePrice:    numeric("base_price", { precision: 10, scale: 2 }).notNull(),
    /**
     * Promotional price. NULL means no active discount.
     * UI should show promoPrice when != null, crossed-out basePrice alongside.
     */
    promoPrice:   numeric("promo_price", { precision: 10, scale: 2 }),
    isActive:     boolean("is_active").notNull().default(true),
    ...timestamps,
  },
  (t) => [
    uniqueIndex("packages_slug_idx").on(t.slug),
    index("packages_destination_idx").on(t.destinationId),
    index("packages_is_active_idx").on(t.isActive),
  ]
);

export const packagesRelations = relations(packages, ({ one, many }) => ({
  destination:      one(destinations, {
    fields: [packages.destinationId],
    references: [destinations.id],
  }),
  packageInclusions: many(packageInclusions),
  availabilitySlots: many(availabilitySlots),
  savedByUsers:     many(savedPackages),
  reviews:          many(reviews),
}));

// ─────────────────────────────────────────────────────────────────────────────
// 4. Inclusions (tag dictionary)
// ─────────────────────────────────────────────────────────────────────────────

export const inclusions = pgTable(
  "inclusions",
  {
    id:      uuid("id").primaryKey().defaultRandom(),
    /**
     * Human-readable label. Used as the display text in badges.
     * e.g. "Flight", "Accommodation", "Meals", "Guided Tour", "Transfer"
     */
    label:   varchar("label", { length: 100 }).notNull(),
    /**
     * Key mapping to an icon in the UI (e.g. Lucide icon name or custom SVG key).
     * Optional — UI falls back to a generic tag icon if null.
     */
    iconKey: varchar("icon_key", { length: 50 }),
  },
  (t) => [uniqueIndex("inclusions_label_idx").on(t.label)]
);

export const inclusionsRelations = relations(inclusions, ({ many }) => ({
  packageInclusions: many(packageInclusions),
}));

// ─────────────────────────────────────────────────────────────────────────────
// 5. Package ↔ Inclusion join table (M:N)
// ─────────────────────────────────────────────────────────────────────────────

export const packageInclusions = pgTable(
  "package_inclusions",
  {
    packageId:   uuid("package_id")
      .notNull()
      .references(() => packages.id, { onDelete: "cascade" }),
    inclusionId: uuid("inclusion_id")
      .notNull()
      .references(() => inclusions.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.packageId, t.inclusionId] })]
);

export const packageInclusionsRelations = relations(packageInclusions, ({ one }) => ({
  package:   one(packages,   { fields: [packageInclusions.packageId],   references: [packages.id] }),
  inclusion: one(inclusions, { fields: [packageInclusions.inclusionId], references: [inclusions.id] }),
}));

// ─────────────────────────────────────────────────────────────────────────────
// 6. Availability Slots (departure inventory)
// ─────────────────────────────────────────────────────────────────────────────

export const availabilitySlots = pgTable(
  "availability_slots",
  {
    id:             uuid("id").primaryKey().defaultRandom(),
    packageId:      uuid("package_id")
      .notNull()
      .references(() => packages.id, { onDelete: "cascade" }),
    departureDate:  date("departure_date", { mode: "date" }).notNull(),
    returnDate:     date("return_date", { mode: "date" }).notNull(),
    /** Total seats / capacity for this departure */
    totalSeats:     integer("total_seats").notNull(),
    /**
     * Remaining available seats. Decremented atomically during booking.
     * CHECK constraint enforced at DB level: available_seats >= 0
     */
    availableSeats: integer("available_seats").notNull(),
    status:         slotStatusEnum("status").notNull().default("open"),
    createdAt,
  },
  (t) => [
    index("slots_package_idx").on(t.packageId),
    // This index is the heart of the date + capacity search query
    index("slots_departure_date_idx").on(t.departureDate),
    index("slots_available_seats_idx").on(t.availableSeats),
  ]
);

export const availabilitySlotsRelations = relations(availabilitySlots, ({ one, many }) => ({
  package:      one(packages, {
    fields: [availabilitySlots.packageId],
    references: [packages.id],
  }),
  pricingTiers: many(pricingTiers),
  bookings:     many(bookings),
}));

// ─────────────────────────────────────────────────────────────────────────────
// 7. Pricing Tiers (per slot)
// ─────────────────────────────────────────────────────────────────────────────

export const pricingTiers = pgTable(
  "pricing_tiers",
  {
    id:          uuid("id").primaryKey().defaultRandom(),
    slotId:      uuid("slot_id")
      .notNull()
      .references(() => availabilitySlots.id, { onDelete: "cascade" }),
    /**
     * Tier name. Convention: "Standard" | "Premium" | "VIP"
     * Stored as free text so admins can define custom tier names.
     */
    name:        varchar("name", { length: 100 }).notNull(),
    price:       numeric("price", { precision: 10, scale: 2 }).notNull(),
    /** Optional prose describing what's included at this tier level */
    description: text("description"),
    createdAt,
  },
  (t) => [index("pricing_tiers_slot_idx").on(t.slotId)]
);

export const pricingTiersRelations = relations(pricingTiers, ({ one, many }) => ({
  slot:     one(availabilitySlots, {
    fields: [pricingTiers.slotId],
    references: [availabilitySlots.id],
  }),
  bookings: many(bookings),
}));

// ─────────────────────────────────────────────────────────────────────────────
// 8. Bookings
// ─────────────────────────────────────────────────────────────────────────────

export const bookings = pgTable(
  "bookings",
  {
    id:            uuid("id").primaryKey().defaultRandom(),
    userId:        text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    slotId:        uuid("slot_id")
      .notNull()
      .references(() => availabilitySlots.id, { onDelete: "restrict" }),
    tierId:        uuid("tier_id")
      .notNull()
      .references(() => pricingTiers.id, { onDelete: "restrict" }),
    travelerCount: integer("traveler_count").notNull().default(1),
    /**
     * Price snapshot at time of booking — prevents floating price issues
     * if pricing_tiers.price changes after purchase.
     */
    totalPrice:    numeric("total_price", { precision: 10, scale: 2 }).notNull(),
    status:        bookingStatusEnum("status").notNull().default("pending"),
    bookedAt:      timestamp("booked_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
  },
  (t) => [
    index("bookings_user_idx").on(t.userId),
    index("bookings_slot_idx").on(t.slotId),
    index("bookings_status_idx").on(t.status),
  ]
);

export const bookingsRelations = relations(bookings, ({ one }) => ({
  user:   one(users, {
    fields: [bookings.userId],
    references: [users.id],
  }),
  slot:   one(availabilitySlots, {
    fields: [bookings.slotId],
    references: [availabilitySlots.id],
  }),
  tier:   one(pricingTiers, {
    fields: [bookings.tierId],
    references: [pricingTiers.id],
  }),
}));

// ─────────────────────────────────────────────────────────────────────────────
// 9. Saved Packages (wishlist — M:N users ↔ packages)
// ─────────────────────────────────────────────────────────────────────────────

export const savedPackages = pgTable(
  "saved_packages",
  {
    userId:    text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    packageId: uuid("package_id")
      .notNull()
      .references(() => packages.id, { onDelete: "cascade" }),
    savedAt:   timestamp("saved_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
  },
  (t) => [
    primaryKey({ columns: [t.userId, t.packageId] }),
    index("saved_packages_user_idx").on(t.userId),
  ]
);

export const savedPackagesRelations = relations(savedPackages, ({ one }) => ({
  user:    one(users, {
    fields: [savedPackages.userId],
    references: [users.id],
  }),
  package: one(packages, {
    fields: [savedPackages.packageId],
    references: [packages.id],
  }),
}));

// ─────────────────────────────────────────────────────────────────────────────
// 10. Reviews
// ─────────────────────────────────────────────────────────────────────────────

export const reviews = pgTable(
  "reviews",
  {
    id:        uuid("id").primaryKey().defaultRandom(),
    userId:    text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    packageId: uuid("package_id")
      .notNull()
      .references(() => packages.id, { onDelete: "cascade" }),
    /**
     * Star rating 1–5. Enforced at app layer; add a CHECK constraint
     * in migration SQL if you want DB-level enforcement:
     *   CHECK (rating BETWEEN 1 AND 5)
     */
    rating:    integer("rating").notNull(),
    /** Optional long-form review body */
    body:      text("body"),
    createdAt,
  },
  (t) => [
    index("reviews_package_idx").on(t.packageId),
    index("reviews_user_idx").on(t.userId),
    /**
     * One review per user per package. Prevents duplicate reviews
     * and simplifies the ratingAvg recomputation logic.
     */
    uniqueIndex("reviews_user_package_unique_idx").on(t.userId, t.packageId),
  ]
);

export const reviewsRelations = relations(reviews, ({ one }) => ({
  user:    one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
  package: one(packages, {
    fields: [reviews.packageId],
    references: [packages.id],
  }),
}));

// ─────────────────────────────────────────────────────────────────────────────
// 3. Visa Applications (ASAN Visa evisa.gov.az Concierge Subsystem)
// ─────────────────────────────────────────────────────────────────────────────

export const visaApplications = pgTable(
  "visa_applications",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    applicationNumber: varchar("application_number", { length: 32 }).notNull().unique(),
    userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
    visaType: visaTypeEnum("visa_type").notNull().default("standard"),
    status: visaStatusEnum("status").notNull().default("received"),
    nationality: varchar("nationality", { length: 100 }).notNull(),
    passportType: varchar("passport_type", { length: 50 }).notNull().default("Ordinary passport"),
    arrivalDate: date("arrival_date").notNull(),
    purposeOfVisit: varchar("purpose_of_visit", { length: 100 }).notNull().default("Tourism"),
    stayAddress: text("stay_address").notNull(),
    surname: varchar("surname", { length: 100 }).notNull(),
    givenNames: varchar("given_names", { length: 150 }).notNull(),
    gender: varchar("gender", { length: 20 }).notNull(),
    birthDate: date("birth_date").notNull(),
    birthCountry: varchar("birth_country", { length: 100 }).notNull(),
    birthPlace: varchar("birth_place", { length: 100 }).notNull(),
    occupation: varchar("occupation", { length: 150 }).notNull(),
    phoneNumber: varchar("phone_number", { length: 50 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    residentialAddress: text("residential_address").notNull(),
    passportNumber: varchar("passport_number", { length: 50 }).notNull(),
    passportIssueDate: date("passport_issue_date").notNull(),
    passportExpiryDate: date("passport_expiry_date").notNull(),
    passportScanUrl: text("passport_scan_url"),
    photoUrl: text("photo_url"),
    govFee: numeric("gov_fee", { precision: 10, scale: 2 }).notNull(),
    serviceFee: numeric("service_fee", { precision: 10, scale: 2 }).notNull(),
    totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),
    paymentStatus: varchar("payment_status", { length: 30 }).notNull().default("paid"),
    asanApplicationId: varchar("asan_application_id", { length: 100 }),
    evisaPdfUrl: text("evisa_pdf_url"),
    adminNotes: text("admin_notes"),
    ...timestamps,
  },
  (t) => [
    index("visa_apps_status_idx").on(t.status),
    index("visa_apps_user_idx").on(t.userId),
    index("visa_apps_email_idx").on(t.email),
    uniqueIndex("visa_apps_app_num_idx").on(t.applicationNumber),
  ]
);

export const visaApplicationsRelations = relations(visaApplications, ({ one }) => ({
  user: one(users, {
    fields: [visaApplications.userId],
    references: [users.id],
  }),
}));

// ─────────────────────────────────────────────────────────────────────────────
// 12. Transfer Bookings (Airport Transfer Service)
// ─────────────────────────────────────────────────────────────────────────────

export const transferBookings = pgTable(
  "transfer_bookings",
  {
    id:             uuid("id").primaryKey().defaultRandom(),
    bookingNumber:  varchar("booking_number", { length: 32 }).notNull().unique(),
    userId:         text("user_id").references(() => users.id, { onDelete: "set null" }),

    // Route details
    direction:      transferDirectionEnum("direction").notNull(),
    airport:        transferAirportEnum("airport").notNull(),
    pickupZone:     varchar("pickup_zone", { length: 150 }).notNull(),
    dropoffAddress: text("dropoff_address").notNull(),
    distanceKm:     numeric("distance_km", { precision: 6, scale: 1 }).notNull(),

    // Vehicle & pricing
    vehicleClass:   transferVehicleEnum("vehicle_class").notNull(),
    basePrice:      numeric("base_price",  { precision: 10, scale: 2 }).notNull(),
    totalAmount:    numeric("total_amount", { precision: 10, scale: 2 }).notNull(),

    // Arrival/departure flight
    flightNumber:   varchar("flight_number", { length: 20 }).notNull(),
    flightDate:     date("flight_date").notNull(),
    flightTime:     varchar("flight_time", { length: 10 }).notNull(),  // HH:MM

    // Return flight (for round_trip)
    returnFlightNumber: varchar("return_flight_number", { length: 20 }),
    returnDate:         date("return_date"),
    returnTime:         varchar("return_time", { length: 10 }),

    // Passenger details
    passengerName:   varchar("passenger_name", { length: 200 }).notNull(),
    passengerCount:  integer("passenger_count").notNull().default(1),
    phoneNumber:     varchar("phone_number",  { length: 50 }).notNull(),
    email:           varchar("email",         { length: 255 }).notNull(),
    luggageNotes:    text("luggage_notes"),

    // Payment
    paymentMethod:  transferPaymentMethodEnum("payment_method").notNull().default("online"),
    paymentStatus:  varchar("payment_status", { length: 30 }).notNull().default("pending"),
    payriffOrderId: varchar("payriff_order_id", { length: 100 }),

    // Operations
    status:      transferStatusEnum("status").notNull().default("pending"),
    driverName:  varchar("driver_name",  { length: 150 }),
    driverPhone: varchar("driver_phone", { length: 50 }),
    adminNotes:  text("admin_notes"),
    ...timestamps,
  },
  (t) => [
    index("transfer_status_idx").on(t.status),
    index("transfer_user_idx").on(t.userId),
    index("transfer_email_idx").on(t.email),
    index("transfer_flight_date_idx").on(t.flightDate),
    uniqueIndex("transfer_booking_num_idx").on(t.bookingNumber),
  ]
);

export const transferBookingsRelations = relations(transferBookings, ({ one }) => ({
  user: one(users, {
    fields: [transferBookings.userId],
    references: [users.id],
  }),
}));

// ─────────────────────────────────────────────────────────────────────────────
// 13. Audit Logs (Enterprise security, state changes, staff actions)
// ─────────────────────────────────────────────────────────────────────────────

export const auditLogs = pgTable(
  "audit_logs",
  {
    id:          uuid("id").defaultRandom().primaryKey(),
    entityType:  varchar("entity_type", { length: 50 }).notNull(), // 'visa', 'booking', 'payment', 'auth', 'user'
    entityId:    varchar("entity_id", { length: 100 }).notNull(),  // e.g. applicationNumber 'AZV-798227'
    action:      varchar("action", { length: 50 }).notNull(),     // 'created', 'status_changed', 'payment_success', etc.
    actorEmail:  varchar("actor_email", { length: 255 }),
    actorRole:   varchar("actor_role", { length: 50 }).notNull().default("system"), // 'admin', 'customer', 'system'
    metadata:    jsonb("metadata"),
    createdAt:   timestamp("created_at", { withTimezone: true }).notNull().default(sql`now()`),
  },
  (t) => [
    index("audit_logs_entity_idx").on(t.entityType, t.entityId),
    index("audit_logs_action_idx").on(t.action),
    index("audit_logs_created_at_idx").on(t.createdAt),
    index("audit_logs_actor_idx").on(t.actorEmail),
  ]
);

export const tourReservations = pgTable(
  "tour_reservations",
  {
    id:                uuid("id").primaryKey().defaultRandom(),
    reservationNumber: varchar("reservation_number", { length: 32 }).notNull().unique(),
    tourId:            varchar("tour_id", { length: 100 }).notNull(),
    tourTitle:         varchar("tour_title", { length: 255 }).notNull(),
    tourDate:          date("tour_date").notNull(),
    guests:            integer("guests").notNull().default(1),
    travelerName:      varchar("traveler_name", { length: 200 }).notNull(),
    phoneNumber:       varchar("phone_number", { length: 50 }).notNull(),
    price:             numeric("price", { precision: 10, scale: 2 }).notNull(),
    status:            varchar("status", { length: 30 }).notNull().default("pending"),
    guideName:         varchar("guide_name", { length: 150 }),
    guidePhone:        varchar("guide_phone", { length: 50 }),
    adminNotes:        text("admin_notes"),
    ...timestamps,
  },
  (t) => [
    index("tour_res_status_idx").on(t.status),
    index("tour_res_date_idx").on(t.tourDate),
    uniqueIndex("tour_res_number_idx").on(t.reservationNumber),
  ]
);

export const customItineraries = pgTable(
  "custom_itineraries",
  {
    id:                uuid("id").primaryKey().defaultRandom(),
    referenceCode:     varchar("reference_code", { length: 32 }).notNull().unique(),
    userId:            text("user_id").references(() => users.id, { onDelete: "set null" }),

    // Contact & Traveler
    travelerName:      varchar("traveler_name", { length: 200 }).notNull(),
    email:             varchar("email", { length: 255 }).notNull(),
    phoneNumber:       varchar("phone_number", { length: 50 }).notNull(),

    // Itinerary parameters
    durationDays:      integer("duration_days").notNull().default(5),
    arrivalDate:       date("arrival_date").notNull(),
    adults:            integer("adults").notNull().default(2),
    children:          integer("children").notNull().default(0),
    hotelTier:         varchar("hotel_tier", { length: 100 }).notNull(),
    vehicleClass:      varchar("vehicle_class", { length: 100 }).notNull(),
    destinations:      jsonb("destinations").notNull().$type<string[]>(),

    // Pricing & Budget
    estimatedPriceUsd: numeric("estimated_price_usd", { precision: 10, scale: 2 }).notNull(),
    currency:          varchar("currency", { length: 10 }).notNull().default("USD"),
    specialRequests:   text("special_requests"),

    // Status & Admin
    status:            varchar("status", { length: 30 }).notNull().default("pending"),
    adminNotes:        text("admin_notes"),
    ...timestamps,
  },
  (t) => [
    index("custom_itin_status_idx").on(t.status),
    index("custom_itin_date_idx").on(t.arrivalDate),
    uniqueIndex("custom_itin_ref_idx").on(t.referenceCode),
  ]
);

export const customItinerariesRelations = relations(customItineraries, ({ one }) => ({
  user: one(users, {
    fields: [customItineraries.userId],
    references: [users.id],
  }),
}));

export const siteSettings = pgTable(
  "site_settings",
  {
    key:         varchar("key", { length: 100 }).primaryKey(),
    value:       jsonb("value").notNull(),
    category:    varchar("category", { length: 50 }).notNull().default("general"),
    label:       varchar("label", { length: 255 }).notNull(),
    description: text("description"),
    updatedAt:   timestamp("updated_at", { withTimezone: true }).defaultNow(),
    updatedBy:   varchar("updated_by", { length: 255 }),
  },
  (t) => [
    index("site_settings_category_idx").on(t.category),
  ]
);

// ─────────────────────────────────────────────────────────────────────────────
// Type exports — infer insert/select types from schema for use in app code
// ─────────────────────────────────────────────────────────────────────────────

export type User               = typeof users.$inferSelect;
export type NewUser            = typeof users.$inferInsert;

export type Destination        = typeof destinations.$inferSelect;
export type NewDestination     = typeof destinations.$inferInsert;

export type Package            = typeof packages.$inferSelect;
export type NewPackage         = typeof packages.$inferInsert;

export type Inclusion          = typeof inclusions.$inferSelect;
export type NewInclusion       = typeof inclusions.$inferInsert;

export type AvailabilitySlot   = typeof availabilitySlots.$inferSelect;
export type NewAvailabilitySlot = typeof availabilitySlots.$inferInsert;

export type PricingTier        = typeof pricingTiers.$inferSelect;
export type NewPricingTier     = typeof pricingTiers.$inferInsert;

export type Booking            = typeof bookings.$inferSelect;
export type NewBooking         = typeof bookings.$inferInsert;

export type SavedPackage       = typeof savedPackages.$inferSelect;
export type Review             = typeof reviews.$inferSelect;
export type NewReview          = typeof reviews.$inferInsert;

export type VisaApplication    = typeof visaApplications.$inferSelect;
export type NewVisaApplication = typeof visaApplications.$inferInsert;

export type TransferBooking    = typeof transferBookings.$inferSelect;
export type NewTransferBooking = typeof transferBookings.$inferInsert;

export type AuditLog           = typeof auditLogs.$inferSelect;
export type NewAuditLog        = typeof auditLogs.$inferInsert;

export type TourReservation    = typeof tourReservations.$inferSelect;
export type NewTourReservation = typeof tourReservations.$inferInsert;

export type CustomItinerary    = typeof customItineraries.$inferSelect;
export type NewCustomItinerary = typeof customItineraries.$inferInsert;

export type SiteSetting        = typeof siteSettings.$inferSelect;
export type NewSiteSetting     = typeof siteSettings.$inferInsert;


