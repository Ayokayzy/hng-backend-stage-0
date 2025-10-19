import request from "supertest";
import { app } from "../../../../src/index";
import { getCatFact } from "../services/catFact";

jest.mock("../services/catFact");
const mockGetCatFact = getCatFact as jest.MockedFunction<typeof getCatFact>;

describe("GET /user/me", () => {
  it("should return user profile with a cat fact and correct structure", async () => {
    mockGetCatFact.mockResolvedValueOnce("Cats sleep 70% of their lives.");

    const res = await request(app).get("/user/me");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("status", "success");
    expect(res.body.user).toEqual({
      email: "theayokayzy1@gmail.com",
      name: "Ola-Akande Ayokunle",
      stack: "Nodejs/Express/TypeScript",
    });
    expect(res.body).toHaveProperty("fact");
  });

  it("should handle getCatFact errors gracefully", async () => {
    mockGetCatFact.mockRejectedValueOnce(new Error("Cat fact API down"));

    const res = await request(app).get("/user/me");

    expect(res.statusCode).toBeGreaterThanOrEqual(400);
    expect(res.body).toHaveProperty("status", "error");
  });
});
