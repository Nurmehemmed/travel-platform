import { describe, it, expect } from "vitest";
import { getTableColumns } from "drizzle-orm";
import {
  users,
  packages,
  destinations,
  bookings,
  visaApplications,
  transferBookings,
  tourReservations,
  auditLogs,
  siteSettings,
  bookingStatusEnum,
  visaTypeEnum,
  visaStatusEnum,
  transferDirectionEnum,
  transferAirportEnum,
  transferVehicleEnum,
  transferPaymentMethodEnum,
  transferStatusEnum,
  slotStatusEnum,
} from "../schema";

describe("Database Schema Integrity Suite", () => {
  describe("Postgres Enum Specifications", () => {
    it("defines valid tour departure slot statuses", () => {
      expect(slotStatusEnum.enumValues).toEqual(["open", "closed", "soldout"]);
    });

    it("defines valid booking lifecycle statuses", () => {
      expect(bookingStatusEnum.enumValues).toEqual([
        "pending",
        "confirmed",
        "cancelled",
        "refunded",
      ]);
    });

    it("defines valid ASAN e-visa tier types and processing statuses", () => {
      expect(visaTypeEnum.enumValues).toEqual(["standard", "urgent"]);
      expect(visaStatusEnum.enumValues).toEqual([
        "received",
        "submitted_to_govt",
        "approved",
        "rejected",
      ]);
    });

    it("defines valid airport transfer route parameters", () => {
      expect(transferDirectionEnum.enumValues).toEqual(["arrival", "departure", "round_trip"]);
      expect(transferAirportEnum.enumValues).toEqual(["GYD", "GJA", "NAJ"]);
      expect(transferVehicleEnum.enumValues).toContain("sedan");
      expect(transferVehicleEnum.enumValues).toContain("suv");
      expect(transferVehicleEnum.enumValues).toContain("minivan");
      expect(transferVehicleEnum.enumValues).toContain("sprinter");
      expect(transferPaymentMethodEnum.enumValues).toEqual(["online", "on_arrival"]);
      expect(transferStatusEnum.enumValues).toEqual([
        "pending",
        "confirmed",
        "in_progress",
        "completed",
        "cancelled",
      ]);
    });
  });

  describe("Core Table Columns & Invariants", () => {
    it("verifies users table contains authentication and security columns", () => {
      const cols = getTableColumns(users);
      expect(cols.id).toBeDefined();
      expect(cols.email).toBeDefined();
      expect(cols.passwordHash).toBeDefined();
      expect(cols.role).toBeDefined();
      expect(cols.createdAt).toBeDefined();
    });

    it("verifies packages (tours) table contains pricing and localization columns", () => {
      const cols = getTableColumns(packages);
      expect(cols.id).toBeDefined();
      expect(cols.slug).toBeDefined();
      expect(cols.title).toBeDefined();
      expect(cols.destinationId).toBeDefined();
      expect(cols.basePrice).toBeDefined();
      expect(cols.durationDays).toBeDefined();
      expect(cols.durationNights).toBeDefined();
      expect(cols.isActive).toBeDefined();
    });

    it("verifies destinations table contains SEO and regional fields", () => {
      const cols = getTableColumns(destinations);
      expect(cols.id).toBeDefined();
      expect(cols.slug).toBeDefined();
      expect(cols.name).toBeDefined();
      expect(cols.country).toBeDefined();
      expect(cols.heroImageUrl).toBeDefined();
    });

    it("verifies visa_applications table contains government compliance fields", () => {
      const cols = getTableColumns(visaApplications);
      expect(cols.id).toBeDefined();
      expect(cols.applicationNumber).toBeDefined();
      expect(cols.visaType).toBeDefined();
      expect(cols.nationality).toBeDefined();
      expect(cols.passportNumber).toBeDefined();
      expect(cols.passportExpiryDate).toBeDefined();
      expect(cols.status).toBeDefined();
      expect(cols.govFee).toBeDefined();
      expect(cols.serviceFee).toBeDefined();
      expect(cols.totalAmount).toBeDefined();
      expect(cols.paymentStatus).toBeDefined();
    });

    it("verifies transfer_bookings table contains flight and route fields", () => {
      const cols = getTableColumns(transferBookings);
      expect(cols.id).toBeDefined();
      expect(cols.bookingNumber).toBeDefined();
      expect(cols.direction).toBeDefined();
      expect(cols.airport).toBeDefined();
      expect(cols.pickupZone).toBeDefined();
      expect(cols.dropoffAddress).toBeDefined();
      expect(cols.vehicleClass).toBeDefined();
      expect(cols.basePrice).toBeDefined();
      expect(cols.totalAmount).toBeDefined();
      expect(cols.flightNumber).toBeDefined();
      expect(cols.flightDate).toBeDefined();
      expect(cols.flightTime).toBeDefined();
      expect(cols.passengerName).toBeDefined();
      expect(cols.status).toBeDefined();
    });

    it("verifies tour_reservations table contains contact and guide assignment fields", () => {
      const cols = getTableColumns(tourReservations);
      expect(cols.id).toBeDefined();
      expect(cols.reservationNumber).toBeDefined();
      expect(cols.tourId).toBeDefined();
      expect(cols.tourTitle).toBeDefined();
      expect(cols.tourDate).toBeDefined();
      expect(cols.guests).toBeDefined();
      expect(cols.travelerName).toBeDefined();
      expect(cols.phoneNumber).toBeDefined();
      expect(cols.price).toBeDefined();
      expect(cols.status).toBeDefined();
    });

    it("verifies audit_logs table contains immutable trace fields", () => {
      const cols = getTableColumns(auditLogs);
      expect(cols.id).toBeDefined();
      expect(cols.entityType).toBeDefined();
      expect(cols.entityId).toBeDefined();
      expect(cols.action).toBeDefined();
      expect(cols.actorEmail).toBeDefined();
      expect(cols.actorRole).toBeDefined();
      expect(cols.createdAt).toBeDefined();
    });

    it("verifies site_settings table contains key-value configuration", () => {
      const cols = getTableColumns(siteSettings);
      expect(cols.key).toBeDefined();
      expect(cols.value).toBeDefined();
      expect(cols.description).toBeDefined();
    });
  });
});
