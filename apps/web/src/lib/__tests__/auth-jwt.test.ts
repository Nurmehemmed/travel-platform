import { describe, it, expect } from "vitest";
import { signSessionToken, verifySessionToken } from "../auth";

describe("Auth JWT Session Token Lifecycle", () => {
  it("successfully signs and verifies a valid customer session token", async () => {
    const user = {
      id: "usr_test_12345",
      email: "traveler@example.com",
      name: "Ali Aliyev",
      role: "customer",
    };

    const token = await signSessionToken(user);
    expect(typeof token).toBe("string");
    expect(token.length).toBeGreaterThan(20);

    const decoded = await verifySessionToken(token);
    expect(decoded).not.toBeNull();
    expect(decoded?.id).toBe(user.id);
    expect(decoded?.email).toBe(user.email);
    expect(decoded?.name).toBe(user.name);
    expect(decoded?.role).toBe("customer");
  });

  it("signs and verifies an admin session token", async () => {
    const admin = {
      id: "adm_test_9999",
      email: "admin@addmetour.com",
      name: "Super Admin",
      role: "admin",
    };

    const token = await signSessionToken(admin);
    const decoded = await verifySessionToken(token);

    expect(decoded?.role).toBe("admin");
  });

  it("returns null when verifying a malformed or tampered token", async () => {
    const decoded1 = await verifySessionToken("malformed.jwt.token");
    expect(decoded1).toBeNull();

    const decoded2 = await verifySessionToken("");
    expect(decoded2).toBeNull();
  });
});
