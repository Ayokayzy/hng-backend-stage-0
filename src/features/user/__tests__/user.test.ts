import { jest } from "@jest/globals";
import request from "supertest";

// 🔥 Properly mock the ESM module *before* import of dependent code
const mockGetCatFact = jest.fn(() =>
  Promise.resolve("Cats sleep 70% of their lives."),
);

await jest.unstable_mockModule("../services/catFact", () => ({
  getCatFact: mockGetCatFact,
}));

// Now that the module is mocked, we can import the app
const { app } = await import("../../../../src/index");

describe("GET /user/me", () => {
  it("should return user profile with a cat fact and correct structure", async () => {
    const res = await request(app).get("/user/me");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("status", "success");

    // user object structure
    expect(res.body).toHaveProperty("user");
    expect(res.body.user).toEqual({
      email: "theayokayzy1@gmail.com",
      name: "Ola-Akande Ayokunle",
      stack: "Node.js, Express, TypeScript",
    });

    // timestamp checks
    expect(res.body).toHaveProperty("timestamp");
    expect(typeof res.body.timestamp).toBe("string");
    expect(new Date(res.body.timestamp).toISOString()).toBe(res.body.timestamp);

    // fact check
    expect(res.body).toHaveProperty("fact", "Cats sleep 70% of their lives.");
  });

  it("should handle getCatFact errors gracefully", async () => {
    mockGetCatFact.mockRejectedValueOnce(new Error("Cat fact API down"));

    const res = await request(app).get("/user/me");

    expect(res.body).toHaveProperty("statusCode");
    expect(res.body).toHaveProperty("status", "error");
    expect(res.body).toHaveProperty("error");
  });
});
