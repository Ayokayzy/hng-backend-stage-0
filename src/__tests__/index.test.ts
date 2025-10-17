import request from "supertest";
import express, { Express } from "express";
import dotenv from "dotenv";
import { Server } from "http";

dotenv.config();

let app: Express;
let server: Server;

beforeAll(() => {
  // Dynamically import the app if it's exported, otherwise create a new one for testing
  app = express();
  app.use(express.json());
  app.get("/", (_req, res) => {
    res.json({ message: "Welcome to the Node.js TypeScript API!" });
  });
  server = app.listen(0); // Listen on a random port for testing
});

afterAll((done: () => void) => {
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
