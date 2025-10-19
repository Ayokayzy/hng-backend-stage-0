import request from "supertest";
import express, { Express } from "express";
import { Server } from "http";

let app: Express;
let server: Server;

beforeAll(() => {
  app = express();
  app.use(express.json());
  app.get("/", (_req, res) => {
    res.json({ message: "Welcome to the Node.js TypeScript API!" });
  });
  server = app.listen(0);
});

afterAll((done) => {
  server.close(done);
});

describe("GET /", () => {
  it("should return welcome message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      message: "Welcome to the Node.js TypeScript API!",
    });
  });
});
